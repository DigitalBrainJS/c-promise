const CPromise= require('../lib/c-promise');

const timestamp= Date.now();

function log(message, ...values){
    console.log(`[${Date.now()- timestamp}ms] ${message}`, ...values);
}

const delay= (ms, value)=>{
    return new CPromise((resolve, reject, {onCancel}) => {
        const timer = setTimeout(resolve, ms, value);

        onCancel(() => {
            log(`clearTimeout`);
            clearTimeout(timer);
        })
    })
}

const chain = delay(1000, 1).label('first chain')
    .then((value)=> delay(1000, value + 1)).label('second chain')
    .then((value)=> delay(1000, value + 1)).label('third chain')
    .then((value)=> delay(1000, value + 1).label('inner chain')).label('fourth chain')
    .then((value)=> delay(1000, value + 1)).label('fifth chain')
    .progress((value, scope)=> log(`Pending progress ${value} (${scope.label()})`));

const echoChainState= ()=>console.log(`Is pending: ${chain.isPending}\nIs canceled: ${chain.isCanceled}`);

echoChainState();

chain
    .then((value) => {
        log(`Done with value '${value}'`); // [1006ms] CanceledError: canceled
    }).label('final')
    .catch((err)=>{
        log(`cancelled with error : ${err} on '${err.scope.label()}'`); // [1006ms] CanceledError: canceled
    }, CPromise.CanceledError)
    .catch(err=>{
        log(`Some other error occurred: ${err}`);
    })
    .finally(() => {
        echoChainState();
    });


setTimeout(()=> chain.cancel(), 3500); // Close the chain after 1000ms
