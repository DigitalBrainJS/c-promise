const {hasOwnProperty}= Object.prototype;

const isThenable = obj => !!obj && (typeof obj === 'function' || typeof obj === 'object') && typeof obj.then === 'function';

const _setImmediate = typeof setImmediate === 'function' ? setImmediate : function setImmediateShim(cb) {
    setTimeout(cb, 0)
}

const {toStringTag} = Symbol;

const getTag = (thing) => thing && thing[toStringTag] || '';

function isGeneratorFunction(thing) {
    return typeof thing === 'function' && thing.constructor && getTag(thing) === 'GeneratorFunction';
}

const getFnType = (thing) => typeof thing === 'function' && (({
    GeneratorFunction: 'generator',
    AsyncFunction: 'async',
})[getTag(thing)] || 'plain');

function isGenerator(thing) {
    return thing && typeof thing === 'object' && typeof thing.next === 'function';
}

function EmptyObject() {
}

EmptyObject.prototype = null;

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

const isPropertyDescriptor = ((allowed)=>{
    return (thing)=>{
        if(thing!== null && typeof thing==='object'){
            const props= Object.getOwnPropertyNames(thing);
            return props.length && props.every((prop)=> allowed[prop]);
        }
        return false;
    }
})({
    value: true,
    set: true,
    get: true,
    writable: true,
    enumerable: true,
    configurable: true
});


const lazyBindMethods = (obj, props) => {
    props.forEach(prop => {
        const symbol = Symbol(`${prop}Bound`);
        const {value: fn} = Object.getOwnPropertyDescriptor(obj, prop);

        Object.defineProperty(obj, prop, {
            get: function () {
                return hasOwnProperty.call(this, symbol)? this[symbol] : (this[symbol] = fn.bind(this));
            },

            set: function (v) {
                throw Error(`Can not rewrite method ${prop} with ${v}`);
            },

            enumerable: true,
            configurable: true
        })
    })
}

const globalObject= (()=>{
    if (typeof globalThis !== 'undefined') { return globalThis; }
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
})();

const isContextDefined = (context) => context != null && context !== globalObject;

module.exports={
    isPropertyDescriptor,
    isThenable,
    setImmediate: _setImmediate,
    isGenerator,
    isGeneratorFunction,
    EmptyObject,
    toGenerator,
    toArray,
    getFnType,
    lazyBindMethods,
    globalObject,
    isContextDefined,
    hasOwnProperty,
    getTag
};
