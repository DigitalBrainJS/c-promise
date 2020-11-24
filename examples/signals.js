const CPromise= require('../lib/c-promise');

const chain= new CPromise((resolve, reject, scope)=>{
    scope.on('signal', (type, data) => {
        if (type === 'inc') { // ignore other signal types
            console.log(`Signal ${type} handled`);
            resolve(data.x + 1);
            return true; // we accepted this signal, we should return `true` to stop the propagation
        }
    });
}).then(
    (value)=> console.log(`Done: ${value}`),
    (err)=> console.log(`Failed: ${err}`)
)

setTimeout(() => {
    // returns true
    console.log(`Inc signal result: ${chain.emitSignal('inc', {x: 2})}`);
    // returns false because there are no handlers to catch this signal type
    console.log(`Custom signal result: ${chain.emitSignal('custom')}`);
});

