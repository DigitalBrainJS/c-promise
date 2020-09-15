const CPromise = require('../../lib/c-promise');

const count= 50000;
const heapCycles = [];
const pushStat = () => heapCycles.push((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) * 1);

const generatorFn = function* () {
    this.captureProgress(count)
    let i = count;
    while (--i > 0) {
        yield 0;
    }
}

global.gc();

function analyze() {
    const calcAvg = (start, end) => {
        const data = heapCycles.slice(start, end);
        return data.reduce((prev, value) => prev + value, 0) / data.length;
    }
    const {length} = heapCycles;
    const avg = calcAvg(length * 0.2);
    const trend= calcAvg(-length * 0.2) - avg;
    let trendValue= (trend*100).toFixed(2);
    if (trendValue) {
        trendValue = '+' + trendValue;
    }

    console.log(
        `Chains created & disposed: ${count}\n` +
        `Average memory consummation: ${avg.toFixed(1)} MB\n` +
        `Min: ${Math.min.apply(null, heapCycles)} MB\n` +
        `Max: ${Math.max.apply(null, heapCycles)} MB\n`
    );
    if (trend > 0.01) {
        console.warn(`Memory leakage detected: ${trendValue}%`);
        process.exit(1);
    }

    console.log(`Memory leakage not detected: ${trendValue}% ${trend}`);
}

console.log(`Resolve generator with ${count} chains`);
const chain = CPromise.from(generatorFn).throttleProgress(1500).progress(value => {
    global.gc();
    pushStat();
    console.warn(`Progress [${value}] [${heapCycles}]`);
}).then(() => {
    analyze();
});
