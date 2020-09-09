const assert= require('assert');
const CPromise = require( '../../lib/c-promise');

const delay = (ms, value, options) => new CPromise(resolve => setTimeout(() => resolve(value), ms), options);


module.exports = {
    constructor: {
        'should create instance of CancelablePromise': function () {
            const promise = new CPromise((resolve, reject) => {
            });
            assert(promise instanceof CPromise);
            assert(promise instanceof Promise);
        }
    },

    'prototype.cancel()': {
        'should reject the promise with CanceledError': async function () {
            const promise = new CPromise((resolve, reject) => {
                setTimeout(resolve, 1000, 123);
            });

            const timestamp = Date.now();
            const timeout = 100;

            setTimeout(() => {
                promise.cancel();
            }, timeout);

            await promise.then(() => {
               assert.fail('promise has not been canceled');
            }, (err) => {
                if (err instanceof CPromise.CanceledError) {
                    if (Date.now() - timestamp < timeout) {
                       assert.fail('early cancellation detected')
                    }
                    return;
                }
                throw err;
            });
        },

        'should reject the promise chain with CanceledError': async function () {
            let currentChain = 1;

            const chain = delay(100)
                .then(() => {
                    currentChain = 2
                    return delay(100)
                })
                .then(() => {
                    currentChain = 3
                    return delay(100)
                })
                .then(() => {
                   currentChain = 4
                   return delay(100)
                })
                .then(() => {
                    currentChain = 5
                })

            const timestamp = Date.now();
            const timeout = 250;
            const targetChainIndex= 3;

            setTimeout(() => {
                chain.cancel();
            }, timeout);

            await chain.then(() => {
               assert.fail('promise has not been canceled');
            }, (err) => {
                if (err instanceof CPromise.CanceledError) {
                    if (Date.now() - timestamp < timeout) {
                        assert.fail('early cancellation detected')
                    }
                    if (currentChain !== targetChainIndex) {
                       assert.equal(currentChain, targetChainIndex, 'wrong chain raised the error')
                    }
                    return;
                }
                throw err;
            });
        }
    },
   'prototype.progress': {
       'should return correct chain progress': async function(){
           const chain = delay(100)
               .then(() => {
                   assertProgress(0.2)
                   return delay(100)
               })
               .then(() => {
                   assertProgress(0.4)
                   return delay(100)
               })
               .then(() => {
                   assertProgress(0.6)
                   return delay(100)
               })
               .then(() => {
                   assertProgress(0.8)
               });//.captureProgress();

           const assertProgress= (expected)=> {
               assert.equal(chain.progress(), expected);
           }

           assertProgress(0);

           await chain.then(()=>{
               assertProgress(1);
           })
       }
   },

   "throwing the CanceledError inside the promise": {
        "should lead to chains cancellation": async function(){
            let canceled= false;
            let signaled= false;

            return CPromise.delay(10, 123).then((value, {signal, onCancel})=>{
                onCancel((reason)=>{
                    assert.equal(reason.message, 'test');
                    canceled= true;
                });

                signal.addEventListener('abort', ()=>{
                    signaled= true;
                })

                return CPromise.delay(20).then(()=>{
                    throw new CPromise.CanceledError('test');
                });
            }).then(()=>{
                assert.fail("has not been rejected");
            }, (err)=>{
                assert.equal(err.message, 'test');
                assert.ok(canceled,"not cancelled");
                assert.ok(signaled,"not signaled");
                assert.ok(err instanceof CPromise.CanceledError);
            })
        }
   }
};
