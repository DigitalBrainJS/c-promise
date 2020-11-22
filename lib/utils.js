const isThenable = obj => !!obj && (typeof obj === 'function' || typeof obj === 'object') && typeof obj.then === 'function';
const _setImmediate = typeof setImmediate === 'function' ? setImmediate : function setImmediateShim(cb) {
    setTimeout(cb, 0)
}
function isGeneratorFunction(thing) {
    return typeof thing === 'function' && thing.constructor && thing.constructor.name === 'GeneratorFunction';
}

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

module.exports={
    isThenable,
    setImmediate: _setImmediate,
    isGenerator,
    isGeneratorFunction,
    EmptyObject,
    toGenerator,
    toArray
};
