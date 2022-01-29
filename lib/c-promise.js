/**
 * Cancellable Promise with extra features
 * @module CPromise
 */

/**
 * @typedef {String|Symbol} EventType
 */
const {CanceledError} = require('./canceled-error');
const {E_REASON_CANCELED, E_REASON_TIMEOUT, E_REASON_DISPOSED, E_REASON_UNMOUNTED} = CanceledError;
const {AbortController, AbortControllerEx, isAbortSignal, isAbortController} = require('./abort-controller');
const {validateOptions, validators} = require('./validator');
const {
    isThenable,
    EmptyObject,
    setImmediate,
    isGeneratorFunction,
    isGenerator,
    toGenerator,
    toArray,
    getFnType,
    lazyBindMethods,
    isContextDefined,
    getTag,
    throttle
} = require('./utils');
const {classDecorator, propertyDecorator, bindDecorators}= require('./decorators');
const {versionNumber, _versionNumber, _version, version, warnVersionInteraction}= require('./env');

const {
    union,
    array,
    functionPlain,
    numberFinitePositive,
    number,
    boolean,
    string,
    symbol,
    object,
    rest,
    nullable
}= validators;

const {now} = Date;
const {isArray} = Array;

const _toCPromise = Symbol.for('toCPromise');
const _isCPromise = Symbol.for('isCPromise');

const _shadow = Symbol('shadow');
const _events = Symbol('events');
const _resolve = Symbol('done');
const _setInnerChain = Symbol('setInnerChain');
const _promisified = Symbol('promisified');
const _render = Symbol('render');
const {toStringTag}= Symbol;

const TYPE_PROGRESS = Symbol('TYPE_PROGRESS');
const TYPE_PAUSE = Symbol('TYPE_PAUSE');
const TYPE_RESUME = Symbol('TYPE_RESUME');
const SIGNAL_CANCEL = Symbol('SIGNAL_CANCEL');
const SIGNAL_PAUSE = Symbol('SIGNAL_PAUSE');
const SIGNAL_RESUME = Symbol('SIGNAL_RESUME');

const ATOMIC_TYPE_DISABLED = 0;
const ATOMIC_TYPE_DETACHED = 1;
const ATOMIC_TYPE_AWAIT = 2;

const noop = () => {
};

const atomicMap= new Map([
  ['disabled', ATOMIC_TYPE_DISABLED],
  ['detached', ATOMIC_TYPE_DETACHED],
  ['await', ATOMIC_TYPE_AWAIT],
  [false, ATOMIC_TYPE_DISABLED],
  [true, ATOMIC_TYPE_AWAIT],
  [ATOMIC_TYPE_DISABLED, ATOMIC_TYPE_DISABLED],
  [ATOMIC_TYPE_DETACHED, ATOMIC_TYPE_DETACHED],
  [ATOMIC_TYPE_AWAIT, ATOMIC_TYPE_AWAIT],
]);

const controllersStore = new WeakMap();

const computeWeightSum = promises => {
    let i = promises.length;
    let sum = 0;
    while (i-- > 0) {
        sum += promises[i][_shadow].weight;
    }
    return sum;
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
 * @property {Boolean} [nativeController= false] prefer native AbortController class as the internal signal
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

const CPromise= class CPromise extends Promise {
    /**
     * Creates a new CPromise instance
     * @param {CPromiseExecutorFn} [executor] - promise executor function that will be invoked
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

        let {label, weight, timeout, signal, nativeController = false} = options || {};

        let resolve, reject;

        super((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        });

        this[_events] = new EmptyObject();

        const shadow = this[_shadow] = {
            resolve,
            reject,
            leafsCount: 0,
            paused: false,
            timestamp: -1,
            innerChain: null,
            parent: null,
            progress: 0,
            computedProgress: -1,
            totalWeight: -1,
            innerWeight: 1,
            throttle: 0,
            throttleTimer: 0,
            isCaptured: false,
            isListening: false,
            isPending: true,
            isCanceled: false,
            isRejected: false,
            isChain: true,
            label: '',
            weight: 1,
            value: undefined,
            nativeController,
            atomic: ATOMIC_TYPE_DISABLED,
            canceledWith: null
        };

        signal !== undefined && this.listen(signal);

        timeout !== undefined && this.timeout(timeout);

        weight !== undefined && this.weight(weight);

        label !== undefined && this.label(label);

        this.on('propagate', (type, scope, data) => {
            if (type === TYPE_PROGRESS) {
                shadow.computedProgress = -1;
                shadow.isListening && this.emit('progress', this.progress(), scope, data);
            } else if (type === TYPE_PAUSE) {
                this.emit('pause', data, scope);
            } else if (type === TYPE_RESUME) {
                this.emit('resume', data, scope);
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

        if (executor != null) {
            if (typeof executor !== 'function') {
                throw TypeError('CPromise executor is not a function');
            }

            try {
                executor.call(this, value => {
                    this.resolve(value)
                }, err => {
                    this.reject(err)
                }, this);
            } catch (err) {
                this.reject(err);
            }
        }
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
     * @typedef {Function} OnCaptureListener
     * @param {scope} CPromise
     */

    /**
     * registers the listener for cancel event
     * @param {OnCancelListener} listener
     * @returns {CPromise}
     */

    onCancel(listener) {
    }

    /**
     * registers the listener for pause event
     * @param {OnPauseListener} listener
     * @returns {CPromise}
     */

    onPause(listener) {
    }

    /**
     * registers the listener for resume event
     * @param {OnResumeListener} listener
     * @returns {CPromise}
     */

    onResume(listener) {
    }

    /**
     * registers the listener for capture event
     * @param {OnCaptureListener} listener
     * @returns {CPromise}
     */

    onCapture(listener) {
    }

    /**
     * @typedef {function} CPDoneListener
     * @param {*} value
     * @param {boolean} isRejected
     * @returns {CPromise}
     */

    /**
     * registers the listener for done event
     * @param {CPDoneListener} listener
     */

    onDone(listener) {
    }

    /**
     * @typedef {function} CPSignalListener
     * @param {Signal} type
     * @param {*} data
     * @returns {Boolean}
     */

    /**
     * registers the listener for done event
     * @param {CPSignalListener} listener
     */

    onSignal(listener){
    }

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

            if (weight < 0) {
                throw Error('inner weight cannot be less than 0');
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
     * @param {Number} [value] a number between [0, 1]
     * @param {*} [data] any data to send for progress event listeners
     * @param {CPromise} [scope] CPromise scope
     * @returns {Number|CPromise}
     */

    progress(value, data, scope) {
        const shadow = this[_shadow];

        if (arguments.length) {

            if (!shadow.isPending) return this;

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

                if(value !== 1 && shadow.throttler){
                    shadow.throttler([data, scope]);
                } else {
                    this.propagate(TYPE_PROGRESS, data, scope);
                }
            }

            return this;
        }

        if (shadow.computedProgress === -1) {
            shadow.totalWeight === -1 && this.captureProgress();

            const scopes = this.scopes(true);
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
     * @param {*?} data - some data
     * @param {CPromise} [scope] - CPromise scope
     * @returns {CPromise}
     */

    propagate(type, data = null, scope= null) {
        return this.emit('propagate', type, scope || this, data);
    }

    /**
     * capture initial progress state of the chain
     * @param {Object} [options]
     * @param {Number} options.throttle set min interval for firing progress event
     * @param {Number} options.innerWeight set weight of the nested promises
     * @returns {CPromise}
     */

    captureProgress(options) {
        const shadow = this[_shadow];

        if (options) {
            validateOptions(options, {
                throttle: numberFinitePositive,
                innerWeight: numberFinitePositive
            })
        }

        const {throttle: ms = 200, innerWeight} = options || {};

        shadow.throttler && shadow.throttler.cancel();

        shadow.throttler = ms ? throttle((data, scope) => {
            this.propagate(TYPE_PROGRESS, data, scope);
        }, ms) : null;

        if (innerWeight !== undefined) {
            this.innerWeight(innerWeight);
        }

        const scopes = this.scopes(true);
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

        if (shadow.totalWeight === -1) {
            shadow.totalWeight = sum;
        }

        return this;
    }

    /**
     * Returns all parent scopes that are in pending state
     * @param {boolean} [pendingOnly= false]
     * @returns {CPromise[]}
     */

    scopes(pendingOnly) {
        let scope = this;
        const scopes = [scope];
        while ((scope = scope[_shadow].parent) && (!pendingOnly || scope[_shadow].isPending)) {
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
                shadow.timer = setTimeout(() => {
                    this.cancel(E_REASON_TIMEOUT);
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
        const shadow = this[_shadow];
        if (this[_shadow].controller) return this[_shadow].controller.signal;

        return (this[_shadow].controller = new (shadow.nativeController ? AbortController : AbortControllerEx)()).signal;
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
     * indicates if the promise chain is paused
     * @returns {Boolean}
     */

    get isPaused() {
        return this.scopes(true).some(scope=> scope[_shadow].paused)
    }

    /**
     * indicates if the promise is rejected
     * @returns {Boolean}
     */

    get isRejected(){
        return this[_shadow].isRejected;
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

    [_setInnerChain](chain, captureProgress= true){
        const shadow= this[_shadow];

        shadow.innerChain = chain;

        chain.on('propagate', (type, scope, data) => {
            if (type === TYPE_PROGRESS) {
                if (!captureProgress || !shadow.isCaptured) return;
                const progress = chain.progress();
                this.progress(progress, data);
                return;
            }

            this.emit('propagate', type, scope, data);
        });

        if (captureProgress) {
            shadow.isCaptured && chain.captureProgress();
            shadow.innerWeight = chain[_shadow].totalWeight;
        }
    }

    [_resolve](value, isRejected) {
        const shadow = this[_shadow];
        if (!shadow.isPending) return this;

        const complete = (value, isRejected) => {
            shadow.timer && clearTimeout(shadow.timer);

            const resolve = () => {
                shadow.isRejected= isRejected;
                shadow.value = value;
                if (isRejected) {
                    shadow.isCanceled && !shadow.leafsCount && super.then(null, noop);
                    this.emit('done', value, isRejected);
                    shadow.reject(value);
                } else {
                    shadow.isCaptured && this.progress(1);
                    this.emit('done', value, isRejected);
                    shadow.resolve(value);
                }
                shadow.isPending = false;
                shadow.innerChain = null;
                shadow.parent && shadow.parent[_shadow].leafsCount--;
                shadow.parent = null;
                this[_events] = null;
            }

            if (isRejected && value && CanceledError.isCanceledError(value)) {
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

        if(!isRejected && shadow.canceledWith){
            complete(shadow.canceledWith, true);
        }

        if (!isThenable(value)) {
            complete(value, isRejected);
            return;
        }

        if (this.constructor.isCPromise(value)) {
            this[_setInnerChain](value);
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
     * @param {*} data
     * @returns {Boolean}
     */

    pause(data) {
        return this.emitSignal(SIGNAL_PAUSE, null, function () {
            const shadow = this[_shadow];

            if (!shadow.paused) {
                shadow.paused = true;
                if (shadow.timer) {
                    clearTimeout(shadow.timer);
                    shadow.timer = null;
                    shadow.timestamp !== -1 && (shadow.timeLeft = now() - shadow.timestamp);
                }

                this.propagate(TYPE_PAUSE, data);
            }
            return true;
        });
    }

    /**
     * Resume promise
     * @param {*} data
     * @returns {Boolean}
     */

    resume(data) {
        return this.emitSignal(SIGNAL_RESUME, null, function () {
            const shadow = this[_shadow];

            if (shadow.paused) {
                shadow.paused = false;
                if (shadow.timeLeft) {
                    this.timeout(shadow.timeLeft);
                    shadow.timeLeft = 0;
                }

                this.propagate(TYPE_RESUME, data);
            }
            return true;
        });
    }

    /**
     * @typedef {number|boolean|"disabled"|"detached"|"await"} AtomicType
     */

    /**
     * Make promise chain atomic (non-cancellable for external signals)
     * @param {AtomicType} [type]
     * @returns CPromise
     */

    atomic(type = ATOMIC_TYPE_AWAIT) {
        const _type = atomicMap.get(type);

        if (_type === undefined) {
            throw Error(`Unknown atomic type '${type}'`);
        }

        this[_shadow].atomic = _type;

        return this;
    }

    /**
     * throws the CanceledError that cause promise chain cancellation
     * @param {String|Error} [reason]
     * @param {Boolean} [forced= false]
     */

    cancel(reason, forced = false) {
        let ignoreCancelError= false;
        const err= CanceledError.from(reason);

        return this.emitSignal(SIGNAL_CANCEL, {err, force: forced || err.forced}, function ({err}) {
            !ignoreCancelError && !this[_shadow].canceledWith && this.reject(err);
            return true;
        }, ({err, force}, type, scope, isRoot) => {

            const shadow = scope[_shadow];
            const {atomic, parent} = shadow;

            if (parent) {
                const {isCanceled, value} = parent[_shadow];
                if (isCanceled && err.priority <= value.priority) {
                    ignoreCancelError = true;
                    return false;
                }
            }

            if (atomic === ATOMIC_TYPE_DETACHED) {
                return false;
            }

            if(atomic === ATOMIC_TYPE_AWAIT){
                shadow.canceledWith= err;
                return true;
            }

            if (!isRoot && !force && scope[_shadow].leafsCount > 1) {
                return false;
            }
        });
    }

    /**
     * @typedef {String|Symbol} Signal
     */

    /**
     * @typedef {Function} SignalHandler
     * @param {*} data
     * @param {Signal} type
     * @param {CPromise} scope
     * @this {CPromise}
     * @returns {Boolean}
     */

    /**
     * @typedef {Function} SignalLocator
     * @param {*} data
     * @param {Signal} type
     * @param {CPromise} scope
     * @param {Boolean} isRoot
     * @this {CPromise}
     * @returns {Boolean}
     */

    /**
     * Emit a signal of the specific type
     * @param {Signal} type
     * @param {*} [data]
     * @param {SignalHandler} [handler]
     * @param {SignalLocator} [locator]
     * @returns {Boolean}
     */

    emitSignal(type, data, handler, locator) {
        const emit = (scope, isRoot) => {
            const shadow = scope[_shadow];
            if (!shadow.isPending) return false;

            const locatorResult = locator ? locator.call(scope, data, type, scope, isRoot) : undefined;

            if (locatorResult === false) {
                return false;
            }

            if (locatorResult !== true) {
                let {parent, innerChain} = shadow;

                if (parent && emit(parent, false)) {
                    return true;
                }

                if (innerChain && emit(innerChain, false)) {
                    return true;
                }
            }

            return !!(scope.emitHook('signal', type, data) || handler && handler.call(scope, data, type, scope));
        }

        return emit(this, true);
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
     * Aggregate promise chain into one promise
     * @param {number} [weight=1]
     * @returns {CPromise}
     */

    aggregate(weight= 1){
        const promise= new this.constructor(resolve => resolve(this));
        return weight !== 1 ? promise.weight(weight) : promise;
    }

    /**
     * returns a CPromise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.
     * @param {onFulfilled} onFulfilled
     * @param {onRejected} [onRejected]
     * @returns {CPromise}
     */

    then(onFulfilled, onRejected) {

        if (onFulfilled != null && typeof onFulfilled !== 'function') {
            throw TypeError('onFulfilled is not a function');
        }

        if (onRejected != null && typeof onRejected !== 'function') {
            throw TypeError('onRejected is not a function');
        }

        const resolve = (value, isRejected) => {
            const shadow = promise[_shadow];
            const canceled = shadow.isCanceled;

            if (canceled) {
                isRejected = true;
                value = shadow.value;
            } else {
                if (isRejected && CanceledError.isCanceledError(value)) {
                    shadow.isCanceled = true;
                }
            }

            const cb = isRejected ? onRejected || ((err) => {
                if (!canceled) {
                    throw err;
                }
            }) : onFulfilled;

            return isGeneratorFunction(cb) ?
                this.constructor.run(cb, {
                    resolveSignatures: true,
                    args: [value]
                }) : cb.call(promise, value, promise)
        }

        const promise = super.then(onFulfilled ? resolve : value => {
            if (this[_shadow].isCanceled) {
                promise[_shadow].isCanceled = true;
            }
            return value;
        }, (err) => resolve(err, true));

        promise[_shadow].parent = this;

        this[_shadow].leafsCount++;

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
                    return onRejected.call(scope, err, scope);
                }
                throw err;
            });
        }

        return super.catch(onRejected);
    }

    /**
     * @typedef {function} CPFinallyHandler
     * @param {*} settledValue
     * @param {boolean} isRejected
     * @param {CPromise} scope
     * @this CPromise
     */

    /**
     * Add handler that will be invoked when promise settled
     * @param {CPFinallyHandler} onFinally
     * @returns {Promise<T | void>}
     */

    finally (onFinally) {
        return this.then(
          (value, scope) => this.resolve(onFinally.call(scope, value, false, scope))
            .then(() => value),
          (reason, scope) => this.resolve(onFinally.call(scope, reason, true, scope))
            .then(() => this.reject(reason))
        );
    }

    /**
     * @typedef {function} CPDoneHandler
     * @param {*} settledValue
     * @param {boolean} isRejected
     * @param {CPromise} scope
     * @this CPromise
     */

    /**
     * Add a handler that will be called after the promise has been fulfilled, but unlike `finally`,
     * the returned plain value will not be ignored
     * @param {CPDoneHandler} doneHandler
     * @returns {CPromise}
     */

    done(doneHandler) {
        return this.then((value, scope) => doneHandler.call(scope, value, false, scope),
          (err, scope) => doneHandler.call(scope, err, true, scope))
    }

    /**
     * Catches CancelError rejection
     * @param {Function} [onCanceled]
     * @returns {CPromise}
     */

    canceled(onCanceled) {
        return this.catch((err, scope) => {
            if (CanceledError.isCanceledError(err)) {
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
        return CanceledError.isCanceledError(thing);
    }

    /**
     * Returns a CPromise that will be resolved after specified timeout
     * @param {Number} ms - delay before resolve the promise with specified value
     * @param value
     * @param {object} [options]
     * @param {number} [options.progressTick= 1000] progress timer tick, must be >= 100ms
     * @returns {CPromise}
     */

    static delay(ms, value, options) {
        return new this((resolve, reject, scope) => {
            if (!Number.isFinite(ms)) {
                throw TypeError('delay must be a finite number');
            }

            let timer = setTimeout(() => {
                timer= 0;
                resolve(value)
            }, ms);

            scope[_render]= ()=> `${getTag(scope.constructor)}.delay(${ms})`;

            scope.onDone(() => timer && clearTimeout(timer));

            const {progressTick= 1000}= options!==undefined ? validateOptions(options, {
                progressTick: numberFinitePositive
            }) : {};

            if (progressTick) {
                if (progressTick < 100) {
                    throw Error('progressTick must be grater than 100ms to avoid performance impact');
                }

                const captureProgress= ()=>{
                    if (ms > progressTick * 1.5) {
                        let timestamp = Date.now();
                        const progressTimer = setInterval(() => {
                            scope.progress((Date.now() - timestamp) / ms);
                        }, progressTick);

                        scope.onDone(() => clearTimeout(progressTimer));
                    }
                }

                if(scope.isCaptured){
                    captureProgress();
                }else{
                    scope.onCapture(captureProgress);
                }
            }
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
        const signalListener = (type, event, reason) => {
            this.cancel(reason);
        }
        signal.addEventListener('abort', signalListener);
        this.on('done', () => {
            signal.removeEventListener('abort', signalListener);
        })

        return this;
    }

    /**
     * @typedef {object} CPAllOptions
     * @property {number} [concurrency] limit concurrency of promise being run simultaneously
     * @property {function} [mapper] function to map each element
     * @property {boolean} [ignoreResults] do not collect results
     * @property {boolean} [signatures] use advanced signatures for vales resolving
     */

    /**
     * Returns a single CPromise that resolves to an array of the results of the input promises.
     * If one fails then other promises will be canceled immediately
     * @param {Iterable|Generator|GeneratorFunction|array} iterable
     * @param {CPAllOptions} [options]
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
                    concurrency: numberFinitePositive,
                    ignoreResults: boolean,
                    signatures: boolean,
                    mapper: validators.function,
                    args: array()
                })
            }

            let {
                concurrency = 0,
                ignoreResults,
                signatures,
                mapper,
                args= null
            } = options || {}

            const cancel = (reason) => {
                const {length} = pending;
                let result= false;
                for (let i = 0; i < length; i++) {
                    if(pending[i].cancel(reason)){
                        result= true;
                    }
                }
                return result;
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

            scope.onSignal((type, data) => {
                const {length} = pending;
                let result = false;
                if (type === SIGNAL_CANCEL) {
                    return cancel(data.err, data.force);
                }

                for (let i = 0; i < length; i++) {
                    if (pending[i].emitSignal(type, data)) {
                        result = true;
                    }
                }

                return result;
            });

            const handleProgress = (value, _scope, data) => {
                let total = scope.innerWeight();
                if (!total) return;
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
                !scope.innerWeight() && scope.innerWeight(computeWeightSum(pending));
            });

            if (!concurrency) {
                pending = toArray(iterable, (value, i) => {
                    return this.resolve(mapper ? mapper(value, i) : value, signatures);
                }) || throwConvertError();

                scope[_render]= ()=> `${getTag(scope.constructor)}.all[${pending.length}]`;

                return super.all(pending).then(resolve, _reject);
            }

            if (isArray(iterable)) {
                scope[_render]= ()=> `${getTag(scope.constructor)}.all[${iterable.length}]`;
                scope.innerWeight(iterable.length || 1);
            }

            generator = toGenerator(iterable, args, scope) || throwConvertError();

            pending = [];
            !ignoreResults && (results = []);

            const next = (value) => {
                const promise = this.resolve(value, signatures);

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
     * @param {Iterable} pending
     * @returns {CPromise}
     */

    static race(pending) {
        return new this((resolve, reject, scope) => {
            pending = toArray(pending);

            const {length} = pending;

            scope[_render]= () => `${getTag(scope.constructor)}.race[${length}]`;

            for (let i = 0; i < length; i++) {
                pending[i] = this.resolve(pending[i]);
            }

            const cancel = (reason) => {
                let result= false;
                for (let i = 0; i < length; i++) {
                    if(pending[i].cancel(reason)){
                        result= true;
                    }
                }
                return result;
            }

            scope.onCapture(() => {
                let max = 0;
                for (let i = 0; i < length; i++) {
                    pending[i].progress((value, scope, data) => {
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
                    pending[i].pause();
                }
            })

            scope.onResume(() => {
                for (let i = 0; i < length; i++) {
                    pending[i].resume();
                }
            })

            scope.onSignal((type, data) => {
                if (type === SIGNAL_CANCEL) {
                    return cancel(data.err, data.force);
                }

                let result = false;
                for (let i = 0; i < length; i++) {
                    if (pending[i].emitSignal(type, data)) {
                        result = true;
                    }
                }
                return result;
            });

            super.race(pending).then((value) => {
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
     * @param {CPAllOptions} [options]
     * @returns {CPromise}
     */

    static allSettled(iterable, options) {
        const {mapper, ...allOptions} = options || {};

        const promise= this.all(iterable, {
            ...allOptions,
            mapper: (value, i) => {
                return this.resolve(mapper ? mapper(value, i) : value).then(
                    value => ({status: "fulfilled", value}),
                    err => {
                        if(CanceledError.isCanceledError(err)) {
                            throw err;
                        }
                        return {status: "rejected", reason: err};
                    }
                )
            }
        })

        promise[_render] = ()=> `${getTag(scope.constructor)}.allSettled`;

        return promise;
    }

    /**
     * @typedef {function} CPRetryFunction
     * @param {number} attempt
     * @param {array} args
     * @returns {*}
     */

    /**
     * @typedef {GeneratorFunction} CPGeneratorRetryFunction
     * @param {CPromise} scope
     * @param {number} attempt
     * @param {array} args
     * @returns {*}
     */

    /**
     * @typedef {function} CPRetryDelayResolver
     * @param {number} attempt
     * @param {number} retries
     * @returns {number} a delay in ms before next attempt
     */

    /**
     * Retry async operation
     * @param {CPGeneratorRetryFunction|CPRetryFunction} fn
     * @param {Object} [options]
     * @param {Array} [options.args]
     * @param {Number} [options.retries]
     * @param {Number} [options.delayWeight]
     * @param {Number|CPRetryDelayResolver} [options.delay]
     * @param {Boolean} [options.scopeArg= false]
     * @return {CPromise}
     */
    static retry(fn, options) {
        if (typeof fn !== 'function') {
            throw TypeError('fn must be a function');
        }

        options !== undefined && validateOptions(options, {
            args: array(),
            retries: numberFinitePositive,
            delayWeight: numberFinitePositive,
            delay: union(numberFinitePositive, functionPlain),
            scopeArg: boolean
        });

        const {
            args = [],
            retries = 3,
            delayWeight= 0.1,
            delay = (attempt) => attempt * 1000,
            scopeArg= false
        } = typeof options === 'number' ? {retries: options} : options || {};

        let attemptIndex = 0;

        return new this((resolve, reject, scope) => {
            const shadow= scope[_shadow];

            const attempt = () => {
                const fnArgs = [attemptIndex, args];

                const doAttempt = () => {
                    return isGeneratorFunction(fn) ?
                      this.run(fn, {args: fnArgs, scopeArg}) : new this((resolve, reject, _scope) => {
                          resolve(fn.apply(_scope, scopeArg ? [_scope, attemptIndex, args] : fnArgs));
                      })
                }

                let _delay = delay;

                if (attemptIndex && typeof delay === 'function') {
                    _delay = delay(attemptIndex, retries);
                    if (!numberFinitePositive(_delay)) {
                        throw TypeError(`delay fn must return a finite number`);
                    }
                }

                scope[_render]= ()=> `${getTag(scope.constructor)}.try[${attemptIndex}/${retries}]`;

                scope.progress(0);

                const promise= (attemptIndex && _delay ? this.delay(_delay).weight(delayWeight).then(doAttempt) : doAttempt())
                  .weight(0.9)
                  .then(resolve, err => {
                      if (!CanceledError.isCanceledError(err, E_REASON_CANCELED, E_REASON_DISPOSED, E_REASON_UNMOUNTED)) {
                          if (++attemptIndex < retries || !retries) {
                              setImmediate(attempt);
                              return;
                          }
                      }
                      reject(err);
                  }).weight(0);

                if(shadow.innerChain){
                    shadow.innerChain[_events]= null;
                }

                scope[_setInnerChain](promise);

                return promise;
            }

            attempt();
        });
    }

    /**
     * @typedef {Object} resolveOptionsObject
     * @property {Boolean} [resolveSignatures= true]
     * @property {AtomicType} [atomic= true]
     * @property {*} [args]
     */

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
     * @param {*} [thing]
     * @param {resolveOptionsObject|Boolean} [options]
     * @returns {CPromise}
     */

    static resolve(thing, options) {
        if (!thing) {
            return super.resolve(thing);
        }

        if (thing instanceof this) {
            return thing;
        }

        const {resolveSignatures = true, atomic= true} =
        (typeof options === 'boolean' ? {resolveSignatures: options} : options) || {};

        const type = typeof thing;

        if (type === 'object') {
            if (resolveSignatures && isArray(thing)) {
                if (thing.length === 1) {
                    const first = thing[0];
                    if (isArray(first)) {
                        return this.race(first.map(thing => this.resolve(thing, options)));
                    }
                }
                return this.all(thing.map(thing => this.resolve(thing, options)))
            }

            const convertMethod = thing[_toCPromise];

            if (typeof convertMethod === 'function') {
                const returnedValue = convertMethod.call(thing, this);

                if (!this.isCPromise(returnedValue)) {
                    this.reject(new Error(`method '${_toCPromise}()' must return a CPromise instance`));
                }

                return returnedValue;
            }

            if (typeof thing.then === 'function') {
                const hasCanceler = typeof thing.cancel === 'function';
                const promise = new this((resolve, reject, {onCancel}) => {
                    if (hasCanceler) {
                        onCancel(reason => {
                            try {
                                thing.cancel(reason);
                            } catch (err) {
                                reject(err);
                            }
                        });
                    }
                    return thing.then(resolve, reject);
                })

                return hasCanceler ? promise : promise.atomic(atomic);
            }
        } else if (resolveSignatures && isGeneratorFunction(thing)) {
            return this.run(thing)
        }

        return super.resolve(thing);
    }

    /**
     * @typedef {Function} PromisifyFinalizeFn
     * @param {*} result
     * @param {CPromise} scope
     */

    /**
     * @typedef {function} CPPromisifyDecoratorFn
     * @param {function} originalFn function to decorate
     * @param {PromisifyOptions} options
     * @returns {function}
     */


    /**
     * @typedef {Object} PromisifyOptions
     * @property {Boolean} [multiArgs] aggregate all passed arguments to an array
     * @property {PromisifyFinalizeFn} [finalize] aggregate all passed arguments to an array
     * @property {"plain"|"generator"|"async"} [fnType]
     * @property {boolean} [scopeArg] pass the CPromise scope as the first argument to the generator function
     * @property {function} [decorator] CPPromisifyDecoratorFn
     * @property {boolean} [alignArgs] align passed arguments to function definition for callback-styled function
     * @property {boolean} [once= true] don't promisify already promisified function
     * @property {array<'plain'|'async'|'generator'>} [types] function types to promisify
     */

    /**
     * Converts callback styled function|GeneratorFn|AsyncFn to CPromise async function
     * @param {Function|GeneratorFunction|AsyncFunction} originalFn
     * @param {PromisifyOptions|Function|Boolean} [options]
     * @returns {function(...[*]): CPromise}
     */

    static promisify(originalFn, options) {
        const type = typeof options;

        if (type === 'boolean') {
            options = {multiArgs: !!options}
        } else if (type === 'function') {
            options = {finalize: options};
        } else {
            options !== undefined && validateOptions(options, {
                multiArgs: boolean,
                finalize: functionPlain,
                fnType: string,
                scopeArg: boolean,
                decorator: functionPlain,
                alignArgs: boolean,
                once: boolean,
                types: array(validators.values('plain', 'async', 'generator'))
            });
        }

        const {
            multiArgs,
            finalize,
            fnType= getFnType(originalFn),
            scopeArg,
            decorator,
            alignArgs= true,
            once= true,
            types
        } = options || {};

        const context = this;

        if(once && originalFn[_promisified]){
            return originalFn;
        }

        if (types && types.indexOf(fnType) === -1) return originalFn;

        const decoratedFn = decorator && decorator.call(context, originalFn, {
            ...options,
            fnType
        }) || originalFn;

        const fn= (()=> {
            switch (fnType) {
                case "plain":
                    return function (...args) {
                        return new context((resolve, reject, scope) => {
                            const callback = (err, ...data) => {
                                if (err) {
                                    return reject(err);
                                }

                                return multiArgs || data.length > 1 ? resolve(data) : resolve(data[0]);
                            };

                            if (alignArgs) {
                                const min = originalFn.length - 1;
                                if (args.length < min) {
                                    args.length = min;
                                }
                            }

                            const result = decoratedFn.apply(
                              this,
                              scopeArg ? [scope, ...args, callback] : [...args, callback]
                            );

                            finalize && finalize(result, scope);

                            if (isThenable(result)) {
                                result.then(resolve, reject);
                            } else if (!decoratedFn.length) {
                                resolve(result);
                            }
                        })
                    }
                case "generator":
                    return function (...args) {
                        return context.run(decoratedFn, {
                            context: this,
                            scopeArg,
                            args
                        });
                    }
                case "async":
                    return function (...args) {
                        if (!scopeArg) {
                            return context.resolve(decoratedFn.apply(this, args));
                        }

                        return context.resolve().then((v, scope) => {
                            return context.resolve(decoratedFn.apply(this, [scope, ...args]));
                        })
                    }
            }
            throw TypeError('promisify requires a Function|GeneratorFunction|AsyncFunction as the first argument');
        })();

        fn[_promisified]= fnType;

        return fn;
    }

    /**
     * Resolves the generator to an CPromise instance
     * @param {GeneratorFunction} generatorFn
     * @param {Object} [options]
     * @param {Array} [options.args]
     * @param {Boolean} [options.resolveSignatures] resolve extra signatures (like arrays with CPromise.all)
     * @param {Boolean} [options.scopeArg] pass the CPromise scope as the first argument to the generator function
     * @param {*} [options.context]
     * @returns {CPromise}
     */

    static run(generatorFn, {args, resolveSignatures, context, scopeArg= false} = {}) {
        return new this((resolve, reject, scope) => {
            let generator;

            const name= generatorFn && generatorFn.name;

            scope[_render] = ()=> `${getTag(scope.constructor)}.run${name ? '(' + name + '*)' : ''}`;

            if (!context) {
                context = scope;
            }

            if(!scopeArg){
                generator = generatorFn.apply(context, args);
            }else{
                switch (args ? args.length : 0) {
                    case 0:
                        generator = generatorFn.call(context, scope);
                        break;
                    case 1:
                        generator = generatorFn.call(context, scope, args[0]);
                        break;
                    case 2:
                        generator = generatorFn.call(context, scope, args[0], args[1]);
                        break;
                    default:
                        generator = generatorFn.apply(context, [scope, ...args]);
                }
            }

            if (!isGenerator(generator)) {
                return reject(new TypeError('function must a generator'));
            }

            let progress = 0;
            let sum = 0;
            let weight = 0;
            let promise;

            const setProgress = (value, _scope, data) => {
                const innerWeight = scope.innerWeight();
                if (!innerWeight) return;
                progress = (value * weight + sum) / innerWeight;
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

            const captureProgress= ()=>{
                if(promise.isCaptured) return;
                promise.progress((value, scope, data) => {
                    setProgress(value, scope, data);
                });
            }

            !scope.isCaptured && scope.onCapture(()=>{
                promise && captureProgress();
            })

            const next = (r) => {
                if (r.done) {
                    return resolve(r.value);
                }

                promise = this.resolve(r.value, {resolveSignatures});

                scope[_setInnerChain](promise, false);

                sum += weight;
                weight = promise.isChain ? 1 : promise.weight();

                scope.isCaptured && captureProgress(promise);

                return promise.then(onFulfilled, onRejected);
            }

            onFulfilled();
        })
    }

    /**
     * Decorator to make CPromise async function from generator, ECMA async or callback-styled method
     * @param {object} [options]
     * @param {number} [options.timeout]
     * @param {string} [options.label]
     * @param {number} [options.innerWeight]
     * @param {number} [options.weight]
     * @param {AbortControllerId|AbortController|AbortSignal|Array<AbortControllerId|AbortController|AbortSignal>} [options.listen]
     * @param {AtomicType} [options.atomic]
     */
    static async(options){}

    /**
     * @typedef {string|symbol} AbortControllerId
     */

    /**
     * Decorator to subscribe CPromise async method to the internal or external controller
     * @param {AbortControllerId|AbortController|AbortSignal|Array<AbortControllerId|AbortController|AbortSignal>} [signals]
     */
    static listen(signals){}

    /**
     * Decorator to cancel internal or external abort controller before the decorated function invocation.
     * Can be used as a plain function by passing a object context with `.call` or `.apply` methods
     * @param {string} [reason]
     * @param {AbortControllerId|AbortController} signal
     * @example
     * el.onclick= ()=> cancel.call(this, reason, 'myControllerId'); - to use the decorator as a plain function
     */
    static cancel(reason, signal){}

    /**
     * Decorator to add an `onCanceled` rejection handler to the resulting promise of the decorated method
     * @param {function|GeneratorFunction} onCanceledChain
     */
    static canceled(onCanceledChain){}

    /**
     * @typedef {function} ProgressDecoratorHandler
     * @param {number} progress
     * @param {CPromise} scope
     * @param {*} data
     * @param {object} context
     */

    /**
     * Decorator to subscribe the handler to the `onProgress` event of the resulting promise
     * @param {ProgressDecoratorHandler} onProgressHandler
     */
    static progress(onProgressHandler){}

    /**
     * @typedef {object} ReactComponentDecoratorOptions
     * @property {boolean} [subscribeAll= false]
     * @property {boolean} [bindListeners= true]
     * @property {boolean} [bindMethods= true]
     */

    /**
     * Decorate class as React component
     * @param {boolean|ReactComponentDecoratorOptions} options
     */
    static ReactComponent(options){}

    /**
     * Decorator to set timeout for the resulting promise of the decorated function
     * @param {number} ms
     */
    static timeout(ms){}

    /**
     * Decorator to set label for the resulting promise of the decorated function
     * @param {string} str
     */
    static label(str){}

    /**
     * Decorator to set innerWeight for the resulting promise of the decorated function
     * @param {number} weight
     */
    static innerWeight(weight){}

    /**
     * Decorator to set timeout for the resulting promise of the decorated function
     * @param {AtomicType} atomicType
     */
    static atomic(atomicType){}

    /**
     * @typedef {function} CPDecoratorDoneHandler
     * @param {*} value
     * @param {boolean} isRejected
     * @param {CPromise} scope
     * @param {object} context
     */

    /**
     *  append `done` chain to the resulting promise of the decorated method
     * @param {CPDecoratorDoneHandler} doneHandler
     */
    static done(doneHandler){}

    /**
     * Returns promisification strategy that was used to the original function
     * @param {function} fn
     * @returns {*|boolean}
     */

    static isPromisifiedFn(fn){
        return fn[_promisified] || false;
    }

    /**
     * CPromise version string
     * @returns {string}
     */

    static get version(){
        return this.prototype[_version];
    }

    /**
     * CPromise version number
     * @returns {number}
     */

    static get versionNumber(){
        return this.prototype[_versionNumber];
    }

    /**
     * Check whether object is CPromise instance
     * @param {*} thing
     * @param {boolean} [anyVersion= false]
     * @returns {boolean}
     */

    static isCPromise(thing, anyVersion){
        if(thing instanceof this) return true;
        if (this[_isCPromise]){
            warnVersionInteraction(thing);
            return !!anyVersion;
        }
        return false;
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

    static get [toStringTag](){
        return 'CPromise';
    }

    /**
     * Render promise to String
     * @param {boolean} [entireChain= false] render the entire promise chain
     * @returns {string}
     */

    toString(entireChain){
        if(!entireChain){
            return super.toString();
        }

        const renderStatus = (scope) => {
            if (scope.isPaused) return 'paused';
            const shadow = scope[_shadow];
            if (scope.isPending) return 'pending' +
              (shadow.computedProgress !== -1 ?
                `[${(shadow.computedProgress * 100).toFixed(1)}%]` : '');
            const value = shadow.value;
            return `${scope.isRejected ? 'rejected' : 'resolved'}${value === undefined ? '' : `<${value}>`}`;
        }

        const renderScope= (scope)=>{
            if (!(scope instanceof this.constructor)) {
                return scope.constructor.name;
            }
            const shadow= scope[_shadow];
            const render= scope[_render];
            const {innerChain, label}= shadow;

            const title= label || (render && render.call(scope)) || getTag(scope.constructor);
            return innerChain? `${title}(${renderScope(innerChain)})` : title;
        }

        return this.scopes()
          .reverse()
          .map(scope=> `${renderScope(scope)}<${renderStatus(scope)}>`)
          .join(' → ');
    }
}

const {prototype} = CPromise;

prototype.addEventListener = prototype.on;

prototype.removeEventListener = prototype.off;

lazyBindMethods(prototype, ['Cancel', 'Pause', 'Resume', 'Capture', 'Done', 'Signal'].map(type => {
    const typeL = type.toLowerCase();

    const methodName= 'on' + type;

    prototype[methodName]= function method(listener) {
        if (!this[_shadow].isPending) {
            throw Error(`Unable to subscribe to ${typeL} event since the promise has been already settled`);
        }
        return this.on(typeL, listener);
    }

    return methodName;
}));

lazyBindMethods(CPromise, Object.getOwnPropertyNames(CPromise).map(prop => {
    const {value} = Object.getOwnPropertyDescriptor(CPromise, prop);
    return typeof value === 'function' ? prop : '';
}).filter(Boolean));

Object.defineProperties(CPromise, Object.entries({
    CPromise,
    CanceledError,
    AbortController,
    AbortControllerEx,
    SIGNAL_CANCEL,
    SIGNAL_PAUSE,
    SIGNAL_RESUME,
    E_REASON_CANCELED,
    E_REASON_TIMEOUT,
    E_REASON_DISPOSED,
    E_REASON_UNMOUNTED
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

const getContextController = (context, id, create) => {
    if (typeof id === 'string' || typeof id === 'symbol') {
        let list = controllersStore.get(context);
        if (!list) {
            controllersStore.set(context, (list = {}));
        }

        const controller = list && list[id || ''];

        return controller || (create ? (list[id] = new AbortControllerEx(true)) : null);
    }

    return isAbortController(id) ? id : null;
}

const ensureContextSignal = (context, id, create) => {
    if(isAbortSignal(id)) return id;

    const controller=  getContextController(context, id, create);

    if(!controller){
        throw TypeError(`required AbortController|AbortSignal|string id|symbol id)`);
    }

    return controller.signal;
}

const listenSignals= (promise, context, signals)=>{
    isArray(signals) ?
      signals.forEach((id) => promise.listen(ensureContextSignal(context, id, true))) :
      promise.listen(ensureContextSignal(context, signals, true));
}

const cancelContext= (context, id, reason)=>{
    const controller= getContextController(context, id, false);
    if(controller) {
        controller && controller.abort(reason);
        return true
    }
    return false;
}

const inheritFnSignature= (target, fn)=> {
    target[_promisified]= fn[_promisified];
    return target;
}

const eventHandlerRE= /^on[A-Z]/;

const reactProtoMethods= {
    componentDidMount: true,
    shouldComponentUpdate: true,
    componentWillUnmount: true,
    getSnapshotBeforeUpdate: true,
    componentDidUpdate: true,
    componentDidCatch: true,
    componentWillReceiveProps: true
}

const decorators = {
    async: propertyDecorator((decorator, [options], {context}) => {

        if (typeof options === 'number') {
            options = {timeout: options}
        } else if (typeof options === 'string') {
            options = {label: options};
        }

        const {timeout, label, innerWeight, weight, listen, scopeArg= false, atomic} = options || {};
        const fn = context.promisify(decorator.descriptor.value, {scopeArg});

        decorator.descriptor = {
            value: inheritFnSignature(function () {
                const promise = fn.apply(this, arguments);
                timeout && promise.timeout(timeout);
                label && promise.label(label);
                innerWeight && promise.innerWeight(innerWeight);
                weight && promise.weight(weight);
                listen && listenSignals(promise, this, listen);
                atomic !== undefined && promise.atomic(atomic);
                return promise;
            }, fn),
            enumerable: true,
            configurable: true
        }

        return decorator;

    }, [union(validators.undefined, number, string, object({
        timeout: number,
        label: string,
        innerWeight: number,
        weight: number,
        listen: validators.union(string, symbol, array(string, symbol)),
        scopeArg: boolean,
        atomic: union(
          undefined,
          boolean,
          validators.values(
            ATOMIC_TYPE_DISABLED,
            ATOMIC_TYPE_DETACHED,
            ATOMIC_TYPE_AWAIT,
            'detached',
            'disabled',
            'await'
          )
        )
    }))]),

    listen: propertyDecorator((decorator, [signals = ''], {context}) => {
        const fn = context.promisify(decorator.descriptor.value);

        decorator.descriptor = {
            value: inheritFnSignature(function () {
                const promise = fn.apply(this, arguments);
                listenSignals(promise, this, signals);
                return promise;
            }, fn),
            enumerable: true,
            configurable: true
        }

        return decorator;
    }, [rest(validators.undefined, validators.abortController, validators.abortSignal, string, symbol)]),

    cancel: propertyDecorator((decorator, [reason, signal = '']) => {
        const fn = decorator.descriptor.value;

        decorator.descriptor.value = inheritFnSignature(function () {
            cancelContext(this, signal, reason || '');
            return fn.apply(this, arguments);
        }, fn);

        return decorator;
    }, [
        union(nullable, string),
        union(validators.undefined, validators.abortController, string, symbol)
    ], function (reason, signal= '') {
        return cancelContext(this, signal, reason || '');
    }),

    canceled: propertyDecorator((decorator, [canceledHandler], {context}) => {
        const fn = context.promisify(decorator.descriptor.value);
        const handler = canceledHandler && context.promisify(canceledHandler, {types: ['generator']});

        decorator.descriptor.value = inheritFnSignature(function () {
            return fn.apply(this, arguments)
              .canceled(handler? (err, scope) => handler.call(this, err, scope, this) : noop);
        }, fn);

        return decorator;
    }, [union(validators.nullable, validators.function)]),

    done: propertyDecorator((decorator, [doneHandler], {context}) => {
        const fn = context.promisify(decorator.descriptor.value);
        const handler = doneHandler && context.promisify(doneHandler, {types: ['generator']});

        decorator.descriptor.value = inheritFnSignature(function () {
            return fn.apply(this, arguments)
              .done(
                handler? (err, isRejected, scope) => handler.call(this, err, isRejected, scope, this) : noop
              );
        }, fn);

        return decorator;
    }, [union(validators.nullable, validators.function), union(validators.nullable, boolean, string)]),

    progress: propertyDecorator((decorator, [progressHandler], {context}) => {
        const fn = context.promisify(decorator.descriptor.value);

        decorator.descriptor.value = inheritFnSignature(function () {
            return fn.apply(this, arguments).progress(
              (value, scope, data) => progressHandler.call(this, value, scope, data, this)
            )
        }, fn);

        return decorator;
    }, [validators.function]),

    ReactComponent: classDecorator((descriptor, options, {context}) => {
        const {subscribeAll, bindMethods = true, bindListeners = true} =
        (options === false ? ({subscribeAll: false, bindMethods: false, bindListeners: false}) :
          options === true ? ({subscribeAll: true}) :
            options) || {};

        const descriptors= {};
        const bindAll= bindMethods && bindListeners;
        const bind= bindMethods || bindListeners;

        return {
            kind: 'class',
            finisher(constructor) {
                const {prototype} = constructor;

                const decorate= (prop, method)=>{
                    let originalMethod = method;
                    const isComponentWillUnmount = prop === 'componentWillUnmount';
                    const isComponentDidMount = prop === 'componentDidMount';

                    const decorateAsyncMethod = (method) => {
                        if (isComponentWillUnmount) {
                            return function () {
                                cancelContext(this, '', E_REASON_UNMOUNTED);
                                return method.apply(this, arguments);
                            }
                        } else if (subscribeAll || isComponentDidMount) {
                            return function () {
                                return method
                                  .apply(this, arguments)
                                  .listen(ensureContextSignal(this, '', true))
                            }
                        }
                        return method;
                    }

                    const bindLazily= (method)=>{
                        descriptors[prop] = {
                            get() {
                                const context= this;
                                return function lazilyBoundListener() {
                                    return method.apply(isContextDefined(this) ? this : context || this, arguments);
                                }
                            },
                            configurable: true
                        }
                    }

                    if (isGeneratorFunction(method)) {
                        method = decorateAsyncMethod(context.promisify(method, {
                            scopeArg: isComponentDidMount || isComponentWillUnmount
                        }));
                    }else if (context.isPromisifiedFn(method)) {
                        method= decorateAsyncMethod(method);
                    }

                    if (bind && !reactProtoMethods[prop] && (bindAll ||
                      (eventHandlerRE.test(prop) ? bindListeners : bindMethods))) {
                        bindLazily(method);
                        return;
                    }

                    if (method !== originalMethod) {
                        descriptors[prop] = {
                            value: method,
                            configurable: true
                        }
                    }
                };

                Object.getOwnPropertyNames(prototype).forEach(prop => {
                    if (prop === 'constructor' || prop === 'render') return;
                    const value= prototype[prop];
                    if (typeof value !== 'function') return;
                    decorate(prop, value);
                });

                if(!('componentWillUnmount' in prototype)){
                    descriptors.componentWillUnmount= {
                        value: function(){
                            cancelContext(this, '', E_REASON_UNMOUNTED);
                        },
                        configurable: true
                    };
                }

                Object.defineProperties(prototype, descriptors);

                return constructor;
            }
        }
    }, [union(validators.undefined, boolean, object({
        subscribeAll: boolean,
        bindMethods: boolean,
        bindListeners: boolean,
    }))])
};

Object.entries({
    'timeout': number,
    'label': string,
    'innerWeight': number,
    'atomic': [
        validators.undefined, boolean,
        validators.values(ATOMIC_TYPE_DISABLED, ATOMIC_TYPE_DETACHED, ATOMIC_TYPE_AWAIT, 'detached', 'disabled', 'await')
    ]
}).forEach(([name, type])=>{
    decorators[name]= propertyDecorator((decorator, [value], {context}) => {
        const fn = context.promisify(decorator.descriptor.value);
        const isFunction= typeof value==='function';

        decorator.descriptor.value = inheritFnSignature(function () {
            const promise= fn.apply(this, arguments);
            return promise[name](isFunction? value.call(this, this) : value);
        }, fn);

        return decorator;
    }, [isArray(type)? union(validators.function, ...type) : union(type, validators.function)]);
});

bindDecorators(CPromise, decorators);

Object.defineProperties(prototype, {
    [_isCPromise]: {value : true},
    [_version]: {value : version},
    [_versionNumber]: {value : versionNumber}
})

exports.CPromise = CPromise;
/**
 * CanceledError class
 * @type {CanceledError}
 */
exports.CanceledError = CanceledError;
/**
 * Refers to the AbortController class (native if available)
 * @type {AbortController|AbortControllerEx}
 */
exports.AbortController = AbortController;
/**
 * AbortControllerEx class
 * @type {AbortControllerEx}
 */
exports.AbortControllerEx = AbortControllerEx;
/**
 * Generic cancellation reason
 */
exports.E_REASON_CANCELED = E_REASON_CANCELED;
/**
 * Cancellation reason for the case when the instance will be disposed
 */
exports.E_REASON_DISPOSED = E_REASON_DISPOSED;
/**
 * Timeout cancellation reason
 */
exports.E_REASON_TIMEOUT = E_REASON_TIMEOUT;
/**
 * React specific canceled reason
 */
exports.E_REASON_UNMOUNTED = E_REASON_UNMOUNTED;
/**
 * async decorator
 * @type {Function}
 */
exports.async = CPromise.async;
/**
 * listen decorator
 * @type {Function}
 */
exports.listen = CPromise.listen;
/**
 * cancel decorator
 * @type {Function}
 */
exports.cancel = CPromise.cancel;
/**
 * cancel decorator
 * @type {Function}
 */
exports.ReactComponent = CPromise.ReactComponent;
/**
 * make CPromise function atomic
 * @type {Function}
 */
exports.atomic = CPromise.atomic;
/**
 * append `done` chain to the resulting promise of the decorated method
 * @type {Function}
 */
exports.done = CPromise.done;
/**
 * timeout decorator
 * @type {Function}
 */
exports.timeout = CPromise.timeout;
/**
 * innerWeight decorator
 * @type {Function}
 */
exports.innerWeight = CPromise.innerWeight;
/**
 * label decorator
 * @type {Function}
 */
exports.label = CPromise.label;
/**
 * label decorator
 * @type {Function}
 */
exports.canceled = CPromise.canceled;
/**
 * progress decorator
 * @type {Function}
 */
exports.progress = CPromise.progress;
/**
 * @type {Function}
 */
exports.promisify = CPromise.promisify;
