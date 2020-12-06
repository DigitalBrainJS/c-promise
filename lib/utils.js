const {hasOwnProperty}= Object.prototype;

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

const isAnyDecoratorContext = function(arg0, arg1, arg2){
    if (arguments.length === 1) {
        return typeof arg0 === 'object' &&
            hasOwnProperty.call(arg0, 'kind') &&
            hasOwnProperty.call(arg0, 'key') &&
            hasOwnProperty.call(arg0, 'placement') &&
            isPropertyDescriptor(arg0.descriptor);
    }

    if (arguments.length === 3) {
        return isPropertyDescriptor(arg2)
    }
}

function reduceDecorator(decorator) {
    return function (arg0, arg1, arg2) {
        if (arguments.length === 1) {
            return decorator(arg0);
        } else {
            const { descriptor, finisher } = decorator.call(null, {
                key: arg1,
                kind: "method",
                placement: typeof arg0 === "function" ? "static" : "prototype",
                descriptor: arg2
            });
            finisher && finisher(arg0.constructor);
            return descriptor;
        }
    };
}

function buildDecorator(builder, name) {
    const context= this;

    const decorator = function (...params) {
        return reduceDecorator((descriptor)=>{
            if (descriptor.kind !== 'field' && descriptor.kind !== 'method') {
                throw Error(`${name} decorator can be used for method or field`);
            }
            return builder(descriptor, params, context);
        }, context);
    };

    return function(){
        if(isAnyDecoratorContext.apply(null, arguments)){
            return decorator().apply(null, arguments);
        }
        return decorator.apply(null, arguments);
    }
}

module.exports={
    isThenable,
    setImmediate: _setImmediate,
    isGenerator,
    isGeneratorFunction,
    EmptyObject,
    toGenerator,
    toArray,
    buildDecorator
};
