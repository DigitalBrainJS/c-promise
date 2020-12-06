/**
 * @module CanceledError
 */

const _scope= Symbol('scope');
const _errors= Symbol('errors');
const _code= Symbol('code');

/**
 * CanceledError
 */

class CanceledError extends Error{
    /**
     * Constructs a new error instance
     * @param {String} reason
     */
    constructor(reason= E_REASON_CANCELED) {
        super();
        this.name= this.constructor.name;
        const registered= this.constructor[_errors][reason];
        if(registered){
            this.message= registered;
            this[_code]= reason;
        }else{
            this.message= reason;
        }

        this[_scope]= null;
    }

    /**
     * get promise scope where the error was raised
     * @returns {CPromise|null}
     */

    get scope(){
        return this[_scope];
    }

    /**
     * get error code
     * @returns {string}
     */

    get code(){
        return this[_code] || '';
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
            return new CanceledError(thing);
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

    static registerErrors(errors){
       return Object.entries(errors).reduce((acc, [name, message])=>{
           Object.defineProperty(this, name, {
               value: name
           });
           this[_errors][name]= message;
           acc[name]= name;
           return acc;
       }, {});
    }
}

CanceledError[_errors]= {};

const {E_REASON_CANCELED}= CanceledError.registerErrors({
    E_REASON_CANCELED : 'canceled',
    E_REASON_TIMEOUT : 'timeout',
    E_REASON_DISPOSED : 'disposed'
});

module.exports= {
    CanceledError
};
