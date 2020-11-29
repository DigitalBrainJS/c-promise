/**
 * @module CanceledError
 */

const _scope= Symbol('scope');

/**
 * CanceledError
 */

class CanceledError extends Error{
    /**
     * Constructs a new error instance
     * @param {String} reason
     */
    constructor(reason) {
        super(reason);
        this.name= this.constructor.name;
        this[_scope]= null;
    }

    /**
     * get promise scope where the error was raised
     * @returns {PromiseScope|null}
     */

    get scope(){
        return this[_scope];
    }

    set scope(scope){
        if(!this[_scope]){
            this[_scope]= scope;
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
            return new CanceledError(thing || 'canceled');
        } else if (type === 'object') {
            if (thing instanceof Error) {
                if (thing instanceof CanceledError) {
                    return thing;
                }

                if (thing.name === 'AbortError') {
                    return new CanceledError(thing.message);
                }
            }
        }

        throw TypeError(`unable convert ${thing} to a CanceledError`);
    }

    /**
     * Check whether object is an instance of CanceledError
     * @param thing
     * @returns {boolean}
     */

    static isCanceledError(thing){
        return thing instanceof this;
    }
}

module.exports= {
    CanceledError
};
