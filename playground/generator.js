const CPromise= require('../lib/c-promise');

const timestamp= Date.now();

function log(message, ...values){
    console.log(`[${Date.now()- timestamp}ms] ${message}`, ...values);
}

function fetchWithTimeout(url, options= {}) {
    const {timeout, ...fetchOptions}= options;
    return new CPromise((resolve, reject, {signal}) => {
        fetch(url, {...fetchOptions, signal}).then(resolve, reject)
    }, timeout)
}

const chain= CPromise.from(function*(url){
    const response= yield fetchWithTimeout(url); // fetch movie info
    const json= response.json();
    console.log(`Json: `, json);
    let i= 10;
    while (--i > 0) {
        yield i * 100; //wait (i * 100)ms
        console.log(`Iteration ${i}`);
    }
    return json.name;
}, ["https://run.mocky.io/v3/753aa609-65ae-4109-8f83-9cfe365290f0?mocky-delay=5s"])
    .progress(value=> log(`Progress: ${value}`))
    .then(value=> log(`Done: ${value}`), err=> log(`Error: ${err}`));

//chain.cancel();//
