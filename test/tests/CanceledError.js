const assert = require('assert');
const {CPromise, E_REASON_TIMEOUT, E_REASON_DISPOSED, E_REASON_CANCELED} = require('../../lib/c-promise');
const {CanceledError} = CPromise;

module.exports = {
    'CanceledError.throw': {
        'should throw the error that is an instance of CanceledError': function () {
            const originalErr = new CanceledError();
            try {
                CanceledError.rethrow(originalErr);
            } catch (err) {
                assert.strictEqual(err, originalErr);
            }
        },

        'should throw the error only if some error code matched': function () {
            const originalErr = new CanceledError(E_REASON_TIMEOUT);
            try {
                CanceledError.rethrow(originalErr, E_REASON_DISPOSED);
            } catch (err) {
                assert.fail('should not throw');
            }

            try {
                CanceledError.rethrow(originalErr, E_REASON_TIMEOUT);
            } catch (err) {
                assert.strictEqual(err, originalErr);
            }
        }
    },

    'CanceledError.isCanceledError': {
        'should return true if the object is CanceledError': ()=>{
            assert.strictEqual(CanceledError.isCanceledError(new CanceledError()), true);
        },

        'should return true if error codes matched': ()=>{
            assert.strictEqual(
              CanceledError.isCanceledError(CanceledError.from(E_REASON_DISPOSED), E_REASON_DISPOSED),
              true
            );
        },

        "should return true if error codes doesn't match": ()=>{
            assert.strictEqual(
              CanceledError.isCanceledError(CanceledError.from(E_REASON_DISPOSED), E_REASON_CANCELED),
              false
            );
        },
    }
}

