const {CPromise}= require('../lib/c-promise');

function cancelableDelay(ms, value){
    return new CPromise(function(resolve, reject, {onCancel, onPause, onResume}){
        let timestamp= Date.now();
        let timeLeft;
        let timer= setTimeout(resolve, ms, value);
        onPause(()=>{
            console.log(`Pause`);
            clearTimeout(timer);
            timer=0;
            timeLeft= ms - (Date.now()- timestamp);
            timestamp= Date.now();
        });

        onResume(()=>{
            console.log(`Resume`);
            timer= setTimeout(resolve, timeLeft, value);
        });

        onCancel(()=>{
            console.log(`Cancel`);
            timer && clearTimeout(timer);
        })
    });
}

const chain= cancelableDelay(1000, 123)
    .then(
        value=> console.log(`Done:`, value),
        err=> console.warn(`Fail: ${err}`)
    );

setTimeout(()=>{
    chain.pause();

    setTimeout(()=>{
        chain.resume();
    }, 5000);
}, 100);

