const validators = {
  numberFinitePositive: (thing) => typeof thing === 'number' && Number.isFinite(thing) && thing >= 0,
  functionPlain: (thing) => typeof thing === 'function' && thing.constructor === Function,
  array: Array.isArray,
  union: (...validators) => {
    const len = validators.length;
    const shouldBe = validators.map(validatorType).join('|');

    return (thing) => {
      for (let i = 0; i < len; i++) {
        if (validators[i](thing) === true) {
          return true;
        }
      }

      return shouldBe;
    }
  }
};

const nameByValidator = (validator) => Object.keys(validators).find(key => validators[key] === validator) || '';

const validatorType = (validator) => nameByValidator(validator).replace(/[A-Z]/g, char => '.' + char.toLowerCase());

['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = thing => typeof thing === type || `a${i < 1 ? 'n' : ''} ${type}`;
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
        throw TypeError(
          `option '${option}' must be ${typeof result === 'string' ? result : validatorType(validator)}`
        )
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
