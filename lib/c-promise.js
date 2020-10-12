/**
 * Cancellable Promise with extra features
 * @module CPromise
 * @exports CPromise
 */

const {CanceledError} = require('./canceled-error');
const {AbortController: _AbortController} = require('./abort-controller');
const {TinyEventEmitter} = require('./tiny-event-emitter');
const {validateOptions, validators}= require('./validator');

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
    return thing && typeof thing === 'object' && typeof thing.next === 'function';
}

const GENERATOR_TYPE_GENERAL= 1;
const GENERATOR_TYPE_ASYNC= 2;

function getGeneratorFnType(thing) {
    return typeof thing === 'function' &&
        thing.constructor &&
        (thing.constructor.name === 'GeneratorFunction' && GENERATOR_TYPE_GENERAL ||
            thing.constructor.name === 'AsyncGeneratorFunction' && GENERATOR_TYPE_ASYNC) || 0;
}

const toGenerator= function(thing, args, context= null){
    if(isGeneratorFunction(thing)){
        return thing.apply(context, args);
    }
    return thing && (isGenerator(thing)? thing : (thing[Symbol.iterator] && thing[Symbol.iterator]())) || null;
}

const toArray= (thing, mapper)=>{

    if (thing) {
        if (Array.isArray(thing)) {
            return mapper ? thing.map(mapper) : thing;
        }

        if ((thing= toGenerator(thing))) {
            const arr = [];
            let item;
            while ((item = thing.next()) && item.done === false) {
                arr.push(mapper ? mapper(item.value) : item.value);
            }
            return arr;
        }
    }

    return null;
}

const isAbortSignal = (thing) => {
    return thing &&
        typeof thing === 'object' &&
        typeof thing.aborted === 'boolean' &&
        typeof thing.addEventListener === 'function' &&
        typeof thing.removeEventListener === 'function';
}

const computeWeightSum = promises => {
    let i = promises.length;
    let sum = 0;
    while (i-- > 0) {
        sum += promises[i][_scope][_shadow].weight;
    }
    return sum;
}

function resolveGenerator(generatorFn) {
    return new this((resolve, reject, scope) => {
        const generator = generatorFn.apply(scope, scope);

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
                return reject(e);
            }
        }

        scope.on('cancelhook', (err) => {
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
            progress: 0,
            computedProgress: -1,
            totalWeight: -1,
            innerWeight: -1,
            isListening: false,
            throttle: 0,
            throttleTimer: 0
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
                shadow.computedProgress = -1;
                shadow.isListening && this.emit('progress', this.progress(), scope, data);
            }
        });

        this.on('newListener', (event) => {
            if (event === 'progress') {
                shadow.isListening= true;
                if (!shadow.captured) {
                    this.captureProgress()
                }
            }
        })

        this.on('removeListener', (event) => {
            if (event === 'progress') {
                if (shadow.isListening && !this.hasListeners('progress')) {
                    shadow.isListening= false;
                }
            }
        })
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
     * Set or get the total weight of the inner chains
     * @param {Number} [weight]
     * @return {Number|CPromiseScope}
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
     * @return {Number|CPromiseScope}
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
     * Set promise progress
     * @param {Number} value a number between [0, 1]
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

            if(!shadow.captured) return;

            if (value !== 0 && value !== 1) {
                value = value.toFixed(10) * 1;
            }

            if (shadow.progress !== value) {
                shadow.progress = value;

                if (value !== 1 && shadow.throttle) {
                    if(!shadow.throttleTimer) {
                        shadow.throttleTimer = setTimeout(() => {
                            shadow.throttleTimer = 0;
                            this.propagate(TYPE_PROGRESS, data);
                        }, shadow.throttle);
                    }
                    return;
                }

                this.propagate(TYPE_PROGRESS, data);
            }

            return this;
        }

       if(shadow.computedProgress === -1) {
           shadow.totalWeight===-1 && this.captureProgress();

           const scopes = this.scopes();
           let i = scopes.length;
           let sum = 0;
           let progress= 0;

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
     * @returns {CPromiseScope}
     */

    propagate(type, data = null) {
        this.emit('propagate', type, this, data);
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
                }

                this.emit('propagate', type, scope, data);
            });

            shadow.captured && thatScope.captureProgress();

            shadow.innerWeight= thatScope[_shadow].totalWeight;
        } else {
            thatScope[_parent] = this;
            this.on('propagate', (type, scope, data) => {
                thatScope.emit('propagate', type, scope, data);
            });
            thatScope[_isChain] = false;
        }
    }

    /**
     * capture initial progress state of the chain
     * @param {Object} options
     * @param {Number} options.throttle set min interval for firing progress event
     * @returns {CPromiseScope}
     */

    captureProgress(options) {

        if (options) {
            validateOptions(options, {throttle: validators.numberFinitePositive})

            const {throttle} = options;

            if (throttle!==undefined){
                this[_shadow].throttle = throttle;
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

                if(!thatShadow.captured){
                    thatShadow.captured = true;
                    scope.emit('capture', scope);
                }

                const inner = scope[_innerChain];
                if(inner && !inner[_shadow].captured){
                    inner.captureProgress(options);
                }
            }
        }

        shadow.totalWeight = sum;

        return this;
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
     * @param {Number} ms - timeout in ms
     * @returns {Number|CPromiseScope}
     */

    timeout(ms) {
        if (arguments.length) {
            if (this[_timer]) {
                clearTimeout(this[_timer]);
                this[_timer] = null;
            }

            if (typeof ms !== 'number' || ms < 0) {
                throw TypeError('timeout must be a positive number');
            }

            if (ms > 0) {
                setTimeout(() => {
                    this.cancel('timeout');
                }, (this[_timeout] = ms));
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
     * @param {Number} weight - any number greater or equal 0
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

    get isCaptured(){
        return this[_shadow].captured;
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
     * @param err
     * @param value
     * @param {boolean} [reject]
     * @private
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
     * @param {*} value
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
 * If value is a string it will be considered as a label
 * @typedef {PromiseScopeOptions|String|Number} CPromiseOptions
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
     * capture initial progress state of the chain
     * @param {Object} options
     * @param {Number} options.throttle
     * @returns {CPromise}
     */

    captureProgress(options) {
        this[_scope].captureProgress(options);
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
     * @param {Error} [filter]
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
     * @typedef {object} AllOptions
     * @property {number} limit concurrency of promise being run simultaneously
     * @property {function} mapper mapper function to map each element
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
            let progressAcc= 0;
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
            }= options || {}

            const cancel= (reason)=>{
                const {length}= pending;
                for (let i = 0; i < length; i++) {
                    iterable[i].cancel(reason);
                }
            }

            scope.onCancel(cancel);

            const handleProgress= (value, _scope, data) => {
                let total = scope.innerWeight();
                let sum = progressAcc;
                const {length} = pending;
                for (let i = 0; i < length; i++) {
                    const promise = pending[i];
                    sum += promise.progress() * promise.weight();
                }
                sum <= total && scope.progress(sum / total, _scope, data);
            };

            const _reject= err=> {
                reject(err);
                cancel();
            }

            function throwConvertError(){
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
                pending = toArray(iterable, (value, i)=> {
                    return this.from(mapper? mapper(value, i) : value, signatures);
                }) || throwConvertError();

                return super.all(pending).then(resolve, _reject);
            }

            generator = toGenerator(iterable) || throwConvertError();

            pending= [];
            !ignoreResults && (results= []);

            const next= (value)=> {
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
                    }catch(err){
                        _reject(err);
                        return;
                    }

                    if (item.done){
                        endReached= true;
                        return;
                    }
                    next(mapper? mapper(item.value) : item.value);
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
     * - Number will be converted to `CPromise.delay`
     *
     * This method returns null if the conversion failed.
     * @param {*} thing
     * @param {boolean} [resolveSignatures= true]
     * @returns {CPromise}
     */

    static from(thing, resolveSignatures= true) {
        if (thing && thing instanceof this) {
            return thing;
        }

        if(resolveSignatures) {
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
     * inner weight accessor
     * @name CPromise#innerWeight
     * @function
     * @param {number} weight - the weight to set
     * @returns {CPromise}
     */

    /**
     * weight accessor
     * @name CPromise#weight
     * @function
     * @param {number} [weight]
     * @returns {number|CPromise}
     */

    /**
     * label accessor
     * @name CPromise#label
     * @function
     * @param {string} [label]
     * @returns {string|CPromise}
     */

    /**
     * timeout accessor
     * @name CPromise#timeout
     * @function
     * @param {number} [timeout]
     * @returns {number|CPromise}
     */

    /**
     * add a new event listener
     * @name CPromise#on
     * @function
     * @param {string|symbol} listener
     * @param {function} listener
     * @returns {CPromise}
     */

    /**
     * remove the event listener
     * @name CPromise#off
     * @function
     * @param {string|symbol} listener
     * @param {function} listener
     * @returns {CPromise}
     */

    /**
     * add a new event listener that will be fired only once
     * @name CPromise#once
     * @function
     * @param {string|symbol} listener
     * @param {function} listener
     * @returns {CPromise}
     */

    /**
     * @name CPromise.CanceledError
     * @constructor
     * @param {string} reason
     */

    /**
     * @name CPromise.AbortController
     * @constructor
     */
}

const {prototype} = CPromise;

['on', 'off', 'once'].forEach(methodName => {
    const scopeMethod = CPromiseScope.prototype[methodName];

    prototype[methodName] = function () {
        try {
            scopeMethod.apply(this[_scope], arguments);
        }catch(err){
            this[_scope].reject(err);
        }
        return this;
    }
});

['captureProgress'].forEach(method=>{
  const fn= prototype[method];
  prototype[method]= function(){
      try{
          fn.apply(this, arguments);
      }catch(err){
          this[_scope].reject(err);
      }
      return this;
  }
});

['weight', 'label', 'timeout', 'innerWeight'].forEach(methodName => {
    const scopeMethod = CPromiseScope.prototype[methodName];
    prototype[methodName] = function () {
        if (arguments.length) {
            try {
                scopeMethod.apply(this[_scope], arguments);
            }catch(err){
                this[_scope].reject(err);
            }
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





