/**
 * @module AbortController
 */

const {TinyEventEmitter}= require('./tiny-event-emitter');

const _signal = Symbol('signal');
const _aborted = Symbol('aborted');
const _events = Symbol('events');
const _abort = Symbol('abort');

/**
 * AbortSignal class
 * @alias CPromise.AbortSignal
 */

class AbortSignal{
    /**
     * Constructs a new AbortSignal instance
     */

    constructor() {
        this[_events] = new TinyEventEmitter();
        this[_aborted] = false;
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
        this[_events] && this[_events].on(event, listener);
    }

    /**
     * removes the listener
     * @param {String|Symbol} event
     * @param {Function} listener
     */

    removeEventListener(event, listener) {
        this[_events] && this[_events].off(event, listener);
    }

    /**
     * dispatch the event
     * @param {String|Symbol} type
     */

    dispatchEvent(type) {
        if (!this[_events]) return;
        let listener;
        const event = {
            type,
            target: this,
            bubbles: false,
            cancelable: false
        };
        typeof (listener = this['on' + type]) === 'function' && listener.call(this, event);
        this[_events].emit(type, event);
    }

    [_abort]() {
        if (this[_aborted]) return;
        this[_aborted] = true;
        this.dispatchEvent('abort');
        this[_events]= null;
    }

    get [Symbol.toStringTag]() {
        return 'AbortSignal'
    }

    toString() {
        return '[object AbortSignal]'
    }
}

/**
 * AbortController class
 */

class AbortController {
    /**
     * Constructs new AbortController instance
     */
    constructor() {
        this[_signal] = null;
    }

    /**
     * returns the signal of the controller
     * @returns {AbortSignal}
     */

    get signal() {
        return this[_signal] || (this[_signal] = new AbortSignal());
    }

    set signal(v) {
        throw Error('signal is read-only property');
    }

    /**
     * Abort the controller
     */

    abort() {
        this.signal[_abort]();
    }

    get [Symbol.toStringTag]() {
        return 'AbortController'
    }

    toString() {
        return '[object AbortController]'
    }
}

module.exports= {
    AbortController,
    AbortSignal
};
