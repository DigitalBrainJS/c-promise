![Travis (.com)](https://img.shields.io/travis/com/DigitalBrainJS/c-promise)
[![Coverage Status](https://coveralls.io/repos/github/DigitalBrainJS/c-promise/badge.svg?branch=master)](https://coveralls.io/github/DigitalBrainJS/c-promise?branch=master)
![npm](https://img.shields.io/npm/dm/c-promise2)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/c-promise2)
![David](https://img.shields.io/david/DigitalBrainJS/c-promise)

## SYNOPSIS :sparkles:

CPromise is a subclass of the Promise provided by the environment with some extra features
like cancellation, timeouts and progress capturing. 

In terms of the library **the cancellation means rejection of the deepest promise in
the chain with a special error subclass**.

**It supports cancellation of the whole chain, not just a single promise**.

This lib can be used for both backend and frontend development, no any dependencies required.

## Why :question:

You may face with a challenge when you need to cancel some long-term asynchronous
operation before it will be completed with success or failure, just because the result
has lost its relevance to you.

## Live Example

This is how an abortable fetch ([live example](https://jsfiddle.net/DigitalBrain/c6njyrt9/10/)) with a timeout might look like
````javascript
function fetchWithTimeout(url, options= {}) {
   const {timeout, ...fetchOptions}= options;
   return new CPromise((resolve, reject, {signal}) => {
      fetch(url, {...fetchOptions, signal}).then(resolve, reject)
   }, timeout)
}

const chain= fetchWithTimeout('http://localhost/', {timeout: 5000})
      .then(response => response.json())
      .then(data => console.log(`Done: `, data), err => console.log(`Error: `, err))

// setTimeout(()=> chain.cancel(), 1000); 
// you able to call cancel() at any time to cancel the entire chain at any stage
// the related network request will also be aborted
````

[Live browser example (jsfiddle.net)](https://jsfiddle.net/DigitalBrain/g0dv5L8c/5/)

[Live nodejs example (runkit.com)](https://runkit.com/digitalbrainjs/runkit-npm-c-promise2)

[Using generator as a promise (jsfiddle.net)](https://jsfiddle.net/DigitalBrain/mtcuf1nj/)

<img src="http://g.recordit.co/E6e97qRPoY.gif" alt="Browser playground with fetch" width="50%" height="50%">

## How it works

The deepest pending CPromise in the chain will be rejected will a `CanceledError`, 
then if the error was not caught by the user code that chain and each above standing chain emit `cancel` event. This event will be handled by
callbacks attached by `onCancel(cb)` method and/or propagate with signal from `AbortController`.
These api can be used simultaneously. The `cancel([reason])` method is synchronous and can be called any time.
If cancellation failed (the chain has been already fulfilled) it will return `false`.

## Features / Advantages
- there are no any dependencies (except [native] Promise)
- browser support
- :fire: supports cancellation of the whole chain - rejects the deepest pending promise in the chain
- supports onCancel event handler to abort some internal work (clear timers, close requests etc.)
- supports built-in signal interface for API that supports it (like fetch method)
- :fire: supports generator to CPromise resolving (something similar like [co](https://www.npmjs.com/package/co) library does);
- proper handling of `CanceledError` errors manually thrown inside the chain
- :fire: progress capturing with result scaling to handle progress of the whole chain (including nested promise chains), useful for long-term operations
- ability to install the `weight` for each promise in the chain
- ability to attach meta info on each setting of the progress
- the `delay` method to return promise that will be resolved with the value after timeout
- static methods `all`, `race` support cancellation and will cancel all other pending
 promises after the result promise settled
- the `catch` method supports error class filtering

## Installation :hammer:

- Install for node.js using npm/yarn:

```bash
$ npm install c-promise2
```

```bash
$ yarn add c-promise2
```

The package consists pre-built bundles with umd, cjs, mjs versions which can be found in the `./dist/` directory

- Import the library:

````javascript
import CPromise from "c-promise2";
// const CPromise = require("c-promise2"); // using require
// import CPromise from "c-promise2/dev"; // development version
    
const chain= CPromise.delay(1000, 'It works!').then(message => console.log('Done', message));

//chain.cancel();
````
You can use generators as a replacement for async:
````javascript
import CPromise from "c-promise2";

const chain= CPromise.from(function*(){
    yield 1000; // wait for 1000ms- converts to CPromise.delay(1000)
    return "It works!";
}).then(message=> console.log(`Done: ${message}`));

//chain.cancel()
````
Of course, if don't need cancellation, capture progress etc. you may use plain async functions with CPromise.
#### CDN
- [development UMD version with ](https://unpkg.com/c-promise2@0.1.0/dist/dev/c-promise.umd.js) 
(additional error handling activated)

- [production UMD version](https://unpkg.com/c-promise2@0.1.0/dist/c-promise.umd.js) (or [minified](https://unpkg.com/c-promise2@0.1.0/dist/c-promise.umd.min.js) ~9KB)

- [production CommonJS version](https://unpkg.com/c-promise2@0.1.0/dist/c-promise.cjs.js)

- [production ESM version](https://unpkg.com/c-promise2@0.1.0/dist/c-promise.mjs)

## Playground
- Clone https://github.com/DigitalBrainJS/c-promise.git repo
- Run npm install to install dev-dependencies
- Open playground/basic.js file with a basic example
- Run this file using npm run playground or npm run playground:watch command to see the result

## Usage example
Handling cancellation with `onCancel` listeners (see the [live demo](https://runkit.com/digitalbrainjs/runkit-npm-c-promise2)):
````javascript
import CPromise from "c-promise2";

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

//setTimeout(()=> chain.cancel(), 3500); // Close the chain after 3500ms

````
The output of the code above:
```
Is pending: true
Is canceled: false
[1003ms] Pending progress 0.2 (first chain)
[2004ms] Pending progress 0.4 (second chain)
[3004ms] Pending progress 0.6 (third chain)
[4004ms] Pending progress 0.8 (fourth chain)
[5006ms] Pending progress 1 (fifth chain)
[5006ms] Done with value '5'
Is pending: false
Is canceled: false

Process finished with exit code 0
```
Uncomment the last line to cancel the chain after 3500ms. The output will be as follows:
```
Is pending: true
Is canceled: false
[1002ms] Pending progress 0.2 (first chain)
[2003ms] Pending progress 0.4 (second chain)
[3004ms] Pending progress 0.6 (third chain)
[3508ms] clearTimeout
[3509ms] cancelled with error : CanceledError: canceled on 'inner chain'
Is pending: false
Is canceled: true

Process finished with exit code 0
```

## Using Generators
See the [live demo](https://jsfiddle.net/DigitalBrain/mtcuf1nj/)
````javascript
import CPromise from "c-promise2";

const promise= CPromise.from(function*(x, y, z){
    this.captureProgress(4); //optionally set the expected total progress score of the chain
    yield 1000; // wait for 1000ms- converts to CPromise.delay(1000)
    yield [1000, 1500] // resolve chains using CPromise.all([...chains]);
    yield [[1000, 1500]] // resolve chains using CPromise.race([...chains]);
    const status= yield new Promise(resolve=> resolve(true)); // any thenable object will be resolved
    return "It works!"; //return statement supports resolving only thenable objects ot plain values
}, [1, 2, 3]).then(message=> console.log(`Done: ${message}`));
````

## API Reference

{{#module name="CPromise"}}
{{>body}}
{{>member-index~}}
{{>separator~}}
{{>members~}}
{{/module}}

## License

The MIT License Copyright (c) 2020 Dmitriy Mozgovoy robotshara@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

