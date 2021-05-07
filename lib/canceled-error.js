/**
 * @module CanceledError
 */

const {version, versionNumber, _version, _versionNumber, warnVersionInteraction}= require('./env');
const {validateOptions, validators} = require('./validator');
const {string, number, boolean}= validators;

const {hasOwnProperty}= Object.prototype;

const _scope = Symbol('scope');
const _message = Symbol('message');
const _errors = Symbol('errors');
const _code = Symbol('code');
const _priority = Symbol('priority');
const _forced = Symbol('forced');

const _isCanceledError= Symbol.for('CPromise:CanceledError');

const isExternalCanceledError = (thing) => thing[_isCanceledError] ||
  thing.constructor.name === 'CanceledError' &&
  hasOwnProperty.call(thing, 'scope');
/**
 * CanceledError
 */

const CanceledError= class CanceledError extends Error {
    /**
     * Constructs a new error instance
     * @param {String} [message]
     * @param {String} [code]
     * @param {Number} [priority= 0]
     * @param {Boolean} [forced= false]
     */
    constructor(message, code = E_REASON_CANCELED, priority= 0, forced= false) {
        super();
        this.name = this.constructor.name;
        this[_message] = message || 'canceled';
        this[_code] = code || E_REASON_CANCELED;
        this[_scope] = null;

        if (priority !== undefined && typeof priority !== "number") {
            throw TypeError('priority must be a number');
        }

        this[_forced] = !!forced;
        this[_priority] = priority;
    }

    /**
     * get promise scope where the error was raised
     * @returns {CPromise|null}
     */

    get scope() {
        return this[_scope];
    }

    get message(){
        return this[_message];
    }

    /**
     * get error code
     * @returns {string}
     */

    get code() {
        return this[_code] || '';
    }

    /**
     * Get error priority
     * @returns {Number}
     */

    get priority(){
        return this[_priority];
    }

    /**
     * Get forced flag of the error
     * @returns {*}
     */
    get forced(){
        return this[_forced];
    }

    set scope(scope) {
        if (!this[_scope]) {
            this[_scope] = scope;
            return;
        }
        throw Error('Scope has been already set');
    }

    /**
     * converts thing to a CanceledError instance
     * @param {String|Error} thing
     * @returns {CanceledError}
     */

    static from(thing) {
        const type = typeof thing;

        if (type === 'string' || thing == null) {
            const registered = this[_errors][thing];

            if (registered) {
                this[_code] = thing;
                this[_priority] = registered[_priority];
                this[_forced] = registered[_forced];
                return new CanceledError(registered.message, thing, registered.priority, registered.forced);
            }

            return new CanceledError(thing);
        } else if (type === 'object') {
            if (thing instanceof Error) {
                if (thing instanceof CanceledError) {
                    return thing;
                }

                return new CanceledError(thing.message);
            }
        }

        throw TypeError(`unable convert ${thing} to a CanceledError`);
    }

    /**
     * Check whether object is an instance of CanceledError
     * @param thing
     * @param {...string} [codes] codes to match
     * @returns {boolean}
     */

    static isCanceledError(thing, ...codes) {
        return thing && (thing instanceof this || isExternalCanceledError(thing) && warnVersionInteraction(thing)) &&
          (!codes.length || codes.some(code => code === thing.code));
    }

    static registerErrors(errors) {
        return Object.entries(errors).reduce((acc, [name, entry]) => {
            Object.defineProperty(this, name, {
                value: name
            });

            if(typeof entry==='object'){
                validateOptions(entry, {
                    message: string,
                    priority: number,
                    forced: boolean
                })
            }else{
                entry= {
                    message: entry + ""
                }
            }

            this[_errors][name] = entry
            acc[name] = name;
            return acc;
        }, {});
    }

    /**
     * Rethrow the canceled error with optional codes matching
     * @param err an error to assert
     * @param {...String} [codes]
     * @throws CanceledError
     */

    static rethrow(err, ...codes) {
        if (!(this.isCanceledError(err))) {
            return;
        }
        const {length} = codes;
        if (!length) {
            throw err;
        } else {
            const {code} = err;
            for (let i = 0; i < length; i++) {
                let targetCode = codes[i];
                if (typeof targetCode !== 'string') {
                    throw TypeError(
                      `CanceledError code passed as the ${i + 1}th argument must be a string, got ${targetCode}`
                    )
                }
                if (targetCode === code) {
                    throw err;
                }
            }
        }
    }
}

Object.defineProperties(CanceledError.prototype, {
    [_version]: {value : version},
    [_versionNumber]: {value : versionNumber}
})

Object.defineProperties(CanceledError.prototype, {
    [_isCanceledError]: {value : true}
})

CanceledError[_errors] = {};

const {E_REASON_CANCELED} = CanceledError.registerErrors({
    E_REASON_CANCELED: 'canceled',
    E_REASON_TIMEOUT: 'timeout',
    E_REASON_DISPOSED: 'disposed',
    E_REASON_UNMOUNTED: {
        message: 'component unmounted',
        priority: Infinity,
        forced: true
    }
});

module.exports = {
    CanceledError
};
