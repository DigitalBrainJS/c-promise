const {validateArguments}= require('./validator');
const {isContextDefined, isPropertyDescriptor, hasOwnProperty}= require('./utils');

const isModernDescriptor= (thing)=> thing && typeof thing === 'object' && thing[Symbol.toStringTag] === 'Descriptor';

const isAnyPropertyDecoratorDescriptor = function(arg0, arg1, arg2){
  if (arguments.length === 1) {
    return isModernDescriptor(arg0);
  }

  if (arguments.length === 3) {
    return isPropertyDescriptor(arg2);
  }
}

function reducePropertyDecorator(decorator) {
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

const assertDecoratorArgs= (decoratorName, args, validators)=>{
  validators && validateArguments(args, validators, {
    context: `@${decoratorName} decorator`
  })
}

const fail = (decoratorName, message) =>{
   throw Error(`@${decoratorName}: ${message}`);
}

const propertyDecorator= (builder, argsTypes, hook)=>{
  return function(name, context) {

    function decorator(...params) {

      assertDecoratorArgs(name, params, argsTypes);

      return reducePropertyDecorator((descriptor) => {
        if (descriptor.kind !== 'field' && descriptor.kind !== 'method') {
          throw Error(`${name} decorator can be used for method or field`);
        }
        return builder(descriptor, params, {context, fail: fail.bind(null, name), name});
      });
    }

    return function () {
      const hookResult = hook && isContextDefined(this) ? hook.apply(this, arguments) : undefined;

      if (hookResult !== undefined) {
        return hookResult;
      }

      if (isAnyPropertyDecoratorDescriptor.apply(null, arguments)) {
        return decorator().apply(null, arguments);
      }
      return decorator.apply(null, arguments);
    }
  }
}

function reduceClassDecorator(decorator) {
  return function (arg0) {
    if (arguments.length === 1){
      if(typeof arg0==='function'){
        const { descriptor, finisher }= decorator({
          kind: "class"
        });
        finisher && finisher(arg0);
        return descriptor;
      }else if(isModernDescriptor(arg0)){
        return decorator(arg0);
      }
    }

    throw new Error('cannot recognize decorator calling context');
  };
}

function isClassDecoratorContext(arg0) {
  return arguments.length === 1 && typeof arg0 === 'function' || isModernDescriptor(arg0);
}

const classDecorator = (builder, argsTypes, hook)=>{
  return function(name, context){
    const decorator= function(...params){

      assertDecoratorArgs(name, params, argsTypes);

      return reduceClassDecorator((descriptor) => {
        if (descriptor.kind !== 'class') {
          fail(name, 'can only be used for classes');
        }
        return builder(descriptor, params, {context, fail: fail.bind(null, name), name});
      });
    }
    return function(arg0){
      const hookResult = hook && isContextDefined(this) ? hook.apply(this, arguments) : undefined;

      if (hookResult !== undefined) {
        return hookResult;
      }

      if(isClassDecoratorContext.apply(null, arguments)){
        return decorator().apply(null, arguments);
      }
      return decorator.apply(null, arguments);
    }
  }
}

const bindDecorators = (context, decorators)=>{
  const descriptors= {};
  Object.entries(decorators).forEach(([name, decorator])=>{
    const symbol = Symbol(`${name}Bound`);

    descriptors[name] = {
      get: function () {
        return hasOwnProperty.call(this, symbol) ? this[symbol] : (this[symbol] = decorator(name, this))
      },
      configurable: true,
      enumerable: true
    }
  })

  Object.defineProperties(context, descriptors);
}

module.exports= {
  propertyDecorator,
  classDecorator,
  bindDecorators
}
