/* __COPYRIGHT__ */

/**
 * Cancellable Promise with extra features
 * @module CPromise
 * @exports CPromise
 */

const {CanceledError} = require('./canceled-error');
const {AbortController: _AbortController} = require('./abort-controller');
const {TinyEventEmitter} = require('./tiny-event-emitter');

const {now} = Date;
const {isArray}= Array;

const _scope = Symbol('scope');
const _handleCancelRejection = Symbol('handleCancelRejection');
const _isPending = Symbol('isPending');
const _isCanceled = Symbol('isCanceled');
const _resolve = Symbol('resolve');
const _reject = Symbol('reject');
const _parent = Symbol('parent');
const _cancel = Symbol('cancel');
const _innerChain = Symbol('innerChain');
const _controller = Symbol('controller');
const _shadow = Symbol('shadow');
const _attachScope = Symbol('attachScope');
const _captureProgress = Symbol('captureProgress');
const _isChain = Symbol('isChain');
const _timer = Symbol('timer');
const _timeout = Symbol('timeout');
const _objectToCPromise = Symbol('objectToCPromise');
const _done= Symbol('done');
const TYPE_PROGRESS = Symbol('TYPE_PROGRESS');



const promiseAssocStore= new WeakMap();

const _toCPromise= Symbol.for('toCPromise');

const __AbortController =
    (() => {
        try {
            if (typeof AbortController === 'function' && (new AbortController()).toString() === '[object AbortController]') {
                return AbortController;
            }
        } catch (e) {
        }
        return _AbortController;
    })();

const _setImmediate = typeof setImmediate === 'function' ? setImmediate : function setImmediateShim(cb) {
    setTimeout(cb, 0)
}

const isThenable = obj => !!obj && (typeof obj === 'function' || typeof obj === 'object') && typeof obj.then === 'function';

function isGeneratorFunction(thing) {
    return typeof thing === 'function' && thing.constructor && thing.constructor.name === 'GeneratorFunction';
}

function isGenerator(thing) {
    return thing && typeof thing === 'object' && typeof thing.next === 'function' && typeof thing.throw === 'function';
}

const iterableToArray = Array.from ? Array.from : (iterable) => Array.prototype.slice.call(iterable);

const isAbortSignal = (thing) => {
    return thing &&
        typeof thing === 'object' &&
        typeof thing.aborted === 'boolean' &&
        typeof thing.addEventListener === 'function' &&
        typeof thing.removeEventListener === 'function';
}

/**
 * Scope for generator resolvers
 */

class AsyncGeneratorScope {
    /**
     * Creates a new AsyncGeneratorScope instance
     * @param {CPromiseScope} scope
     */
    constructor(scope) {
        this[_shadow]= {
            totalWeight: 1,
            scope
        }
    }

    /**
     * Promise scope related to the generator
     * @return {CPromiseScope}
     */

    get scope(){
        return this[_shadow].scope;
    }

    /**
     * total weight of the inner chains produced by the generator
     * @return {Number}
     */

    get totalWeight(){
        return this[_shadow].totalWeight;
    }

    set totalWeight(value){
        if (typeof value !== 'number') {
            throw TypeError('weight must be a number');
        }
        if (value < 1) {
            throw Error('weight must be grater than 0');
        }

        this[_shadow].totalWeight = value;
    }

    /**
     *
     * @param {Number} totalWeight total weight if generator inner chains
     * @param {Number} throttle
     */

    captureProgress(totalWeight, throttle) {
        this.totalWeight= totalWeight;
        throttle && this[_scope].throttleProgress(totalWeight);
    }
}

function resolveGenerator(generatorFn, args) {
    return new this((resolve, reject, scope) => {
        if (args !== undefined && !Array.isArray(args)) {
            throw TypeError('args must be an array');
        }

        const generatorScope= new AsyncGeneratorScope(scope);

        const generator = generatorFn.apply(generatorScope, args);

        if (!isGenerator(generator)) {
            return reject(new TypeError('function must return a generator object'));
        }

        let isCaptured;
        let progress = 0;
        let sum = 0;
        let weight = 0;
        let promise;

        scope.on('capture', () => {
            isCaptured = true;
        });

        const setProgress = (value, _scope, data) => {
            progress = (value * weight + sum) / generatorScope.totalWeight;
            if (progress > 1) {
                progress = 1;
            }
            scope.progress(progress, _scope, data);
        }

        const onFulfilled = (result) => {
            try {
                next(generator.next(result));
            } catch (e) {
                return reject(e);
            }
        }

        const onRejected = (err) => {
            try {
                next(generator.throw(err));
            } catch (e) {
                return reject(e);
            }
        }

        scope.on('cancelhook', (err, scope) => {
            if (promise instanceof this) {
                return promise.cancel(err)
            }

            return !!onRejected(err);
        });

        const next = (r) => {
            if (r.done) {
                return resolve(r.value);
            }

            promise = this.from(r.value);

            sum += weight;
            weight = promise.isChain ? 1 : promise.weight();

            if (promise instanceof this) {
                _setImmediate(() => {
                    isCaptured && promise.progress((value, scope, data) => {
                        setProgress(value, scope, data);
                    });
                });

                return promise.then((value) => {
                    setProgress(1, promise);
                    onFulfilled(value)
                }, onRejected);
            }

            onRejected(new TypeError(`Unable to resolve value ${promise} to CPromise`));
        }

        onFulfilled();
    })
}

/**
 * @typedef PromiseScopeOptions {Object}
 * @property {String} label the label for the promise
 * @property {Number} weight=1 the progress weight of the promise
 * @property {Number} timeout=0 max pending time
 * @property {AbortSignal} signal AbortController signal
 */

/**
 * @typedef {Function} onFulfilled
 * @this CPromiseScope
 * @param value
 * @param {CPromiseScope} scope
 */

/**
 * @typedef {Function} onRejected
 * @this CPromiseScope
 * @param err
 * @param {CPromiseScope} scope
 */

/**
 * Scope for CPromises instances
 * @extends TinyEventEmitter
 */

class CPromiseScope extends TinyEventEmitter {
    /**
     * Constructs PromiseScope instance
     * @param {Function} resolve
     * @param {Function} reject
     * @param {PromiseScopeOptions} options
     */
    constructor(resolve, reject, {label, weight, timeout, signal} = {}) {
        super();

        if (signal !== undefined) {
            if (!isAbortSignal(signal)) {
                throw TypeError('signal should implement AbortSignal interface');
            }
            const signalListener = () => {
                this.cancel();
            }
            signal.addEventListener('abort', signalListener);
            this.on('done', () => {
                signal.removeEventListener('abort', signalListener);
            })
        }

        const shadow = this[_shadow] = {
            captured: false,
            isListening: false,
            progress: 0,
            totalProgress: -1,
            capturedSum: -1,
            throttle: 0
        };

        this[_resolve] = resolve;
        this[_reject] = reject;
        this[_isPending] = true;
        this[_isCanceled] = false;
        this[_parent] = null;
        this[_isChain] = true;

        if (timeout !== undefined) {
            this.timeout(timeout);
        }

        if (weight !== undefined) {
            this.weight(weight);
        } else {
            shadow.weight = 1;
        }

        if (label !== undefined) {
            this.label(label);
        } else {
            shadow.label = '';
        }

        this.on('propagate', (type, scope, data) => {
            if (type === TYPE_PROGRESS) {
                shadow.totalProgress = -1;
                shadow.isListening && this.emit('progress', this.progress(), scope, data);
            }
        });

        this.on('newListener', (event) => {
            if (event === 'progress') {
                if (!shadow.isListening) {
                    shadow.isListening = true;
                    this.emit('capture', this);
                    this[_captureProgress]()
                }
            }
        })

        this.on('removeListener', (event) => {
            if (event === 'progress' && !this.listenerCount('progress')) {
                shadow.isListening = false;
            }
        });
    }

    /**
     * @typedef {Function} OnCancelListener
     * @param {CanceledError} reason
     */

    /**
     * registers the listener for cancel event
     * @param {OnCancelListener} listener
     * @returns {CPromiseScope}
     */

    onCancel(listener) {
        if (!this[_isPending]) {
            throw Error('Unable to subscribe to close event since promise has been already settled');
        }
        this.on('cancel', listener);
        return this;
    }

    /**
     * Set promise progress
     * @param {Number} [value] a number between [0, 1]
     * @param {*} [data] any data to send for progress event listeners
     */

    progress(value, data) {
        const shadow = this[_shadow];

        if (arguments.length) {
            if (!Number.isFinite(value)) {
                throw TypeError('value must be a number [0, 1]');
            }

            if (value < 0) {
                value = 0;
            } else if (value > 1) {
                value = 1;
            }

            if (value !== 0 && value !== 1) {
                if (shadow.throttle) {
                    const ts = shadow.throttleTS;
                    const date = now();
                    if (!ts || date - ts > shadow.throttle) {
                        shadow.throttleTS = date;
                    } else {
                        return this;
                    }
                }
                value = value.toFixed(10) * 1;
            }

            if (shadow.progress !== value) {
                shadow.progress = value;
                shadow.captured && this.propagate(TYPE_PROGRESS, data);
            }

            return this;
        }

        return shadow.totalProgress === -1 ? this[_captureProgress](true) : shadow.totalProgress;
    }

    /**
     * Set the minimum progress tick
     * @param {Number} minTick
     * @returns {CPromiseScope}
     */

    throttleProgress(minTick) {
        if (minTick < 0 || !Number.isFinite(minTick)) {
            throw TypeError('value must be a positive number');
        }
        this[_shadow].throttle = minTick;
        return this;
    }

    /**
     * emit propagate event that will propagate through each promise scope in the chain (bubbling)
     * @param {String|Symbol} type - some type to identify the data kind
     * @param {*} data - some data
     * @returns {CPromiseScope}
     */

    propagate(type, data = null) {
        this.emit('propagate', type, this, data);
        return this;
    }

    /**
     * capture initial progress state of the chain
     * @returns {CPromiseScope}
     */

    captureProgress() {
        this[_captureProgress](false);
        return this;
    }

    [_attachScope](thatScope, innerChain = false) {
        if (innerChain) {
            const shadow = this[_shadow];
            this[_innerChain] = thatScope;

            thatScope.on('propagate', (type, scope, data) => {
                if (type === TYPE_PROGRESS) {
                    const progress = thatScope.progress();
                    if (scope === thatScope) {
                        this.progress(progress, data);
                        return;
                    }
                    shadow.progress = progress;
                }

                this.emit('propagate', type, scope, data);
            });

            shadow.captured && thatScope[_captureProgress](true);
        } else {
            thatScope[_parent] = this;
            this.on('propagate', (type, scope, data) => {
                thatScope.emit('propagate', type, scope, data);
            });
            thatScope[_isChain] = false;
        }
    }

    [_captureProgress](calcProgress = false, update = false) {
        const shadow = this[_shadow];
        let capturedSum = shadow.capturedSum;
        let init = capturedSum === -1 || update;

        if (!init && !calcProgress) {
            return;
        }

        const scopes = this.scopes();
        let i = scopes.length;
        let progress = 0;
        let sum = 0;

        while (i-- > 0) {
            const scope = scopes[i];
            const thatShadow = scope[_shadow];
            const weight = thatShadow.weight;

            if (weight > 0) {
                sum += weight;

                if (init) {
                    thatShadow.captured = true;
                    const inner = scope[_innerChain];
                    inner && inner[_captureProgress]();
                }

                if (calcProgress) {
                    progress += thatShadow.progress * weight;
                }
            }
        }

        if (calcProgress) {
            let total = capturedSum !== -1 ? capturedSum : (shadow.capturedSum = sum);

            if (total > 0) {
                return (shadow.totalProgress = (progress + (total - sum)) / total);
            }

            return (shadow.totalProgress = sum ? progress / sum : 0);
        } else {
            shadow.capturedSum = sum;
        }
    }

    /**
     * Returns all parent scopes that are in pending state
     * @returns {CPromiseScope[]}
     */

    scopes() {
        let scope = this;
        const scopes = [scope];
        while ((scope = scope[_parent])) {
            scopes.push(scope);
        }
        return scopes;
    }

    /**
     * timeout before the promise will be canceled
     * @param {Number} value - timeout in ms
     * @returns {Number|this}
     */

    timeout(value) {
        if (arguments.length) {
            if (this[_timer]) {
                clearTimeout(this[_timer]);
                this[_timer] = null;
            }

            if (typeof value !== 'number' || value < 0) {
                throw TypeError('timeout must be a positive number');
            }

            if (value > 0) {
                setTimeout(() => {
                    this.cancel('timeout');
                }, (this[_timeout] = value));
            }
            return this;
        }

        return this[_timeout];
    }

    /**
     * get promise abort signal object
     * @type {AbortSignal}
     */

    get signal() {
        if (this[_controller]) return this[_controller].signal;

        return (this[_controller] = new __AbortController()).signal;
    }

    /**
     * Sets the promise weight in progress capturing process
     * @param {Number} weight - any number grater or equal 0
     * @returns {Number|CPromiseScope} returns weight if no arguments were specified
     */

    weight(weight) {
        if (arguments.length) {
            if (typeof weight !== 'number') {
                throw TypeError('weight must be a number');
            }

            if (weight < 0) {
                throw Error('weight must must be a positive number');
            }

            this[_shadow].weight = weight;
            return this;
        }
        return this[_shadow].weight;
    }

    /**
     * Sets the promise label
     * @param {String} label - any string
     * @returns {Number|CPromiseScope} returns weight if no arguments were specified
     */

    label(label) {
        if (arguments.length) {
            this[_shadow].label = label;
            return this;
        }
        return this[_shadow].label;
    }

    /**
     * indicates if the promise is pending
     * @returns {Boolean}
     */

    get isPending() {
        return this[_isPending];
    }

    /**
     * indicates if the promise is pending
     * @returns {Boolean}
     */

    get isCanceled() {
        return this[_isCanceled];
    }

    /**
     * Resolves the promise with given value
     * @param value
     */

    resolve(value) {
        if (!this[_isPending]) return;

        if (isThenable(value)) {
            if (value instanceof CPromise) {
                this[_attachScope](value[_scope], true);
            }
            value.then(
                (value) => this[_done](null, value),
                (err) => this[_done](err, undefined, true)
            )
        } else {
            this[_done](null, value);
        }
    }

    /**
     * Rejects the promise with given error
     * @param err
     */

    reject(err) {
        this[_done](err, undefined, true);
    }

    /**
     * Resolves or rejects the promise depending on the arguments
     * @param err - error object, if specified the promise will be rejected with this error, resolves otherwise
     * @param value
     * @param {boolean} [reject]
     */

    [_done](err, value, reject) {
        if (!this[_isPending]) return;
        this[_isPending] = false;

        this[_timer] && clearTimeout(this[_timer]);

        if (err || reject) {
            if (err && err instanceof CanceledError) {
                this[_handleCancelRejection](err);
            }
            this.emit('done', err);
            this[_reject](err);
        }else {
            this[_shadow].captured && this.progress(1);
            this.emit('done', undefined, value);
            this[_resolve](value);
        }

        this.removeAllListeners();

        this[_innerChain] = null;
        this[_parent] = null;
    }

    /**
     * Resolves or rejects the promise depending on the arguments
     * @param err - error object, if specified the promise will be rejected with this error, resolves otherwise
     * @param value
     */

    done(err, value){
        return this[_done](err, value);
    }

    [_handleCancelRejection](err) {
        this[_isCanceled] = true;

        err.scope || (err.scope = this);

        if (this[_controller]) {
            this[_controller].abort();
            this[_controller] = null;
        }

        this.emit('cancel', err);
    }

    /**
     * throws the CanceledError that cause promise chain cancellation
     * @param {String|Error} [reason]
     */

    cancel(reason) {
        return this[_cancel](CanceledError.from(reason));
    }

    [_cancel](err) {
        if (!this[_isPending] || this[_isCanceled]) return false;

        let parent = this[_parent];

        if (parent && parent[_cancel](err)) {
            return true;
        }

        const innerChain = this[_innerChain];

        if (innerChain && innerChain[_cancel](err)) {
            return true;
        }

        if (this.hasListeners('cancelhook')) {
            return this.emitHook('cancelhook', err, this);
        }

        this.reject(err);

        return true;
    }

    /**
     * Executes the promise executor in the PromiseScope context
     * @param {CPromiseExecutorFn} executor
     * @param resolve
     * @param reject
     * @param options
     * @returns {CPromiseScope}
     */

    static execute(executor, resolve, reject, options) {
        const scope = new this(resolve, reject, options);

        try {
            executor.call(scope, (value) => {
                    scope.resolve(value);
                }, (err) => {
                    scope.reject(err);
                }, scope
            );
        } catch (err) {
            scope.reject(err);
        }

        return scope;
    }
}

/**
 * @typedef {Function} CPromiseExecutorFn
 * @this CPromiseScope
 * @param {Function} resolve
 * @param {Function} reject
 * @param {CPromiseScope} scope
 */

/**
 * @typedef {Function} CPromiseExecutorFn
 * @param {Function} resolve
 * @param {Function} reject
 */

/**
 * If value is a number it will be considered as the value for timeout option
 * If value is a string it will be considered as label
 * @typedef {PromiseScopeOptions|String|Number} CPromiseOptions
 */

/**
 * CPromise class
 * @extends Promise
 */

class CPromise extends Promise {
    /**
     * Constructs new CPromise instance
     * @param {CPromiseExecutorFn} executor - promise executor function that will be invoked
     * in the context of the new CPromiseScope instance
     * @param {CPromiseOptions} [options]
     */

    constructor(executor, options) {
        let scope;

        if (options !== undefined && options !== null) {
            switch (typeof options) {
                case 'string':
                    options = {label: options};
                    break;
                case 'number':
                    options = {timeout: options};
                    break;
                case 'object':
                    break;
                default:
                    throw TypeError('options must be an object|string|number');
            }
        }

        super((resolve, reject) => {

            scope = CPromiseScope.execute(executor, resolve, reject, options);
        });

        this[_scope] = scope;
    }

    /**
     * indicates if the promise is pending
     * @returns {Boolean}
     */

    get isPending() {
        return this[_scope][_isPending];
    }

    /**
     * indicates if promise has been canceled
     * @returns {Boolean}
     */

    get isCanceled() {
        return this[_scope][_isCanceled];
    }

    get isChain() {
        return this[_scope][_isChain];
    }

    /**
     * Throttle progress tick
     * @param {Number} minTick
     * @returns {CPromise}
     */

    throttleProgress(minTick) {
        this[_scope].throttleProgress(minTick)
        return this;
    }

    /**
     * returns chains progress synchronously or adds a progress event listener if the argument was specified
     * @param {Function} listener
     * @returns {Number|CPromise}
     */

    progress(listener) {
        if (arguments.length === 0) {
            return this[_scope].progress();
        }

        this.on('progress', listener);
        return this;
    }

    /**
     * @borrows CPromiseScope.captureProgress
     * @see {@link CPromiseScope.captureProgress}
     * @returns {CPromise}
     */

    captureProgress() {
        this[_scope].captureProgress();
        return this;
    }

    /**
     * cancel the promise chain with specified reason
     * @param {String} reason
     * @returns {Boolean} true if success
     */

    cancel(reason) {
        return this[_scope].cancel(reason);
    }

    /**
     * Returns a chain that will be resolved after specified timeout
     * @param {Number} ms
     * @returns {CPromise}
     */

    delay(ms) {
        return this.then((value) => this.constructor.delay(ms, value));
    }

    /**
     * returns a CPromise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.
     * @param {onFulfilled} onFulfilled
     * @param {onRejected} [onRejected]
     * @returns {CPromise}
     */

    then(onFulfilled, onRejected) {
        const promise = super.then(
            onFulfilled && ((value) => onFulfilled.call(promise[_scope], value, promise[_scope])),
            onRejected && ((err) => onRejected.call(promise[_scope], err, promise[_scope]))
        );

        this[_scope][_attachScope](promise[_scope]);

        return promise;
    }

    /**
     * Catches rejection with optionally specified Error class
     * @param {Function} onRejected
     * @param {Error} filter
     * @returns {CPromise}
     */

    catch(onRejected, filter) {
        if (filter) {
            return super.catch((err) => {
                if (err instanceof filter) {
                    onRejected(err);
                    return;
                }
                throw err;
            });
        }

        return super.catch(onRejected);
    }

    /**
     * Checks if thing is an CanceledError instance
     * @param thing
     * @returns {boolean}
     */

    static isCanceledError(thing) {
        return thing instanceof CanceledError;
    }

    /**
     * Returns a CPromise that will be resolved after specified timeout
     * @param {Number} ms - delay before resolve the promise with specified value
     * @param value
     * @returns {CPromise}
     */

    static delay(ms, value) {
        return new this((resolve, reject, scope) => {
            if (!Number.isFinite(ms)) {
                throw TypeError('timeout must be a finite number');
            }
            const timer = setTimeout(() => resolve(value), ms);
            scope.onCancel(() => clearTimeout(timer));
        })
    }

    /**
     * Returns a single CPromise that resolves to an array of the results of the input promises.
     * If one fails then other promises will be canceled immediately
     * @param {Iterable} thenables
     * @returns {CPromise}
     */

    static all(thenables) {
        return new this((resolve, reject, scope) => {
            thenables = iterableToArray(thenables);

            const {length} = thenables;

            for (let i = 0; i < length; i++) {
                thenables[i] = this.from(thenables[i]) || this.resolve(thenables[i]);
            }

            const cancel = (reason) => {
                for (let i = 0; i < length; i++) {
                    thenables[i].cancel(reason);
                }
            };

            scope.on('capture', () => {
                const progress = new Array(length);
                for (let i = 0; i < length; i++) {
                    const index = i;
                    thenables[i].progress((value, scope, data) => {
                        progress[index] = value;
                        let sum = 0;
                        for (let i = 0; i < length; i++) {
                            progress[i] && (sum += progress[i]);
                        }
                        scope.progress(sum / length, scope, data);
                    })
                }
            })

            scope.onCancel(cancel);

            super.all(thenables).then(resolve, (err) => {
                reject(err);
                cancel();
            });
        });
    }

    /**
     * returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects,
     * with the value or reason from that promise. Other pending promises will be canceled immediately
     * @param {Iterable} thenables
     * @returns {CPromise}
     */

    static race(thenables) {
        return new this((resolve, reject, scope) => {
            thenables = iterableToArray(thenables);

            const {length} = thenables;

            for (let i = 0; i < length; i++) {
                thenables[i] = this.from(thenables[i]) || this.resolve(thenables[i]);
            }

            const cancel = (reason) => {
                for (let i = 0; i < length; i++) {
                    thenables[i].cancel(reason);
                }
            };

            scope.on('capture', () => {
                let max = 0;
                for (let i = 0; i < length; i++) {
                    thenables[i].progress((value, scope, data) => {
                        for (let i = 0; i < length; i++) {
                            if (value > max) {
                                max = value;
                                return scope.progress(value, scope, data);
                            }
                        }
                    })
                }
            });

            scope.onCancel(cancel);

            super.race(thenables).then((value) => {
                resolve(value);
                cancel();
            }, (err) => {
                reject(err);
                cancel();
            });
        });
    }

    static [_objectToCPromise](thing) {
        const convertMethod = thing[_toCPromise];

        if (typeof convertMethod === 'function') {
            if (promiseAssocStore.has(thing)) {
                return promiseAssocStore.get(thing)
            }

            const returnedValue = convertMethod.call(thing, this);

            if (!(returnedValue instanceof this)) {
                throw Error(`method '[${convertMethod}]' must return a CPromise instance`)
            }

            promiseAssocStore.set(thing, returnedValue);

            return returnedValue;
        }

        if (typeof thing.then === 'function') {
            return new this((resolve, reject, {onCancel}) => {
                if (typeof thing.cancel === 'function') {
                    onCancel(reason => {
                        try {
                            thing.cancel(reason);
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
                return thing.then(resolve, reject);
            });
        }

        return null;
    }

    /**
     * Converts thing to CPromise using the following rules:
     * - CPromise instance returns as is
     * - Objects with special method defined with key `Symbol.for('toCPromise')` will be converted using this method
     *   The result will be cached for future calls
     * - Thenable wraps into a new CPromise instance, if thenable has the `cancel` method it will be used for canceling
     * - Generator function will be resolved to CPromise
     * - Array will be resoled via `CPromise.all`, arrays with one element (e.g. `[[1000]]`) will be resolved via `CPromise.race`
     * - Number will be converted to `CPromise.delay`
     *
     * This method returns null if the conversion failed.
     * @param {*} thing
     * @param {Array} [args]
     * @returns {CPromise|null}
     */

    static from(thing, args) {
        if (thing === null || thing === undefined) return null;

        const type = typeof thing;

        if (type === 'object') {
            if (thing instanceof this) {
                return thing;
            }

            const promise = this[_objectToCPromise](thing);
            if (promise) return promise;

            if (isArray(thing)) {
                if (thing.length === 1) {
                    const first = thing[0];
                    if (isArray(first)) {
                        return this.race(first.map(this.from, this));
                    }
                }
                return this.all(thing.map(this.from, this))
            }
        } else if (type === 'function') {
            if (isGeneratorFunction(thing)) {
                return resolveGenerator.call(this, thing, args)
            }
            return this[_objectToCPromise](thing);
        } else if (type === 'number') {
            return this.delay(thing);
        }

        return null;
    }
}

const {prototype} = CPromise;

['on', 'off', 'once'].forEach(methodName => {
    const scopeMethod = CPromiseScope.prototype[methodName];

    prototype[methodName] = function () {
        scopeMethod.apply(this[_scope], arguments);
        return this;
    }
});

['weight', 'label', 'timeout'].forEach(methodName => {
    const scopeMethod = CPromiseScope.prototype[methodName];
    prototype[methodName] = function () {
        if (arguments.length) {
            scopeMethod.apply(this[_scope], arguments);
            return this;
        }
        return scopeMethod.call(this[_scope]);
    }
})

function bindMethod(prototype, methodName) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);
    if (!descriptor) {
        throw Error(`Property ${methodName} doesn't exists`);
    }
    const method = descriptor.value;
    const boundSymbol = Symbol(`${methodName}Bound`);

    Object.defineProperty(prototype, methodName, {
        get() {
            const context = this;
            return this[boundSymbol] || (this[boundSymbol] = function () {
                return method.apply(context, arguments);
            })
        }
    });
}

bindMethod(CPromiseScope.prototype, 'onCancel');

Object.defineProperties(CPromise, {
    CanceledError: {value: CanceledError, configurable: true},
    AbortController: {value: _AbortController, configurable: true},
    CPromiseScope: {value: CPromiseScope, configurable: true}
});

/**
 * Exports CPromise class as a default
 * @exports CPromise
 */

module.exports = CPromise;





