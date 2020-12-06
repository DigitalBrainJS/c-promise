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

const makePromise = (ms, value, handler) => {
    return new CPromise((resolve, reject, scope) => {
        const timer = setTimeout(resolve, ms, value);
        scope.onCancel(() => {
            clearTimeout(timer);
            handler && handler(scope);
        })
    });
};

const measureTime = () => {
    let timestamp = Date.now();
    return () => Date.now() - timestamp;
}

module.exports = {
    "should support async decorator": async function () {
        const klass = class {
            @async
            * generator(x) {
                const y = yield delay(1000, 123);
                return x + y;
            }
        }

        const obj = new klass();

        const thenable = obj.generator(1);

        assert.ok(thenable instanceof CPromise);

        return thenable.then(result => {
            assert.equal(result, 124);
        })
    },

    "should support listen & cancel decorators": async function () {

        const time = measureTime();

        const klass = class {
            @listen
            @async
            * generator(x) {
                const y = yield delay(1000, 123);
                return x + y;
            }

            @cancel
            emitCancel() {

            }
        }

        const obj = new klass();

        const thenable = obj.generator(1);

        assert.ok(thenable instanceof CPromise);

        setTimeout(() => {
            obj.emitCancel()
        }, 500);

        return thenable.then(result => {
            assert.fail('was not canceled');
        }, err => {
            assert.ok(err instanceof CanceledError, 'is not a CanceledError');
            if (time() < 500) {
                assert.fail('early cancellation detected');
            }
        })
    },

    "should support timeout, innerWeight, label decorators": async function () {
        const time = measureTime();

        const klass = class {
            @label('test')
            @innerWeight(2)
            @timeout(500)
            @async
            * generator(x) {
                const y = yield delay(1000, 123);
                return x + y;
            }
        }

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
        })
    }
}
