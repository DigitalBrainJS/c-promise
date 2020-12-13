const assert = require('assert');
const {CPromise, E_REASON_TIMEOUT, E_REASON_DISPOSED} = require('../../lib/c-promise');
const {CanceledError} = CPromise;

module.exports = {
    'CanceledError.throw': {
        'should throw the error that is instance of CanceledError': function () {
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
    }
}

