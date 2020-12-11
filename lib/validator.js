const numberFinitePositive = (thing) => typeof thing === 'number' && Number.isFinite(thing) && thing >= 0
    || 'a positive number';

const plainFunction = (thing)=> typeof thing==='function' && thing.constructor===Function || 'a plain function';

const validators = {
    numberFinitePositive,
    plainFunction
};

['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
    validators[type] = thing => typeof thing === type || `a${i < 1 ? 'n' : ''} ${type}`
})

function validateOptions(options, schema, allowUnknown = false) {
    if (typeof options !== 'object') {
        throw TypeError('options must be an object');
    }
    const keys = Object.getOwnPropertyNames(options);
    let i = keys.length;
    while (i-- > 0) {
        const option = keys[i];
        const validator = schema[option];
        if (validator) {
            const value = options[option];
            const result = value === undefined || validator(value);
            if (result !== true) {
                throw TypeError(`option '${option}' must be ${result}`)
            }
            continue;
        }
        if (!allowUnknown) {
            throw Error(`Unknown option '${option}'`);
        }
    }

    return options;
}

function validateArguments(args, validators, {context = "function"} = {}) {
    const {length} = validators;
    const argsCount = args.length;
    for (let i = 0; i < length; i++) {
        let value = args[i];
        let result = validators[i](value);
        if (result !== true) {
            throw TypeError(`${context} ${i >= argsCount ? "requires" : "expects"} ${result} as ${i + 1} argument`);
        }
    }
}

module.exports = {
    validators,
    validateOptions,
    validateArguments
}
