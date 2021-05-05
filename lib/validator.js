const {isAbortSignal, isAbortController} = require('./abort-controller')

const typify = (validator, type, kind) => {
  validator.type = type;
  kind && (validator.kind = kind);
  return validator;
}

const findValidatorName = (validator) => {
  const fnName = Object.keys(validators).find(key => validators[key] === validator) || validator.name;
  return fnName ? fnName.replace(/[A-Z]/g, char => '.' + char.toLowerCase()) : '';
}

const renderValidator = (validator) => validator && (validator.type || findValidatorName(validator)) || '';

const compose = (...validators) => {
  return typify((thing) => {
    const {length} = validators;
    for (let i = 0; i < length; i++) {
      const result = validators[i](thing);
      if (result !== true) {
        return result;
      }
    }
    return true;
  }, validators.map(renderValidator).join('.'));
}

const renderValue = (value) => typeof value == 'string' ? `'${value}'` : String(value);

const validators = {
  null: (thing) => thing === null,
  nullable: typify((thing) => thing == null, 'undefined|null'),
  numberFinitePositive: (thing) => typeof thing === 'number' && Number.isFinite(thing) && thing >= 0,
  functionPlain: (thing) => typeof thing === 'function' && thing.constructor === Function,
  array: (thing) => Array.isArray(thing),
  union: (...validators) => {
    const len = validators.length;
    const shouldBe = validators.map(renderValidator).join('|');

    return typify((thing) => {
      for (let i = 0; i < len; i++) {
        if (validators[i](thing) === true) {
          return true;
        }
      }
    }, shouldBe)
  },
  abortController: typify(isAbortSignal, 'AbortController'),
  abortSignal: typify(isAbortController, 'AbortSignal'),
  values: (...values) => typify((thing) => values.indexOf(thing) !== -1, values.map(renderValue).join('|'))
};

['object', 'boolean', 'number', 'function', 'string', 'symbol', 'undefined'].forEach((type, i) => {
  validators[type] = typify(thing => typeof thing === type || `a${i < 1 ? 'n' : ''} ${type}`, type);
})

const {array, object, union} = validators;

validators.object = (schema, required, allowUnknown = false) => {
  const rendered = schema && Object.entries(schema).map(([prop, validator]) => {
    return `${prop}: ${renderValidator(validator)}`;
  }).join(', ');

  return schema ? compose(object, typify((thing) => {
    validateOptions(thing, schema, required, allowUnknown);
    return true;
  }, schema ? `<${rendered}>` : '')) : object;
}


validators.array = (...validators) => {
  const validator = validators.length > 1 ? union(...validators) : validators[0];

  return compose(array, typify((thing) => thing.every(validator), `<${renderValidator(validator)||'*'}>`))
}

validators.rest = (...validators) => {
  const validator = validators.length > 1 ? union(...validators) : validators[0];

  return typify(validator, `...${renderValidator(validator)||'*'}`, 'rest')
}


function validateOptions(options, schema, required = null, allowUnknown = false) {
  if (typeof options !== 'object') {
    throw TypeError('options must be an object');
  }

  required && required.forEach(option => {
    if (options[option] === undefined) {
      throw Error(`Option ${option} is required`);
    }
  })

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
          `option '${option}' must be ${typeof result === 'string' ? result : renderValidator(validator)}`
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
  let restDetected;
  let validator;
  for (let i = 0; i < length; i++) {
    if (!restDetected) {
      validator = validators[i];
      if (validator.kind === 'rest') {
        restDetected = true;
      }
    }

    let result = validator(args[i]);
    if (result !== true) {
      const renderedType = result || renderValidator(validator);
      throw TypeError(`${context} ${i >= argsCount ? "requires" : "expects"} ${renderedType} as ${i + 1}th argument`);
    }
  }
}

module.exports = {
  validators,
  validateOptions,
  validateArguments
}
