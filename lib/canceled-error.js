/**
 * @module CanceledError
 */

const {version, versionNumber, _version, _versionNumber, warnVersionInteraction}= require('./env');

const {hasOwnProperty}= Object.prototype;

const _scope = Symbol('scope');
const _errors = Symbol('errors');
const _code = Symbol('code');

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
     * @param {String} [reason]
     */
    constructor(reason = E_REASON_CANCELED) {
        super();
        this.name = this.constructor.name;
        const registered = this.constructor[_errors][reason];
        if (registered) {
            this.message = registered;
            this[_code] = reason;
        } else {
            this.message = reason;
        }

        this[_scope] = null;
    }

    /**
     * get promise scope where the error was raised
     * @returns {CPromise|null}
     */

    get scope() {
        return this[_scope];
    }

    /**
     * get error code
     * @returns {string}
     */

    get code() {
        return this[_code] || '';
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
     * @returns {boolean}
     */

    static isCanceledError(thing) {
        return thing && (thing instanceof this || isExternalCanceledError(thing) && warnVersionInteraction(thing));
    }

    static registerErrors(errors) {
        return Object.entries(errors).reduce((acc, [name, message]) => {
            Object.defineProperty(this, name, {
                value: name
            });
            this[_errors][name] = message;
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
    E_REASON_UNMOUNTED: 'component unmounted'
});

module.exports = {
    CanceledError
};
