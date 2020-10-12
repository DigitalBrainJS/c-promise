const numberFinitePositive = (thing) => typeof thing === 'number' && Number.isFinite(thing) && thing >= 0
    || 'a positive number';

const validators= {
    numberFinitePositive
};

['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
    validators[type] = thing => typeof thing === type || `a${i < 1 ? 'n' : ''} ${type}`
})

function validateOptions(options, schema) {
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
        throw Error(`Unknown option '${option}'`);
    }
}

module.exports= {
    validators,
    validateOptions
}