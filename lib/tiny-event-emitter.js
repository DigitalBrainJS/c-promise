/**
 * @module TinyEventEmitter
 */

const _events = Symbol('events');

function EmptyObject() {
}

EmptyObject.prototype = null;

/**
 * @typedef {String|Symbol} EventType
 */

/**
 * Simple event emitter class
 */

class TinyEventEmitter {
    /**
     * adds a new listener
     * @alias TinyEventEmitter#addEventListener
     * @param {EventType} type
     * @param {Function} listener
     * @returns {TinyEventEmitter}
     */
    on(type, listener) {
        const events = this[_events] || (this[_events] = new EmptyObject());
        const listeners = events[type];

        events['newListener'] && this.emit('newListener', type, listener);

        if (!listeners) {
            events[type] = listener;
            return this;
        }

        if (typeof listeners === 'function') {
            events[type] = [listeners, listener];
            return this;
        }

        listeners.push(listener);
        return this;
    }

    /**
     * removes the listener
     * @alias TinyEventEmitter#removeEventListener
     * @param {EventType} type
     * @param {Function} listener
     * @returns {TinyEventEmitter}
     */

    off(type, listener) {
        if(typeof listener!=='function'){
            throw TypeError('listener must be a function');
        }

        const events = this[_events]
        if (!events) return;
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

    listenersCount(type){
        const events = this[_events];
        if (!events) return 0;
        const listeners= events[type];
        if(!listeners) return 0;
        return typeof listeners==='function'? 1 : listeners.length;
    }

    /**
     * checks if there are listeners of a specific type
     * @param {String|Symbol} type
     * @returns {Boolean}
     */

    hasListeners(type){
        const events = this[_events];
        return !!(events && events[type]);
    }

    /**
     * add 'once' listener
     * @param {EventType} type
     * @param {Function} listener
     * @returns {TinyEventEmitter}
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
     * @returns {TinyEventEmitter}
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
     * emits the hook event
     * @param {EventType} type
     * @param args
     * @returns {Boolean} - false if some listener returned false
     */

    emitHook(type, ...args) {
        const events = this[_events];
        if (!events) return this;
        const listeners = events[type];
        if (!listeners) return true;

        if (typeof listeners === 'function') {
            return listeners.apply(this, args) !== false;
        }

        for (let i = 0; i < listeners.length; i++) {
            if (listeners[i].apply(this, args) === false) {
                return false;
            }
        }

        return true;
    }

    /**
     * removes all listeners
     * @returns {TinyEventEmitter}
     */

    removeAllListeners() {
        this[_events] = null;
        return this;
    }
}

const {prototype} = TinyEventEmitter;

prototype[_events]= null;

prototype.addEventListener = prototype.on;
prototype.removeEventListener = prototype.off;

module.exports= {
    /**
     * Test
     */
    TinyEventEmitter
};
