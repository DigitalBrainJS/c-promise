const assert = require('assert');
const {
    CPromise,
    async,
    listen,
    cancel,
    timeout,
    innerWeight,
    label,
    canceled,
    atomic,
    done,
    progress,
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
    },

    "should support canceled decorator": async function () {
        let invoked = false;

        const klass = class {
            @canceled(function (err, scope, context) {
                assert.ok(this instanceof klass);
                assert.ok(context instanceof klass);
                assert.ok(err instanceof CanceledError);
                assert.ok(scope instanceof CPromise);
                invoked = true;
            })
            @async
            * generator() {
                yield delay(1000, 123);
            }
        }

        const obj = new klass();

        const thenable = obj.generator();

        setTimeout(() => {
            thenable.cancel();
        }, 100);

        return thenable.then(() => {
            assert.ok(invoked, 'was not canceled');
        }, err => {
            if(err instanceof CanceledError) {
                assert.fail(`was not caught: ${err}`);
            }else{
                throw err;
            }
        })
    },

    "should support progress decorator": async function () {
        let stage= 0;

        const klass = class {
            @progress(function (value, scope, data, context) {
                stage++;
                assert.ok(this instanceof klass);
                assert.ok(context instanceof klass);
                assert.ok(scope instanceof CPromise);
                assert.ok(typeof value === 'number');
                assert.ok(typeof data === 'object');
                assert.strictEqual(value, stage / 4);
            })
            @innerWeight(4)
            @async
            *generator() {
                yield delay(100);
                yield delay(100);
                yield delay(100);
                yield delay(100);
            }
        }

        const obj = new klass();

        const thenable = obj.generator();

        return thenable.then(() => {
            assert.strictEqual(stage, 4);
        })
    },

    "should support atomic decorator": async function () {
        const klass = class {
            @async
            *fn1() {
                yield delay(100);
                yield delay(100);
                yield this.fn2();
                yield delay(100);
                yield delay(100);
            }
            @label('atomic-fn')
            @atomic
            *fn2() {
                yield delay(100);
                yield delay(100);
                yield delay(100);
                yield delay(100);
            }
        }

        const obj = new klass();

        const promise = obj.fn1();

        setTimeout(()=>{
            promise.cancel();
        }, 300);

        return promise.canceled((err) => {
            assert.strictEqual(err.scope.label(), 'atomic-fn');
        })
    },

    "should support done decorator": async function () {
        const err= new Error('test');
        const klass = class {
            @done(function(value, isRejected, scope){
                assert.strictEqual(value, err);
                assert.strictEqual(isRejected, true);
                assert.ok(this instanceof klass);
                assert.ok(scope instanceof CPromise);
            })
            *fn1() {
                yield delay(100);
                throw err;
            }
        }

        const obj = new klass();

        return obj.fn1();
    }
}
