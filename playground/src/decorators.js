const {
    CPromise,
    async,
    listen,
    cancel,
    timeout,
    E_REASON_DISPOSED
}= require('../../lib/c-promise');


class Test {
    @timeout(2000)
    @listen
    @async
    *asyncTask(delay) {
        const result1= yield CPromise.delay(delay, 123);
        const result2= yield new CPromise((resolve, reject, {onCancel})=>{
            const timer= setTimeout(resolve, 1000);
            onCancel((reason)=>{
                console.log(`Cancel inner promise due ${reason}`);
                clearTimeout(timer);
            })
        })
        return result1 + 1;
    }

    @cancel(E_REASON_DISPOSED)
    async asyncTask2(delay){
        return CPromise.delay(delay, 123);
    }
}

const test= new Test();

test.asyncTask(1000)
    .then(
        value => console.log(`Done: ${value}`),
        err => console.warn(`Fail: ${err}`)
    );

setTimeout(()=>{
    test.asyncTask2(1000);
}, 1100);


class Component{
    @canceled((err)=>{

    })
    @async()
    *test(){
        console.log('this', this);
    }
}

const c= new Component();

c.test().then(console.log);
