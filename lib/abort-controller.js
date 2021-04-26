/**
 * @module AbortController
 */

const _signal = Symbol('signal');
const _aborted = Symbol('aborted');
const _events = Symbol('events');
const _abort = Symbol('abort');
const _repeatedly = Symbol('repeatedly');

const nativeAbortController= (()=>{
    try {
        if (typeof AbortController === 'function') {
            const controller = new AbortController();
            if (controller.toString() === '[object AbortController]' &&
                controller.constructor.toString().indexOf('[native code]') !== -1) {
                return AbortController;
            }
        }
    } catch (e) {
    }
})()

/**
 * AbortSignalPolyfill class
 * @alias CPromise.AbortSignalPolyfill
 */

const AbortSignal= class AbortSignal {
    /**
     * Constructs a new AbortSignal instance
     */

    constructor(repeatedly) {
        this[_events] = {};
        this[_aborted] = false;
        this[_repeatedly]= repeatedly;
    }

    /**
     * Check whether controller is aborted
     * @returns {Boolean}
     */

    get aborted() {
        return this[_aborted];
    }

    /**
     * adds a new listener to the controller
     * @param {String|Symbol} event
     * @param {Function} listener
     */

    addEventListener(event, listener) {
        const events = this[_events];
        if (!events) return;
        const listeners = events[event];
        if (!listeners) {
            events[event] = listener;
            return;
        }
        typeof listeners === 'function' ? (events[event] = [listeners, listener]) : listeners.push(listener);
    }

    /**
     * removes the listener
     * @param {String|Symbol} event
     * @param {Function} listener
     */

    removeEventListener(event, listener) {
        const events = this[_events];
        if (!events) return;
        const listeners = events[event];
        if (!listeners) {
            return;
        }
        if (typeof listeners === 'function') {
            events[event] = null;
            return;
        }

        const index = listeners.indexOf(listener);

        if (index !== -1) {
            listeners.length > 1 ? listeners.splice(index, 1) : (events[event] = null);
        }
    }

    /**
     * dispatch the event
     * @param {String|Symbol} type
     * @param {String} [reason]
     */

    dispatchEvent(type, reason) {
        if (!this[_events]) return;
        let listener;
        const event = {
            type,
            target: this,
            bubbles: false,
            cancelable: false
        };
        typeof (listener = this['on' + type]) === 'function' && listener.call(this, event);
        const listeners = this[_events][type];
        if (!listeners) return;
        if (typeof listeners === 'function') {
            listeners.call(this, type, event, reason);
            return;
        }
        const {length} = listeners;
        for (let i = 0; i < length; i++) {
            listeners[i].call(this, type, event, reason);
        }
    }

    [_abort](reason) {
        if(this[_repeatedly]){
            this.dispatchEvent('abort', reason);
            return;
        }
        if (this[_aborted]) return;
        this[_aborted] = true;
        this.dispatchEvent('abort', reason);
        this[_events] = null;
    }

    clear(){
        this[_events]= {};
    }

    get [Symbol.toStringTag]() {
        return 'AbortSignal'
    }

    get repeatedly(){
        return this[_repeatedly]
    }

    toString() {
        return '[object AbortSignal]'
    }
}

/**
 * AbortController class
 */

const AbortController= class AbortController {
    /**
     * Constructs new AbortController instance
     */
    constructor(repeatedly) {
        this[_signal] = null;
        this[_repeatedly]= !!repeatedly;
    }

    /**
     * returns the signal of the controller
     * @returns {AbortSignal}
     */

    get signal() {
        return this[_signal] || (this[_signal] = new AbortSignal(this[_repeatedly]));
    }

    set signal(v) {
        throw Error('signal is read-only property');
    }

    /**
     * Abort the controller
     * @param {String} [reason]
     */

    abort(reason) {
        this.signal[_abort](reason);
    }

    get [Symbol.toStringTag]() {
        return 'AbortController'
    }

    toString() {
        return '[object AbortController]'
    }
}

const isAbortSignal = (thing) => {
    return thing &&
        typeof thing === 'object' &&
        typeof thing.aborted === 'boolean' &&
        typeof thing.addEventListener === 'function' &&
        typeof thing.removeEventListener === 'function';
}

const isAbortController = (thing) => {
    return thing && typeof thing === 'object' && typeof thing.abort === 'function' && isAbortSignal(thing.signal);
};

module.exports = {
    AbortController:  nativeAbortController || AbortController,
    AbortControllerEx: AbortController,
    AbortSignalEx: AbortSignal,
    isAbortSignal,
    isAbortController
};
