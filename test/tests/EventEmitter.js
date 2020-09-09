const assert= require('assert');
const {TinyEventEmitter} = require( '../../lib/tiny-event-emitter');

module.exports = {
    on: {
        'should add new listener': function () {
            const ee= new TinyEventEmitter();
            assert.equal(ee.listenersCount('test'), 0);
            ee.on('test', function(){});
            assert.equal(ee.listenersCount('test'), 1);
            ee.on('test', function(){});
            assert.equal(ee.listenersCount('test'), 2);
        }
    },

    off: {
        'should remove the listener': function () {
            const ee= new TinyEventEmitter();
            const listener1= function(){};
            const listener2= function(){};
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

    emit: {
        'should emit the event listeners': function () {
            const ee= new TinyEventEmitter();
            let invoked1, invoked2;
            const listener1= function(...data){
                invoked1= true;
                assert.deepStrictEqual(data, [1, 2, 3]);
            };
            const listener2= function(...data){
                invoked2= true;
                assert.deepStrictEqual(data, [1, 2, 3]);
            };
            ee.on('test', listener1);
            ee.on('test', listener2);

            ee.emit('test', 1, 2, 3);

            assert.ok(invoked1);
            assert.ok(invoked2);
        }
    },
}
