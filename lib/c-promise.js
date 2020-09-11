/**
 * Cancellable Promise with extra features
 * @module CPromise
 * @exports CPromise
 */

const {CanceledError}= require('./canceled-error');
const {AbortController: _AbortController}= require('./abort-controller');
const {TinyEventEmitter}= require('./tiny-event-emitter');

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
const _onCancel = Symbol('onCancel');
const _onCancelBound = Symbol('onCancelBound');
const _timer = Symbol('timer');
const _timeout = Symbol('timeout');
const TYPE_PROGRESS = Symbol('TYPE_PROGRESS');

const __AbortController =
    (() => {
        try {
            if(typeof AbortController === 'function' && (new AbortController()).toString() === '[object AbortController]') {
                return AbortController;
            }
        } catch (e) {}
        return _AbortController;
    })();


const isThenable = obj => obj && typeof obj.then === 'function';

function isGeneratorFunction(thing){
    return typeof thing==='function' && thing.constructor && thing.constructor.name === 'GeneratorFunction';
}

function isGenerator(thing){
    return thing && typeof thing==='object' && typeof thing.next==='function' && typeof thing.throw==='function';
}

function toCPromise(thing){
    return thing && thing instanceof CPromise? thing : CPromise.resolve(thing);
}

/**
 * @typedef PromiseScopeOptions {Object}
 * @property {String} label - the label for the promise
 * @property {Number} weight= 1 - the progress weight of the promise
 * @property {Number} timeout= 0 - max pending time
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
    constructor(resolve, reject, {label, weight, timeout} = {}) {
        super();
        const shadow = this[_shadow] = {
            captured: false,
            isListening: false,
            progress: 0,
            totalProgress: -1,
            capturedSum: -1
        };

        this[_resolve] = resolve;
        this[_reject] = reject;
        this[_isPending] = true;
        this[_isCanceled] = false;
        this[_parent] = null;

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

        //this.onCancel = this.onCancel.bind(this);

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
     * registers the listener for cancel event
     * @param {Function} listener
     */

    onCancel(listener) {
        if (!this[_isPending]) {
            throw Error('Unable to subscribe to close event since promise has been already settled');
        }
        this.on('cancel', listener);
    }

    /**
     * Set promise progress
     * @param {Number} [value] a number between [0, 1]
     * @param {*} [data] any data to send for progress event listeners
     */

    progress(value, data){
        const shadow = this[_shadow];

        if(arguments.length){
            if (!Number.isFinite(value)) {
                throw TypeError('value must be a number [0, 1]');
            }

            if (value < 0) {
                value = 0;
            } else if (value > 1) {
                value = 1;
            }

            if (value < 1) {
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
        }
    }

    [_captureProgress](calcProgress = false, update = false) {
        const shadow = this[_shadow];
        let capturedSum= shadow.capturedSum;
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

                if(calcProgress){
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
        if(arguments.length){
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
        if(arguments.length){
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
                (value) => this.done(null, value),
                (err) => this.done(err)
            )
        } else {
            this.done(null, value);
        }
    }

    /**
     * Rejects the promise with given error
     * @param err
     */

    reject(err) {
        this.done(err);
    }

    /**
     * Resolves or rejects the promise depending on the arguments
     * @param err - error object, if specified the promise will be rejected with this error, resolves otherwise
     * @param value
     */

    done(err, value) {
        if (!this[_isPending]) return;
        this[_isPending] = false;

        this[_timer] && clearTimeout(this[_timer]);

        if (err) {
            if (err instanceof CanceledError) {
                this[_handleCancelRejection](err);
            }
            this.emit('done', err);
            this[_reject](err);
        } else {
            this[_shadow].captured && this.progress(1);
            this.emit('done', undefined, value);
            this[_resolve](value);
        }

        this.removeAllListeners();

        this[_innerChain] = null;
        this[_parent] = null;
    }

    [_handleCancelRejection](err) {
        this[_isCanceled] = true;

        err.scope || (err.scope= this);

        if (this[_controller]) {
            this[_controller].abort();
            this[_controller] = null;
        }

        this.emit('cancel', err);
    }

    /**
     * throws the CanceledError that cause promise chain cancellation
     * @param {String|Error} reason
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
 * @typedef {Function} AttachOnCancelHandler
 */

/**
 * @typedef {object} ExecutorAPI
 * @property {AttachOnCancelHandler} onCancel
 */

/**
 * @typedef {Function} CPromiseExecutorFn
 * @this CPromiseScope
 * @param {Function} resolve
 * @param {Function} reject
 * @param {ExecutorAPI} api
 */

/**
 * @typedef {Function} CPromiseExecutorFn
 * @param {Function} resolve
 * @param {Function} reject
 */

/**
 * If value is a number it will be considered as the value for timeout option
 * If value is a string it will be considered as label
 * @typedef {Object|String|Number} CPromiseOptions
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
     * @param {CPromiseOptions} options
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

    /**
     * returns chains progress synchronously or adds a progress event listener if the argument was specified
     * @param {Function} listener
     * @returns {Number|CPromise}
     */

    progress(listener){
        if(arguments.length===0){
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

    captureProgress(){
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

    catch(onRejected, filter){
        if(filter){
            return super.catch((err)=>{
               if(err instanceof filter){
                    onRejected(err);
                    return;
               }
               throw err;
            });
        }

        return super.catch(onRejected);
    }

    /**
     * Returns a CPromise that will be resolved after specified timeout
     * @param {Number} ms - delay before resolve the promise with specified value
     * @param value
     * @returns {CPromise}
     */

    static delay(ms, value) {
        return new this((resolve) => {
            if (!Number.isFinite(ms)) {
                throw TypeError('timeout must be a finite number');
            }
            setTimeout(() => resolve(value), ms);
        })
    }

    /**
     * Returns a single CPromise that resolves to an array of the results of the input promises.
     * If one fails then other promises will be canceled immediately
     * @param {Iterable} thenables
     * @returns {CPromise}
     */

    static all(thenables) {
        return new this((resolve, reject, {onCancel})=>{
            const cancel= (reason)=>{
                for (let i = 0; i < thenables.length; i++) {
                    thenables[i].cancel(reason);
                }
            };
            onCancel(cancel);
            super.all(thenables).then(resolve, (err)=>{
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

    static race(thenables){
        return new this((resolve, reject, {onCancel})=>{
           const cancel= (reason)=>{
               for (let i = 0; i < thenables.length; i++) {
                   thenables[i].cancel(reason);
               }
           };
           onCancel(cancel);
           super.race(thenables).then((value)=>{
               resolve(value);
               cancel();
           }, (err)=>{
               reject(err);
               cancel();
           });
        });
    }

    /**
     * Converts thing to CPromise. If thing if a thenable with cancel method it will be called on cancel event
     * @param {*} thing
     * @returns {CPromise}
     */

    static from(thing) {
        if (thing instanceof this) return thing;
        if (!isThenable(thing)) {
            return this.resolve(thing);
        }
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
}

const {prototype}= CPromise;

['on', 'off', 'once'].forEach(methodName => {
    const scopeMethod = CPromiseScope.prototype[methodName];

    prototype[methodName] = function () {
        scopeMethod.apply(this[_scope], arguments);
        return this;
    }
});

['weight', 'label', 'timeout'].forEach(methodName=>{
    const scopeMethod = CPromiseScope.prototype[methodName];
    prototype[methodName]= function () {
        if(arguments.length){
            scopeMethod.apply(this[_scope], arguments);
            return this;
        }
        return scopeMethod.call(this[_scope]);
    }
})

function bindMethod(prototype, methodName) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);
    if(!descriptor){
        throw Error(`Property ${methodName} doesn't exists`);
    }
    const method = descriptor.value;
    const boundSymbol= Symbol(`${methodName}Bound`);

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

module.exports= CPromise;





