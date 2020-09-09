const assert= require('assert');
const CPromise = require( '../../lib/c-promise');

module.exports = {
    'setProgress()': {
        'should set the value of the promise progress': function (done) {
            const p = new CPromise(function (resolve, reject) {
                let progress = 0;
                let i = 0;
                const timer = setInterval(() => {
                    progress += 0.2;
                    this.progress(progress, {description: 'test', value: i++});
                    if (progress >= 1) {
                        clearInterval(timer);
                        resolve('done');
                    }

                }, 10);
            });

            const expect = [0.2, 0.4, 0.6, 0.8, 1];
            let index = 0;

            p.on('progress', (actualProgress, scope, data) => {
                const expected = expect[index];

                assert.equal(actualProgress, expected);
                assert.deepStrictEqual(data, {description: 'test', value: index});
                index++;
            })

            p.then(result => {
                assert.equal(result, 'done');
                done();
            }).catch(done);
        }
    }
}
