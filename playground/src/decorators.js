/*const {
    CPromise,
    async,
    listen,
    cancel,
    canceled,
    timeout,
    progress,
    innerWeight,
    E_REASON_UNMOUNTED,
    ReactComponent
}= require('../../lib/c-promise');*/

const {CPromise, ReactComponent, async, listen, cancel, E_REASON_CANCELED, timeout, atomic}= require('../../lib/c-promise');
/*
arguments = Arguments(1) [Descriptor, Accessor, Function]
 0 = Descriptor {kind: "class",
elements: Array(0),
Symbol(Symbol.toStringTag): "Descriptor"}
  kind = "class"
  elements = Array(0) []
  Symbol(Symbol.toStringTag) = "Descriptor"
  __proto__ = Object
 length = 1
 */



/*@ReactComponent(123,456)
//@decorator
class TestDecorator{
    constructor() {
        this.x= 1;
    }
}*/

//@ReactComponent
class Test {
    constructor() {
        this.value= 3000;
    }
/*    @progress((value)=> console.log(`Progress: ${value}`))
    @innerWeight(2)*/
    @timeout(function(){
        console.log(this);
        return this.value;
    })
    @listen('test')
    @atomic("detached")
    *asyncTask(delay=2000) {
        debugger;
        const result1= yield CPromise.delay(delay, 123);
        const result2= yield new CPromise((resolve, reject, {onCancel})=>{
            const timer= setTimeout(resolve, 2000);
            onCancel((reason)=>{
                console.log(`Cancel inner promise due ${reason}`);
                clearTimeout(timer);
            })
        })
        return result1 + 1;
    }
   // @async
/*    @cancel('test')

    asyncTask(delay, cb){
        console.log('delay' , delay);
        setTimeout(cb, 3000, new Error('oops'));
    }*/

    @cancel(null, 'test2')
    async cancel(){
        return CPromise.delay(1000, 123);
    }
}

const test= new Test();

test.asyncTask()
    .then(
        value => console.log(`Done: ${value}`),
        err => console.warn(`Fail: ${err}`)
    );

setTimeout(()=>{
   //cancel.call(test, 'oops', 'test');
}, 1100);


