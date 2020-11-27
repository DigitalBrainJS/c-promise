/**
 * Cancellable Promise with extra features
 * @module CPromise
 * @exports CPromise
 */

/**
 * @typedef {String|Symbol} EventType
 */
const {CanceledError} = require('./canceled-error');
const {AbortController, isAbortSignal} = require('./abort-controller');
const {validateOptions, validators} = require('./validator');
const {isThenable, EmptyObject, setImmediate, isGeneratorFunction, isGenerator, toGenerator, toArray} = require('./utils');

const {now} = Date;
const {isArray} = Array;

const _toCPromise = Symbol.for('toCPromise');

const _shadow = Symbol('shadow');
const _events = Symbol('events');
const _resolve = Symbol('done');
const _objectToCPromise = Symbol('objectToCPromise');

const TYPE_PROGRESS = Symbol('TYPE_PROGRESS');
const SIGNAL_CANCEL = Symbol('SIGNAL_CANCEL');
const SIGNAL_PAUSE = Symbol('SIGNAL_PAUSE');
const SIGNAL_RESUME = Symbol('SIGNAL_RESUME');

const promiseAssocStore = new WeakMap();

const computeWeightSum = promises => {
    let i = promises.length;
    let sum = 0;
    while (i-- > 0) {
        sum += promises[i][_shadow].weight;
    }
    return sum;
}

function resolveGenerator(generatorFn) {
    return new this((resolve, reject, scope) => {
        const generator = generatorFn.call(scope, scope);

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
            progress = (value * weight + sum) / scope.innerWeight();
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
                reject(e);
            }
        }

        scope.on('signal', (type, data) => {
            switch (type) {
                case SIGNAL_CANCEL:
                    if (!promise.cancel(data)) {
                        onRejected(data);
                    }
                    return true;
                case SIGNAL_PAUSE:
                    promise.pause();
                    return true;
                case SIGNAL_RESUME:
                    promise.resume();
                    return true;
            }

            return promise.emitSignal(type, data);
        });

        const next = (r) => {
            if (r.done) {
                return resolve(r.value);
            }

            promise = this.from(r.value);

            sum += weight;
            weight = promise.isChain ? 1 : promise.weight();

            setImmediate(() => {
                isCaptured && promise.progress((value, scope, data) => {
                    setProgress(value, scope, data);
                });
            });

            return promise.then((value) => {
                setProgress(1, promise);
                onFulfilled(value)
            }, onRejected);
        }

        onFulfilled();
    })
}

/**
 * @typedef {Function} CPromiseExecutorFn
 * @this CPromise
 * @param {Function} resolve
 * @param {Function} reject
 * @param {CPromise} scope
 */

/**
 * @typedef {Object} PromiseOptionsObject
 * @property {String} label
 * @property {Number} timeout
 * @property {Number} weight
 */

/**
 * If value is a number it will be considered as the value for timeout option
 * If value is a string it will be considered as a label
 * @typedef {PromiseOptionsObject|String|Number} CPromiseOptions
 */

/**
 * CPromise class
 * @namespace
 * @extends Promise
 */

class CPromise extends Promise {
    /**
     * Constructs new CPromise instance
     * @param {CPromiseExecutorFn} executor - promise executor function that will be invoked
     * in the context of the new CPromise instance
     * @param {CPromiseOptions} [options]
     */

    constructor(executor, options) {
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

        let {label, weight, timeout, signal} = options || {};

        let resolve, reject;

        super((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        });

        this[_events] = new EmptyObject();

        const shadow = this[_shadow] = {
            resolve,
            reject,
            paused: false,
            timestamp: -1,
            innerChain: null,
            parent: null,
            isCaptured: false,
            progress: 0,
            computedProgress: -1,
            totalWeight: -1,
            innerWeight: -1,
            throttle: 0,
            throttleTimer: 0,
            isListening: false,
            isPending: true,
            isCanceled: false,
            isChain: true,
            label: '',
            weight: 1
        };

        this.onCancel = this.onCancel.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onResume = this.onResume.bind(this);
        this.onCapture = this.onCapture.bind(this);

        try {
            executor.call(this, value => {
                this.resolve(value)
            }, err => {
                this.reject(err)
            }, this);
        } catch (err) {
            this.reject(err);
        }

        signal !== undefined && this.listen(signal);

        timeout !== undefined && this.timeout(timeout);

        weight !== undefined && this.weight(weight);

        label !== undefined && this.label(label);

        this.on('propagate', (type, scope, data) => {
            if (type === TYPE_PROGRESS) {
                shadow.computedProgress = -1;
                shadow.isListening && this.emit('progress', this.progress(), scope, data);
            }
        });

        this.on('newListener', (event) => {
            if (event === 'progress') {
                shadow.isListening = true;
                if (!shadow.isCaptured) {
                    this.captureProgress()
                }
            }
        })

        this.on('removeListener', (event) => {
            if (event === 'progress') {
                if (shadow.isListening && !this.hasListeners('progress')) {
                    shadow.isListening = false;
                }
            }
        })
    }

    /**
     * @typedef {Function} OnCancelListener
     * @param {CanceledError} reason
     */

    /**
     * @typedef {Function} OnPauseListener
     */

    /**
     * @typedef {Function} OnResumeListener
     */

    /**
     * registers the listener for cancel event
     * @name CPromise#onCancel
     * @param {OnCancelListener} listener
     * @returns {CPromise}
     */

    /**
     * registers the listener for pause event
     * @name CPromise#onPause
     * @param {OnPauseListener} listener
     * @returns {CPromise}
     */

    /**
     * registers the listener for resume event
     * @name CPromise#onResume
     * @param {OnResumeListener} listener
     * @returns {CPromise}
     */

    /**
     * Set or get the total weight of the inner chains
     * @param {Number} [weight]
     * @return {Number|CPromise}
     */

    totalWeight(weight) {
        if (arguments.length) {
            if (weight <= 0 || !Number.isFinite(weight)) {
                throw Error('weight must be a number greater than 0')
            }
            this[_shadow].totalWeight = weight;
            return this;
        }
        return this[_shadow].totalWeight;
    }

    /**
     * Set or get the total weight of the inner chains
     * @param {Number} [weight]
     * @return {Number|CPromise}
     */

    innerWeight(weight) {
        if (arguments.length) {
            if (!Number.isFinite(weight)) {
                throw Error('inner weight must be a number')
            }

            if (weight <= 0) {
                throw Error('inner weight must be greater than 0')
            }

            this[_shadow].innerWeight = weight;
            return this;
        }
        return this[_shadow].innerWeight;
    }

    /**
     * Subscribe to progress event
     * @param {Function} listener
     * @returns {CPromise}
     */

    /**
     * Set promise progress
     * @param {Number} value a number between [0, 1]
     * @param {*} [data] any data to send for progress event listeners
     * @returns {Number|CPromise}
     */

    progress(value, data) {
        const shadow = this[_shadow];

        if (arguments.length) {

            if (typeof value === 'function') {
                this.on('progress', value);
                return this;
            }

            if (!Number.isFinite(value)) {
                throw TypeError('value must be a number [0, 1]');
            }

            if (value < 0) {
                value = 0;
            } else if (value > 1) {
                value = 1;
            }

            if (!shadow.isCaptured) return this;

            if (value !== 0 && value !== 1) {
                value = value.toFixed(10) * 1;
            }

            if (shadow.progress !== value) {
                shadow.progress = value;

                if (value !== 1 && shadow.throttle) {
                    if (!shadow.throttleTimer) {
                        shadow.throttleTimer = setTimeout(() => {
                            shadow.throttleTimer = 0;
                            this.propagate(TYPE_PROGRESS, data);
                        }, shadow.throttle);
                    }
                    return this;
                }

                this.propagate(TYPE_PROGRESS, data);
            }

            return this;
        }

        if (shadow.computedProgress === -1) {
            shadow.totalWeight === -1 && this.captureProgress();

            const scopes = this.scopes();
            let i = scopes.length;
            let sum = 0;
            let progress = 0;

            while (i-- > 0) {
                const scope = scopes[i];
                const thatShadow = scope[_shadow];
                const weight = thatShadow.weight;
                if (weight > 0) {
                    sum += weight;
                    progress += thatShadow.progress * weight;
                }
            }

            let total = shadow.totalWeight;

            if (total > 0) {
                return (shadow.computedProgress = (progress + (total - sum)) / total);
            }

            shadow.computedProgress = progress / sum;
        }

        return shadow.computedProgress;
    }

    /**
     * emit propagate event that will propagate through each promise scope in the chain (bubbling)
     * @param {String|symbol} type - some type to identify the data kind
     * @param {*} data - some data
     * @returns {CPromise}
     */

    propagate(type, data = null) {
        return this.emit('propagate', type, this, data);
    }

    /**
     * capture initial progress state of the chain
     * @param {Object} [options]
     * @param {Number} options.throttle set min interval for firing progress event
     * @param {Number} options.innerWeight set weight of the nested promises
     * @returns {CPromise}
     */

    captureProgress(options) {
        if (options) {
            validateOptions(options, {
                throttle: validators.numberFinitePositive,
                innerWeight: validators.numberFinitePositive
            })

            const {throttle, innerWeight} = options;

            if (throttle !== undefined) {
                this[_shadow].throttle = throttle;
            }

            if (innerWeight !== undefined) {
                this.innerWeight(innerWeight);
            }
        }

        const shadow = this[_shadow];
        const scopes = this.scopes();
        let i = scopes.length;
        let sum = 0;

        while (i-- > 0) {
            const scope = scopes[i];
            const thatShadow = scope[_shadow];
            const weight = thatShadow.weight;

            if (weight > 0) {
                sum += weight;

                if (!thatShadow.isCaptured) {
                    thatShadow.isCaptured = true;
                    scope.emit('capture', scope);
                }

                const inner = thatShadow.innerChain;
                if (inner && !inner[_shadow].isCaptured) {
                    inner.captureProgress(options);
                }
            }
        }

        shadow.totalWeight = sum;

        return this;
    }

    /**
     * Returns all parent scopes that are in pending state
     * @returns {CPromise[]}
     */

    scopes() {
        let scope = this;
        const scopes = [scope];
        while ((scope = scope[_shadow].parent)) {
            scopes.push(scope);
        }
        return scopes;
    }

    /**
     * timeout before the promise will be canceled
     * @param {Number} [ms] - timeout in ms
     * @returns {Number|CPromise}
     */

    timeout(ms) {
        const shadow = this[_shadow];

        if (arguments.length) {
            if (shadow.timer) {
                shadow.timestamp = -1;
                clearTimeout(shadow.timer);
                shadow.timer = null;
            }

            if (typeof ms !== 'number' || ms < 0) {
                throw TypeError('timeout must be a positive number');
            }

            if (ms > 0) {
                shadow.timestamp = now();
                setTimeout(() => {
                    this.cancel('timeout');
                }, (shadow.timeout = ms));
            }
            return this;
        }

        return shadow.timeout;
    }

    /**
     * get promise abort signal object
     * @type {AbortSignal}
     */

    get signal() {
        if (this[_shadow].controller) return this[_shadow].controller.signal;

        return (this[_shadow].controller = new AbortController()).signal;
    }

    /**
     * Sets the promise weight in progress capturing process
     * @param {Number} [weight] - any number greater or equal 0
     * @returns {Number|CPromise} returns weight if no arguments were specified
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
     * @param {String} [label] - any string
     * @returns {Number|CPromise} returns weight if no arguments were specified
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
        return this[_shadow].isPending;
    }

    /**
     * indicates if the promise is pending
     * @returns {Boolean}
     */

    get isCanceled() {
        return this[_shadow].isCanceled;
    }

    /**
     * indicates if the promise progress is captured
     * @return {Boolean}
     */

    get isCaptured() {
        return this[_shadow].isCaptured;
    }

    /**
     * indicates if the promise is paused
     * @returns {Boolean}
     */

    get isPaused() {
        return this[_shadow].paused;
    }

    /**
     * get parent promise
     * @returns {CPromise|null}
     */

    get parent() {
        return this[_shadow].parent;
    }

    /**
     * Resolves the promise with given value
     * @param value
     * @returns {CPromise}
     */

    resolve(value) {
        this[_resolve](value, false);
        return this;
    }

    /**
     * Rejects the promise with given error
     * @param err
     * @returns {CPromise}
     */

    reject(err) {
        this[_resolve](err, true);
        return this;
    }

    [_resolve](value, isRejected) {
        const shadow = this[_shadow];
        if (!shadow.isPending) return this;

        const complete = (value, isRejected) => {
            shadow.timer && clearTimeout(shadow.timer);

            const resolve = () => {
                if (isRejected) {
                    this.emit('done', value);
                    shadow.reject(value);
                } else {
                    shadow.isCaptured && this.progress(1);
                    this.emit('done', undefined, value);
                    shadow.resolve(value);
                }
                shadow.isPending = false;
                shadow.innerChain = null;
                shadow.parent = null;
                this[_events] = null;
            }

            if (isRejected && value && value instanceof CanceledError) {
                shadow.isCanceled = true;

                value.scope || (value.scope = this);

                if (shadow.controller) {
                    shadow.controller.abort();
                    shadow.controller = null;
                }

                this.emit('cancel', value);
                resolve();
                return;
            }

            if (shadow.paused) {
                return this.on('resume', resolve);
            }

            resolve();
        }

        if (!isThenable(value)) {
            complete(value, isRejected);
            return;
        }

        if (value instanceof CPromise) {
            shadow.innerChain = value;

            value.on('propagate', (type, scope, data) => {
                if (type === TYPE_PROGRESS) {
                    const progress = value.progress();
                    if (scope === value) {
                        this.progress(progress, data);
                        return;
                    }
                }

                this.emit('propagate', type, scope, data);
            });

            shadow.isCaptured && value.captureProgress();

            shadow.innerWeight = value[_shadow].totalWeight;
        }

        super.then.call(
            value,
            (value) => {
                complete(value)
            },
            (err) => {
                complete(err, true)
            }
        );
    }

    /**
     * Pause promise
     * @returns {Boolean}
     */

    pause() {
        return this.emitSignal(SIGNAL_PAUSE, null, function () {
            const shadow = this[_shadow];

            if (!shadow.paused) {
                shadow.paused = true;
                if (shadow.timer) {
                    clearTimeout(shadow.timer);
                    shadow.timer = null;
                    shadow.timestamp !== -1 && (shadow.timeLeft = now() - shadow.timestamp);
                }

                this.emit('pause');
            }
            return true;
        });
    }

    /**
     * Resume promise
     * @returns {Boolean}
     */

    resume() {
        return this.emitSignal(SIGNAL_RESUME, null, function () {
            const shadow = this[_shadow];

            if (shadow.paused) {
                shadow.paused = false;
                if (shadow.timeLeft) {
                    this.timeout(shadow.timeLeft);
                    shadow.timeLeft = 0;
                }
                this.emit('resume');
            }
            return true;
        });
    }

    /**
     * throws the CanceledError that cause promise chain cancellation
     * @param {String|Error} [reason]
     */

    cancel(reason) {
        return this.emitSignal(SIGNAL_CANCEL, CanceledError.from(reason), function (data) {
            this.reject(data);
            return true;
        });
    }

    /**
     * @typedef {String|Signal} Signal
     */

    /**
     * @typedef {Function} SignalHandler
     * @param {Signal} type
     * @param {*} data
     * @param {CPromise} scope
     * @this {CPromise}
     * @returns {Boolean}
     */

    /**
     * Emit a signal of the specific type
     * @param {*} [data]
     * @param {Signal} type
     * @param {Function} [handler]
     * @returns {Boolean}
     */

    emitSignal(type, data, handler) {
        const shadow = this[_shadow];
        if (!shadow.isPending) return false;

        let {parent, innerChain} = shadow;

        if (parent && parent.emitSignal(type, data, handler)) {
            return true;
        }

        if (innerChain && innerChain.emitSignal(type, data, handler)) {
            return true;
        }

        return !!(this.emitHook('signal', type, data) || handler && handler.call(this, data, type, this));
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
            onFulfilled ? ((value) => onFulfilled.call(promise, value, promise)) : value => {
                if (this[_shadow].isCanceled) {
                    promise[_shadow].isCanceled = true;
                }
                return value;
            },
            onRejected && ((err) => {
                if(err instanceof CanceledError){
                    promise[_shadow].isCanceled= true;
                }
                return onRejected.call(promise, err, promise)
            })
        );

        promise[_shadow].parent = this;

        this.on('propagate', (type, scope, data) => {
            promise.emit('propagate', type, scope, data);
        });

        return promise;
    }

    /**
     * Catches rejection with optionally specified Error class
     * @param {Function} onRejected
     * @param {Error} [filter]
     * @returns {CPromise}
     */

    catch(onRejected, filter) {
        if (filter) {
            return super.catch((err, scope) => {
                if (err instanceof filter) {
                    onRejected(err, scope);
                    return;
                }
                throw err;
            });
        }

        return super.catch(onRejected);
    }

    /**
     * Catches CancelError rejection
     * @param {Function} [onCanceled]
     * @returns {CPromise}
     */

    canceled(onCanceled) {
        return this.catch((err, scope) => {
            if (err instanceof CanceledError) {
                if (onCanceled === undefined) return;

                if (typeof onCanceled !== 'function') {
                    throw TypeError('onCanceled must be a function');
                }

                return onCanceled(err, scope);
            }

            throw err;
        });
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
     * Listen for abort signal
     * @param {AbortSignal} signal
     * @returns {CPromise}
     */

    listen(signal) {
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

        return this;
    }

    /**
     * @typedef {object} AllOptions
     * @property {number} concurrency limit concurrency of promise being run simultaneously
     * @property {function} mapper function to map each element
     * @property {boolean} ignoreResults do not collect results
     * @property {boolean} signatures use advanced signatures for vales resolving
     */

    /**
     * Returns a single CPromise that resolves to an array of the results of the input promises.
     * If one fails then other promises will be canceled immediately
     * @param {Iterable|Generator|GeneratorFunction} iterable
     * @param {AllOptions} options
     * @returns {CPromise}
     * @example
     * CPromise.all(function*(){
     *     yield axios.get(url1);
     *     yield axios.get(url2);
     *     yield axios.get(url3);
     * }, {concurrency: 1}).then(console.log)
     */

    static all(iterable, options) {
        return new this((resolve, reject, scope) => {
            let pending;
            let results;
            let progressAcc = 0;
            let isCaptured;
            let endReached;
            let generator;

            if (options !== undefined) {
                validateOptions(options, {
                    concurrency: validators.numberFinitePositive,
                    ignoreResults: validators.boolean,
                    signatures: validators.boolean,
                    mapper: validators.function
                })
            }

            let {
                concurrency = 0,
                ignoreResults,
                signatures,
                mapper
            } = options || {}

            const cancel = (reason) => {
                const {length} = pending;
                for (let i = 0; i < length; i++) {
                    pending[i].cancel(reason);
                }
            }

            scope.onCancel(cancel);

            scope.onPause(() => {
                const {length} = pending;
                for (let i = 0; i < length; i++) {
                    pending[i].pause();
                }
            });

            scope.onResume(() => {
                const {length} = pending;
                for (let i = 0; i < length; i++) {
                    pending[i].resume();
                }
            })

            scope.on('signal', (type, data)=>{
                const {length} = pending;
                let result= false;
                for (let i = 0; i < length; i++) {
                    if(pending[i].emitSignal(type, data)){
                        result= true;
                    }
                }
                return result;
            });

            const handleProgress = (value, _scope, data) => {
                let total = scope.innerWeight();
                let sum = progressAcc;
                const {length} = pending;
                for (let i = 0; i < length; i++) {
                    const promise = pending[i];
                    sum += promise.progress() * promise.weight();
                }
                sum <= total && scope.progress(sum / total, _scope, data);
            };

            const _reject = err => {
                reject(err);
                cancel();
            }

            function throwConvertError() {
                throw TypeError('unable to convert object to iterable');
            }

            scope.on('capture', () => {
                let i = pending.length;
                while (i-- > 0) {
                    pending[i].progress(handleProgress);
                }
                isCaptured = true;
                scope.innerWeight() === -1 && scope.innerWeight(computeWeightSum(pending));
            });

            if (!concurrency) {
                pending = toArray(iterable, (value, i) => {
                    return this.from(mapper ? mapper(value, i) : value, signatures);
                }) || throwConvertError();

                return super.all(pending).then(resolve, _reject);
            }

            generator = toGenerator(iterable) || throwConvertError();

            pending = [];
            !ignoreResults && (results = []);

            const next = (value) => {
                const promise = this.from(value, signatures);

                pending.push(promise);

                isCaptured && promise.progress(handleProgress);

                promise.then(resolved => {
                    const index = pending.indexOf(promise);
                    if (index !== -1) {
                        pending.splice(index, 1);
                    }

                    !ignoreResults && results.push(resolved);

                    isCaptured && (progressAcc += promise.weight());

                    !endReached && pump();

                    if (!pending.length) {
                        resolve(ignoreResults ? undefined : results);
                    }
                }, _reject);
            }

            const pump = () => {
                while (!endReached && pending.length < concurrency) {
                    let item;
                    try {
                        item = generator.next();
                    } catch (err) {
                        _reject(err);
                        return;
                    }

                    if (item.done) {
                        endReached = true;
                        return;
                    }
                    next(mapper ? mapper(item.value) : item.value);
                }
            }

            pump();
        })
    }

    /**
     * returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects,
     * with the value or reason from that promise. Other pending promises will be canceled immediately
     * @param {Iterable} thenables
     * @returns {CPromise}
     */

    static race(thenables) {
        return new this((resolve, reject, scope) => {
            thenables = toArray(thenables);

            const {length} = thenables;

            for (let i = 0; i < length; i++) {
                thenables[i] = this.from(thenables[i]);
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
                                return scope.set(value, data);
                            }
                        }
                    })
                }
            });

            scope.onCancel(cancel);

            scope.onPause(() => {
                for (let i = 0; i < length; i++) {
                    thenables[i].pause();
                }
            })

            scope.onResume(() => {
                for (let i = 0; i < length; i++) {
                    thenables[i].resume();
                }
            })

            scope.on('signal', (type, data)=>{
                const {length} = thenables;
                let result= false;
                for (let i = 0; i < length; i++) {
                    if(thenables[i].emitSignal(type, data)){
                        result= true;
                    }
                }
                return result;
            });

            super.race(thenables).then((value) => {
                resolve(value);
                cancel();
            }, (err) => {
                reject(err);
                cancel();
            });
        });
    }

    /**
     * returns a promise that resolves after all of the given promises have either fulfilled or rejected
     * @param {Iterable|Generator|GeneratorFunction} iterable
     * @param {AllOptions} options
     * @returns {CPromise}
     */

    static allSettled(iterable, options) {
        const {mapper, ...allOptions} = options || {};

        return this.all(iterable, {
            ...allOptions,
            mapper: (value, i) => {
                return this.resolve(mapper ? mapper(value, i) : value).then(
                    value => ({status: "fulfilled", value}),
                    err => ({status: "rejected", reason: err})
                )
            }
        })
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

        if (thing && typeof thing.then === 'function') {
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
     *
     * This method returns null if the conversion failed.
     * @param {*} thing
     * @param {boolean} [resolveSignatures= true]
     * @returns {CPromise}
     */

    static from(thing, resolveSignatures = true) {
        if (thing && thing instanceof this) {
            return thing;
        }

        if (resolveSignatures) {
            const type = typeof thing;

            if (type === 'object') {
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
                    return resolveGenerator.call(this, thing)
                }
            }

            return this[_objectToCPromise](thing) || this.resolve(thing);
        }

        return this.resolve(thing);
    }

    /**
     * adds a new listener
     * @param {EventType} type
     * @param {Function} listener
     * @param {Boolean} [prepend= false]
     * @returns {CPromise}
     */

    on(type, listener, prepend) {
        const events = this[_events];
        if (!events) return this;
        const listeners = events[type];

        events['newListener'] && this.emit('newListener', type, listener);

        if (!listeners) {
            events[type] = listener;
            return this;
        }

        if (typeof listeners === 'function') {
            events[type] = prepend ? [listener, listeners] : [listeners, listener];
            return this;
        }

        prepend ? listeners.unshift(listener) : listeners.push(listener);
        return this;
    }

    /**
     * removes the listener
     * @param {EventType} type
     * @param {Function} listener
     * @returns {CPromise}
     */

    off(type, listener) {
        if (typeof listener !== 'function') {
            throw TypeError('listener must be a function');
        }

        const events = this[_events]
        if (!events) return this;
        const listeners = events[type];
        if (!listeners) {
            return this;
        }

        if (typeof listeners === 'function' && listeners === listener) {
            events[type] = null;
            events['removeListener'] && this.emit('removeListener', type, listener);
            return this;
        }

        const len = listeners.length;

        for (let i = 0; i < len; i++) {
            if (listeners[i] === listener) {
                len === 1 ? events[type] = null : listeners.splice(i, 1);
                events['removeListener'] && this.emit('removeListener', type, listener);
                return this;
            }
        }

        return this;
    }

    /**
     * returns listeners count of the specific event type
     * @param {EventType} type
     * @returns {Number}
     */

    listenersCount(type) {
        const events = this[_events];
        if (!events) return 0;
        const listeners = events[type];
        if (!listeners) return 0;
        return typeof listeners === 'function' ? 1 : listeners.length;
    }

    /**
     * checks if there are listeners of a specific type
     * @param {String|Symbol} type
     * @returns {Boolean}
     */

    hasListeners(type) {
        const events = this[_events];
        return !!(events && events[type]);
    }

    /**
     * add 'once' listener
     * @param {EventType} type
     * @param {Function} listener
     * @returns {CPromise}
     */

    once(type, listener) {
        const emitter = this;

        function _listener() {
            emitter.off(type, _listener);
            listener.apply(emitter, arguments);
        }

        return this.on(type, _listener);
    }

    /**
     * emits the event
     * @param {EventType} type
     * @param args
     * @returns {CPromise}
     */

    emit(type, ...args) {
        const events = this[_events];
        if (!events) return this;
        const listeners = events[type];
        if (!listeners) return this;

        if (typeof listeners === 'function') {
            listeners.apply(this, args);
            return this;
        }

        for (let i = 0; i < listeners.length; i++) {
            listeners[i].apply(this, args)
        }

        return this;
    }

    /**
     * Emits event as a hook. If some listener return true, this method will immediately return true as the result.
     * Else false will be retuned
     * @param {EventType} type
     * @param args
     * @returns {Boolean}
     */

    emitHook(type, ...args) {
        const events = this[_events];
        if (!events) return false;
        const listeners = events[type];
        if (!listeners) return false;

        if (typeof listeners === 'function') {
            return !!listeners.apply(this, args);
        }

        for (let i = 0; i < listeners.length; i++) {
            if (listeners[i].apply(this, args)) {
                return true;
            }
        }

        return false;
    }
}

const {prototype} = CPromise;

prototype.addEventListener = prototype.on;
prototype.removeEventListener = prototype.off;

['Cancel', 'Pause', 'Resume', 'Capture'].forEach(type => {
    const typeL = type.toLowerCase();
    prototype['on' + type] = function (listener) {
        if (!this[_shadow].isPending) {
            throw Error(`Unable to subscribe to ${typeL} event since promise has been already settled`);
        }
        return this.on(typeL, listener);
    }
});

Object.defineProperties(CPromise, Object.entries({
    CanceledError,
    AbortController,
    SIGNAL_CANCEL: SIGNAL_CANCEL,
    SIGNAL_PAUSE: SIGNAL_PAUSE,
    SIGNAL_RESUME: SIGNAL_RESUME,
}).reduce((descriptors, [prop, value]) => {
    descriptors[prop] = {value, configurable: true};
    return descriptors;
}, {}));

Object.entries(Object.getOwnPropertyDescriptors(prototype)).forEach(([prop, descriptor]) => {
    if (descriptor.get && descriptor.set === undefined) {
        descriptor.set = function () {
            throw Error(`Can not rewrite read-only public property '${prop}'`);
        }
        Object.defineProperty(prototype, prop, descriptor);
    }
})

module.exports = CPromise;
