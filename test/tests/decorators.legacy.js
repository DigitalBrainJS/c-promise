'use strict';

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

const assert = require('assert');

const {
  CPromise,
  async,
  listen,
  cancel,
  timeout,
  innerWeight,
  label,
  CanceledError,
  E_REASON_TIMEOUT
} = require('../../lib/c-promise');

const delay = (ms, value, options) => new CPromise(resolve => setTimeout(() => resolve(value), ms), options);

const measureTime = () => {
  let timestamp = Date.now();
  return () => Date.now() - timestamp;
};

module.exports = {
  "should support async decorator": async function () {
    var _class;

    const klass = (_class = class {
      *generator(x) {
        const y = yield delay(1000, 123);
        return x + y;
      }

    }, (_applyDecoratedDescriptor(_class.prototype, "generator", [async], Object.getOwnPropertyDescriptor(_class.prototype, "generator"), _class.prototype)), _class);
    const obj = new klass();
    const thenable = obj.generator(1);
    assert.ok(thenable instanceof CPromise);
    return thenable.then(result => {
      assert.equal(result, 124);
    });
  },
  "should support listen & cancel decorators": async function () {
    var _class2;

    const time = measureTime();
    const klass = (_class2 = class {
      *generator(x) {
        const y = yield delay(1000, 123);
        return x + y;
      }

      emitCancel() {}

    }, (_applyDecoratedDescriptor(_class2.prototype, "generator", [listen, async], Object.getOwnPropertyDescriptor(_class2.prototype, "generator"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "emitCancel", [cancel], Object.getOwnPropertyDescriptor(_class2.prototype, "emitCancel"), _class2.prototype)), _class2);
    const obj = new klass();
    const thenable = obj.generator(1);
    assert.ok(thenable instanceof CPromise);
    setTimeout(() => {
      obj.emitCancel();
    }, 500);
    return thenable.then(result => {
      assert.fail('was not canceled');
    }, err => {
      assert.ok(err instanceof CanceledError, 'is not a CanceledError');

      if (time() < 500) {
        assert.fail('early cancellation detected');
      }
    });
  },
  "should support timeout, innerWeight, label decorators": async function () {
    var _dec, _dec2, _dec3, _class3;

    const time = measureTime();
    const klass = (_dec = label('test'), _dec2 = innerWeight(2), _dec3 = timeout(500), (_class3 = class {
      *generator(x) {
        const y = yield delay(1000, 123);
        return x + y;
      }

    }, (_applyDecoratedDescriptor(_class3.prototype, "generator", [_dec, _dec2, _dec3, async], Object.getOwnPropertyDescriptor(_class3.prototype, "generator"), _class3.prototype)), _class3));
    const obj = new klass();
    const thenable = obj.generator(1);
    assert.ok(thenable instanceof CPromise);
    return thenable.then(result => {
      assert.fail('was not canceled');
    }, err => {
      assert.ok(err instanceof CanceledError, 'is not a CanceledError');
      assert.equal(err.code, E_REASON_TIMEOUT);
      assert.equal(thenable.label(), 'test');
      assert.equal(thenable.innerWeight(), 2);

      if (time() < 500) {
        assert.fail('early cancellation detected');
      }
    });
  }
};
