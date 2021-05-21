const assert = require('assert');
const {CPromise, E_REASON_CANCELED, E_REASON_UNMOUNTED} = require('../../lib/c-promise');
const {CanceledError} = CPromise;

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

module.exports = {
  constructor: {
    'should create instance of CancelablePromise': function () {
      const promise = new CPromise((resolve, reject) => {
      });
      assert(promise instanceof CPromise);
      assert(promise instanceof Promise);
    }
  },

  'should support cancellation by the external signal': async function () {
    const controller = new CPromise.AbortController();

    const timestamp = Date.now();
    const time = () => Date.now() - timestamp;

    setTimeout(() => controller.abort(), 55);

    return new CPromise((resolve, reject) => {
      setTimeout(resolve, 100);
    }, {signal: controller.signal}).then(() => {
      throw Error('not cancelled');
    }, (err) => {
      if (!CPromise.isCanceledError(err)) {
        if (time() < 50) {
          throw Error('Early cancellation');
        }
        throw err;
      }
    })
  },

  'cancellation': {
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
      const targetChainIndex = 3;

      setTimeout(() => {
        chain.cancel();
      }, timeout);

      await chain.then(() => {
        assert.fail('promise has not been canceled');
      }, (err) => {
        if (err instanceof CPromise.CanceledError) {
          if (Date.now() - timestamp < timeout - 5) {
            assert.fail('early cancellation detected')
          }
          if (currentChain !== targetChainIndex) {
            assert.equal(currentChain, targetChainIndex, 'wrong chain raised the error')
          }
          return;
        }
        throw err;
      });
    },

    'throwing the CanceledError inside the promise': {
      "should lead to chains cancellation": async function () {
        let canceled = false;
        let signaled = false;

        return CPromise.delay(10, 123).then((value, {signal, onCancel}) => {
          onCancel((reason) => {
            assert.equal(reason.message, 'test');
            canceled = true;
          });

          signal.addEventListener('abort', () => {
            signaled = true;
          })

          return CPromise.delay(20).then(() => {
            throw new CPromise.CanceledError('test');
          });
        }).then(() => {
          assert.fail("has not been rejected");
        }, (err) => {
          assert.equal(err.message, 'test');
          assert.ok(canceled, "not cancelled");
          assert.ok(signaled, "not signaled");
          assert.ok(err instanceof CPromise.CanceledError);
        })
      }
    },

    'should cancel only isolated leaves': async function () {
      let rootCanceled = false;
      let firstCanceled = false;
      let secondCanceled = false;

      const root = makePromise(1000, null, () => {
        rootCanceled = true;
      });

      const firstLeaf = root.then(() => makePromise(1000)).then(() => {
        assert.fail('first promise leaf was not canceled');
      }).canceled(() => {
        firstCanceled = true;
      });

      const secondLeaf = root.then(() => makePromise(1000)).then(() => {
        assert.fail('second promise leaf was not canceled');
      }).canceled(() => {
        secondCanceled = true;
      });

      firstLeaf.cancel();
      await firstLeaf;
      assert.equal(firstCanceled, true);
      assert.equal(secondCanceled, false);
      assert.equal(rootCanceled, false);
      secondLeaf.cancel();
      await secondLeaf;
      assert.equal(firstCanceled, true);
      assert.equal(secondCanceled, true);
      assert.equal(rootCanceled, true);
      await root.canceled();
    },

    'should cancel all leaves if the force option is set to true': async function () {
      let rootCanceled = false;
      let firstCanceled = false;
      let secondCanceled = false;

      const root = makePromise(1000, null, () => {
        rootCanceled = true;
      });

      const firstLeaf = root.then(() => makePromise(1000)).then(() => {
        assert.fail('first promise leaf was not canceled');
      }).canceled(() => {
        firstCanceled = true;
      });

      const secondLeaf = root.then(() => makePromise(1000)).then(() => {
        assert.fail('second promise leaf was not canceled');
      }).canceled(() => {
        secondCanceled = true;
      });

      firstLeaf.cancel('', true);
      await firstLeaf;
      assert.equal(firstCanceled, true);
      assert.equal(secondCanceled, true);
      assert.equal(rootCanceled, true);
    },

    'should respect the priority of the CanceledError': async function(){
      const chain= CPromise.delay(100).atomic().delay(100).delay(100);

      chain.cancel(E_REASON_CANCELED);

      await CPromise.delay(50);

      chain.cancel(E_REASON_UNMOUNTED);

      return chain.then(()=>{
        assert.fail('was not cancelled');
      }, (err)=>{
        assert.strictEqual(err.code, E_REASON_UNMOUNTED);
      })
    }
  },

  'progress capturing': {
    'should return correct chain progress': async function () {
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

      const assertProgress = (expected) => {
        assert.equal(chain.progress(), expected);
      }

      assertProgress(0);

      await chain.then(() => {
        assertProgress(1);
      })
    }
  },

  'suspension': {
    'should support pause and resume methods': async function () {
      let timestamp = Date.now();
      let pauseEmitted, resumeEmitted;
      const passed = () => {
        return Date.now() - timestamp;
      }
      const chain = new CPromise((resolve, reject, {onPause, onResume}) => {
        setTimeout(resolve, 500);
        onPause(() => {
          pauseEmitted = true;
        });

        onResume(() => {
          resumeEmitted = true;
        });
      }).then(() => {
        assert.ok(passed() > 1200, `early completion (${passed()}ms)`);
        assert.ok(pauseEmitted, 'pause event has not been emitted');
        assert.ok(resumeEmitted, 'resume event has not been emitted');
      });

      setTimeout(() => {
        chain.pause();
        setTimeout(() => {
          chain.resume();
        }, 1000);
      }, 300);

      return chain;
    },

    'should propagate pause&resume events': async function(){
      let pauseEvents= [], resumeEvents= [];

      const chain = new CPromise((resolve, reject, {onPause, onResume}) => {
        setTimeout(resolve, 500);
        onPause(() => {
          pauseEvents[0] = true;
        });

        onResume(() => {
          resumeEvents[0] = true;
        });
      }).then((v, {onPause, onResume}) => {
        return delay(100);
      });

      chain.onPause(() => {
        pauseEvents[1] = true;
      });

      chain.onResume(() => {
        resumeEvents[1] = true;
      });

      chain.pause();

      assert.strictEqual(chain.isPaused, true);

      setTimeout(()=>chain.resume(), 100);

      return chain.then(()=>{
        assert.ok(pauseEvents[0], 'pause event [0] has not been emitted');
        assert.ok(resumeEvents[0], 'resume event [0] has not been emitted');
        assert.ok(pauseEvents[1], 'pause event [1] has not been emitted');
        assert.ok(resumeEvents[1], 'resume event [1] has not been emitted');
      });
    }
  },

  'timeout': {
    'should cancel the chain with timeout reason': async function () {
      const p = new CPromise(function (resolve, reject) {
        setTimeout(resolve, 1000);
      });

      return p
        .timeout(100)
        .then(() => {
          assert.fail('chain was not cancelled');
        }, err => {
          assert.ok(err instanceof CanceledError);
          assert.equal(err.message, 'timeout');
        })
    }
  },

  'CPromise#then': {
    'should support generators': async function () {
      return CPromise.resolve()
        .then(function* () {
          const result1 = yield makePromise(100, 123);
          const result2 = yield makePromise(100, 456);
          return result1 + result2;
        })
        .then(function* (value) {
          assert.equal(value, 123 + 456);
        })
    }
  },

  'CPromise#Symbol(toCPromise)': {
    'should be invoked to convert the object to an CPromise instance': async function () {
      const toCPromise = Symbol.for('toCPromise');
      let invoked = false;
      const obj = {
        [toCPromise]: function (CPromise) {
          invoked = true;
          return new CPromise((resolve) => resolve(123));
        }
      };

      const promise = CPromise.resolve(obj);

      assert.ok(invoked);
      assert.ok(promise instanceof CPromise);

      return promise.then(value => {
        assert.equal(value, 123);
      })
    }
  },

  'CPromise#setProgress()': {
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
  },

  'CPromise#canceled()': {
    'should catch the CanceledError rejection': async function () {
      let onCanceledCalled = false;
      const chain = CPromise.delay(500)
        .canceled(() => {
          onCanceledCalled = true;
        })
        .catch((err) => {
          assert.fail(`should not throw: ${err}`);
        })

      setTimeout(() => chain.cancel(), 0);

      return chain.then((value) => {
        assert.equal(value, undefined);
        assert.equal(onCanceledCalled, true, 'onCanceledCalled was not called');
        assert.equal(chain.isCanceled, true, `isCanceled is not true`)
      });
    }
  },

  'CPromise.resolve': {
    'should convert object to a CPromise instance': async function () {
      let isCanceled = false;
      const thenable = {
        then() {
        },
        cancel() {
          isCanceled = true;
        }
      }

      const chain = CPromise.resolve(thenable).then(() => {
        assert.fail('not canceled');
      }, (err) => {
        assert.ok(err instanceof CanceledError, 'not a CanceledError instance');
        assert.ok(isCanceled, 'was not cancelled')
      });

      chain.cancel();

      return chain;
    },

    'generator': {
      'should resolve generator to a CPromise': function () {
        assert.ok(CPromise.resolve(function* () {
        }) instanceof CPromise);
      },

      'should resolve internal chains': async function () {
        const timestamp = Date.now();
        const time = () => Date.now() - timestamp;

        const delay = (ms, value) => new Promise(resolve => setTimeout(resolve, ms, value));

        return CPromise.resolve(function* () {
          const resolved1 = yield CPromise.delay(105, 123);
          assert.ok(time() >= 100);
          assert.equal(resolved1, 123);
          const resolved2 = yield delay(100, 456)
          assert.equal(resolved2, 456);
        });
      },

      'should reject the promise if generator thrown an error': async function () {
        const timestamp = Date.now();
        const time = () => Date.now() - timestamp;
        return CPromise.resolve(function* () {
          const timestamp = Date.now();
          const time = () => Date.now() - timestamp;
          yield CPromise.delay(105);
          throw Error('test');
        }).then(() => {
          assert.ok(time() >= 100, 'early throw detected');
          assert.fail('the generator did not throw an error')
        }, (err) => {
          assert.equal(err.message, 'test');
        })
      },

      'should support cancellation': async function () {
        let thrown = false;
        let canceledInternals = false;

        const delay = (ms) => new CPromise((resolve, reject, {onCancel}) => {
          onCancel(() => {
            canceledInternals = true;
          });
          setTimeout(resolve, ms);
        });

        const chain = CPromise.resolve(function* () {
          yield CPromise.delay(100);
          try {
            yield delay(100);
          } catch (err) {
            thrown = true;
            assert.ok(err instanceof CanceledError, 'error is not an instanceof CanceledError');
          }

          yield CPromise.delay(100);

          if (!thrown) {
            assert.fail('The canceled error was not thrown');
          }
        });

        setTimeout(() => {
          chain.cancel();
        }, 150);

        return chain;
      },

      'progress capturing': {
        'should support progress capturing': async function () {
          const expected = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1];
          let index = 0;

          const fn= CPromise.promisify(function*(){
            this.innerWeight(2);
            yield CPromise.delay(100);
            yield CPromise.delay(100);
          })

          return CPromise.resolve(function* () {
            this.innerWeight(10);
            let i = 9;
            while (--i >= 0) {
              yield CPromise.delay(100);
            }
            yield fn();
          }).progress(value => {
            assert.equal(value, expected[index], `${value}!=${expected[index]} progress tick value`);
            index++;
          });
        }
      },

      'should proxy signals': async function () {
        const chain = CPromise.resolve(function* () {
          yield new CPromise((resolve, reject, scope) => {
            scope.on('signal', (type, data) => {
              assert.equal(type, 'test');
              assert.equal(data, 123);
              resolve();
            })
          });
        });

        setTimeout(() => {
          chain.emitSignal('test', 123);
        }, 0);

        return chain;
      }
    }
  },

  'CPromise.all': {
    'should be resolved with an array of inner chain values': async function () {
      const v1 = 123;
      const v2 = 456;
      const timestamp = Date.now();
      const time = () => Date.now() - timestamp;
      return CPromise.all([
        CPromise.delay(55, v1),
        CPromise.delay(105, v2)
      ]).then((values) => {
        assert.ok(time() >= 100);
        assert.deepStrictEqual(values, [v1, v2]);
      })
    },

    'should cancel pending chains on reject': async function () {
      const message = 'test';
      let canceledCounter = 0;
      return CPromise.all([
        CPromise.reject(new Error(message)),
        makePromise(50, 123, () => canceledCounter++),
        makePromise(100, 456, () => canceledCounter++),
      ]).then(() => {
        assert.fail('does not throw');
      }, err => {
        assert.equal(err.message, message);
      }).then(() => {
        assert.equal(canceledCounter, 2);
      })
    },

    'should support concurrency': async function () {
      let pending = 0;

      return CPromise.all(function* () {
        for (let i = 0; i < 5; i++) {
          pending++;
          yield makePromise(500, i).then((v) => {
            pending--;
            assert.ok(pending < 2);
            return v;
          });
        }
      }, {concurrency: 2}).then((values) => {
        assert.deepStrictEqual(values, [0, 1, 2, 3, 4]);
      })
    },

    'should proxy signals': async function () {
      const chain = CPromise.all([
        new CPromise((resolve, reject, scope) => {
          scope.on('signal', (type, data) => {
            assert.equal(type, 'test');
            assert.equal(data, 123);
            resolve();
          })
        }),
        new CPromise((resolve, reject, scope) => {
          scope.on('signal', (type, data) => {
            assert.equal(type, 'test');
            assert.equal(data, 123);
            resolve();
          })
        })
      ]);

      setTimeout(() => {
        chain.emitSignal('test', 123);
      }, 0);

      return chain;
    }
  },

  'CPromise.race': {
    'should return a promise that fulfills or rejects as soon as one of the promises settled': async function () {
      const v1 = 123;
      const v2 = 456;
      const timestamp = Date.now();
      const time = () => Date.now() - timestamp;
      return CPromise.race([
        CPromise.delay(55, v1),
        CPromise.delay(100, v2)
      ]).then((value) => {
        assert.ok(time() >= 50 && time() < 100);
        assert.equal(value, v1);
      })
    },

    'should cancel other pending chains on settled': async function () {
      let canceledCounter = 0;
      return CPromise.race([
        makePromise(50, 123, () => canceledCounter++),
        makePromise(100, 456, () => canceledCounter++),
        makePromise(150, 789, () => canceledCounter++),
      ]).then(() => {
        assert.equal(canceledCounter, 2);
      });
    },

    'should proxy signals': async function () {
      return new Promise(resolve => {
        let counter = 0;
        const handle = () => {
          if (++counter === 2) {
            resolve();
          }
        }

        const chain = CPromise.race([
          new CPromise((resolve, reject, scope) => {
            scope.on('signal', (type, data) => {
              assert.equal(type, 'test');
              assert.equal(data, 123);
              handle();
            })
          }),
          new CPromise((resolve, reject, scope) => {
            scope.on('signal', (type, data) => {
              assert.equal(type, 'test');
              assert.equal(data, 123);
              handle();
            })
          })
        ]);

        setTimeout(() => {
          chain.emitSignal('test', 123);
        }, 0);
      });
    }
  },

  'CPromise.allSettled': {
    'should aggregate promise results into array of status objects' : async function () {
      const err = new Error('test1');
      return CPromise.allSettled([
        delay(100, 123),
        CPromise.reject(err),
        CPromise.resolve(456)
      ]).then(results => {
        assert.deepStrictEqual(results, [
          {status: 'fulfilled', value: 123},
          {status: 'rejected', reason: err},
          {status: 'fulfilled', value: 456}
        ]);
      })
    },

    'should support cancellation': async()=>{
      const chain= CPromise.allSettled([
        delay(100, 123),
        delay(500).then(()=> {
          throw Error('break');
        })
      ]).then(results => {
        assert.fail('was not cancelled');
      }, err=>{
        if(!CPromise.isCanceledError(err)){
          assert.fail(`rejected not with CancelledError`);
        }
      })

      setTimeout(()=> chain.cancel(), 200);
    }
  },

  'CPromise.on': {
    'should add new listener': function () {
      const ee = new CPromise(resolve => {
      });
      assert.equal(ee.listenersCount('test'), 0);
      ee.on('test', function () {
      });
      assert.equal(ee.listenersCount('test'), 1);
      ee.on('test', function () {
      });
      assert.equal(ee.listenersCount('test'), 2);
    }
  },

  'CPromise.off': {
    'should remove the listener': function () {
      const ee = new CPromise(resolve => {
      });
      const listener1 = function () {
      };
      const listener2 = function () {
      };
      ee.on('test', listener1);
      assert.equal(ee.listenersCount('test'), 1);
      ee.on('test', listener2);
      assert.equal(ee.listenersCount('test'), 2);
      ee.off('test', listener1);
      assert.equal(ee.listenersCount('test'), 1);
      ee.off('test', listener2);
      assert.equal(ee.listenersCount('test'), 0);
    }
  },

  'CPromise.emit': {
    'should emit the event listeners': function () {
      const ee = new CPromise(resolve => {
      });
      let invoked1, invoked2;
      const listener1 = function (...data) {
        invoked1 = true;
        assert.deepStrictEqual(data, [1, 2, 3]);
      };
      const listener2 = function (...data) {
        invoked2 = true;
        assert.deepStrictEqual(data, [1, 2, 3]);
      };
      ee.on('test', listener1);
      ee.on('test', listener2);

      ee.emit('test', 1, 2, 3);

      assert.ok(invoked1);
      assert.ok(invoked2);
    }
  },

  'CPromise.promisify': {
    'callback styled function': {
      'should handle resolving with a single argument': async function () {
        const fn = CPromise.promisify(function (arg0, cb) {
          assert.strictEqual(arg0, 123);
          setTimeout(cb, 100, undefined, 456);
        });

        assert.ok(typeof fn === 'function');

        const promise = fn(123);

        assert.ok(promise instanceof CPromise);

        return promise.then(value => {
          assert.strictEqual(value, 456);
        })
      },

      'should handle resolving with multiple arguments': async function () {
        const fn = CPromise.promisify(function (arg0, cb) {
          assert.strictEqual(arg0, 123);
          setTimeout(cb, 100, undefined, 456, 789);
        });

        assert.ok(typeof fn === 'function');

        const promise = fn(123);

        assert.ok(promise instanceof CPromise);

        return promise.then(value => {
          assert.deepStrictEqual(value, [456, 789]);
        })
      },

      'should handle a single argument as an array when multiArgs option activated': async function () {
        const fn = CPromise.promisify(function (arg0, cb) {
          assert.strictEqual(arg0, 123);
          setTimeout(cb, 100, undefined, 456);
        }, {multiArgs: true});

        assert.ok(typeof fn === 'function');

        const promise = fn(123);

        assert.ok(promise instanceof CPromise);

        return promise.then(value => {
          assert.deepStrictEqual(value, [456]);
        })
      },

      'should handle rejection': async function () {
        const fn = CPromise.promisify(function (arg0, cb) {
          assert.strictEqual(arg0, 123);
          setTimeout(cb, 100, new Error('test'));
        });

        const promise = fn(123);

        return promise.then(value => {
          assert.fail(`doesn't throw`);
        }).catch(err => {
          assert.ok(err.message, 'test');
        })
      }
    },

    'should support async function decoration': async function () {
      const fn = CPromise.promisify(async function (arg0) {
        return delay(100, 123);
      });

      const promise = fn(123);

      assert.ok(promise instanceof CPromise);

      return promise.then(value => {
        assert.deepStrictEqual(value, 123);
      })
    },

    'should support generator function decoration': async function () {
      const fn = CPromise.promisify(function* (arg0) {
        return yield delay(100, 123);
      });

      const promise = fn(123);

      assert.ok(promise instanceof CPromise);

      return promise.then(value => {
        assert.deepStrictEqual(value, 123);
      })
    },

    'should support decorator option': async function(){
      CPromise.promisify(function* (arg0) {
        assert.strictEqual(arg0, 8);
        return yield CPromise.delay(100, 123);
      }, {
        decorator: (fn, options) => {
          return function(scope, arg0, arg1){
            assert.ok(scope instanceof CPromise, 'scope is not a CPromise context');
            assert.strictEqual(options.fnType, 'generator');
            return fn(arg0 + arg1);
          };
        },
        scopeArg: true
      })(3, 5).then(v => {
        assert.strictEqual(v, 123);
      });
    }
  },

  'CPromise#done': {
    'should invoke the handler with settled values when the promise done with success or failure': async()=>{
      let counter= 0;
      const handler= (value, isRejected, scope)=>{
        assert.ok(typeof isRejected=='boolean');
        assert.ok(scope instanceof CPromise);
        counter++;
        return value;
      }
      const err= new Error('test');
      return CPromise.all([
        CPromise.delay(100, 123).done(handler),
        CPromise.reject(err).delay(100).done(handler),
      ]).then((results)=>{
        assert.strictEqual(counter, 2);
        assert.deepStrictEqual(results, [
          123,
          err
        ])
      })
    }
  },

  'CPromise#finally': {
    'should invoke the handler that will be invoked when promise settled': async()=>{
      let counter= 0;
      const handler= (value, isRejected, scope)=>{
        assert.ok(typeof isRejected=='boolean');
        assert.ok(scope instanceof CPromise);
        counter++;
      }
      const err= new Error('test');
      return CPromise.allSettled([
        CPromise.delay(100, 123).finally(handler),
        CPromise.reject(err).delay(100).finally(handler),
      ]).then((results)=>{
        assert.strictEqual(counter, 2);
        assert.deepStrictEqual(results, [
          {status: 'fulfilled', value: 123},
          {status: 'rejected', reason : err},
        ])
      })
    }
  },

  'CPromise#atomic': {
    'atomic("detached")': {
      'should protect promise chain from canceling from outside and keep it running in the background': async () => {
        let atomicChainCompleted = false;
        const chain = CPromise.delay(200, 1)
          .then(v => CPromise.delay(200, v + 2))
          .then(result => {
            atomicChainCompleted = true;
            assert.strictEqual(result, 3);
          }, err => {
            assert.fail(`Unexpected rejecting: ${err}`);
          })
          .atomic('detached')
          .then(v => CPromise.delay(1000))
          .then(v => {
            assert.fail('Unexpected resolving');
          }, err => {
            assert.ok(atomicChainCompleted === false);
            assert.ok(err instanceof CanceledError);
          })

        setTimeout(() => {
          chain.cancel();
        }, 50);

        return chain;
      }
    },

    'atomic("await")': {
      'must protect the promise chain from being canceled from the outside with waiting for it to complete': async () => {
        let atomicChainCompleted = false;
        const chain = CPromise.delay(200, 1)
          .then(v => CPromise.delay(200, v + 2))
          .then(result => {
            atomicChainCompleted = true;
            assert.strictEqual(result, 3);
          }, err => {
            assert.fail(`Unexpected rejecting: ${err}`);
          })
          .atomic('await')
          .then(v => CPromise.delay(1000))
          .then(v => {
            assert.fail('Unexpected resolving');
          }, err => {
            assert.ok(atomicChainCompleted === true);
            assert.ok(err instanceof CanceledError);
            assert.strictEqual(err.message, 'test');
          })

        setTimeout(() => {
          chain.cancel('test');
        }, 50);

        return chain;
      }
    },
  },

  'CPromise.retry': {
    'should reject if all retries failed': async () => {
      let counter = 0;
      return CPromise.retry(function* () {
        counter++;
        yield CPromise.delay(100);
        throw Error('test');
      }, {retries: 3, delay: 100}).then(() => {
        assert.fail('was not rejected');
      }, err => {
        assert.strictEqual(err.message, 'test');
        assert.strictEqual(counter, 3);
      })
    },
    'should resolve if some attempt was successful': async () => {
      let counter = 0;
      return CPromise.retry(function* () {
        counter++;
        yield CPromise.delay(100);
        if (counter < 2) {
          throw Error('test');
        }

        return 123;
      }, {retries: 3, delay: 100}).then((value) => {
        assert.strictEqual(counter, 2);
        assert.strictEqual(value, 123);
      })
    }
  },

  'CPromise.delay': {
    'progress capturing' : async()=>{
      let index= 0;
      const time= 1800;
      const tick= 500;
      const calc= (index)=> (index * tick) / time;
      const arr= [calc(1), calc(2), calc(3), 1];

      return new Promise((resolve, reject)=>{
        CPromise.run(function*(){
          yield CPromise.delay(time, undefined, {progressTick: tick});
        }).progress(v=> {
          try{
            assert.ok(Math.abs(v- arr[index])<0.1, `${v}!=${arr[index]} (${arr})`);
            index++;
          }catch(err){
            reject(err);
          }
        }).then(()=>{
          assert.strictEqual(index, 4);
        }).then(resolve, reject);
      });
    }
  }
};
