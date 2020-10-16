![Travis (.com)](https://img.shields.io/travis/com/DigitalBrainJS/c-promise)
[![Coverage Status](https://coveralls.io/repos/github/DigitalBrainJS/c-promise/badge.svg?branch=master)](https://coveralls.io/github/DigitalBrainJS/c-promise?branch=master)
![npm](https://img.shields.io/npm/dm/c-promise2)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/c-promise2)
![David](https://img.shields.io/david/DigitalBrainJS/c-promise)

## SYNOPSIS :sparkles:
A Promise class built on top of the native that supports some additional features such as cancellation, timeouts, progress capturing and concurrency limit. 

In terms of the library **the cancellation means rejection with a special error subclass**.

Basic example ([Live demo](https://codesandbox.io/s/thirsty-taussig-3nqbp?file=/src/index.js)):
````javascript
const CPromise = require("c-promise2");

const delay= (ms, value)=>{
  return new CPromise((resolve, reject, {onCancel}) => {
      const timer = setTimeout(resolve, ms, value);
      onCancel(() => {
          clearTimeout(timer);
          console.log('clear timeout');
      }) // clear internal operations on 'cancel' event
  })
}

const promise = CPromise.all([
  delay(1000, 'a'),
  delay(2000, 'b'),
  delay(3000, 'c'),
  delay(4000, 'd'),
  delay(5000, 'e'),
])
  .progress(value=> console.log(`Progress: ${(value * 100).toFixed(1)}%`));

console.log('isPromise:', promise instanceof Promise); // true

(async()=>{
 try {
     console.log(`Done: `, await promise);
 }catch(err){
     console.warn(`Failed: ${err}`);
     console.log('isCanceled:', promise.isCanceled);
 }
})()

setTimeout(()=> promise.cancel(), 3100); // cancel promise after 3100ms
````
Console output:
````
isPromise: true
Progress: 20.0%
Progress: 40.0%
Progress: 60.0%
clear timeout
clear timeout
isCanceled: true
Failed: CanceledError: canceled

Process finished with exit code 0
````

This lib can be used for both backend and frontend development, no any dependencies required.

## Why :question:

You may face with a challenge when you need to cancel some long-term asynchronous
operation before it will be completed with success or failure, just because the result
has lost its relevance to you.

## Features / Advantages
- no dependencies (except [native] Promise)
- built-in `AbortController` class
- browser support
- supports two ways to make your promise internal code cancellable: 
    - `onCancel` callbacks (clear timers, abort requests)
    - `signal` provided by the [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) (to wrap API like 
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) method)
- :fire: supports cancellation of the whole chain - rejects the deepest pending promise in the chain
- :fire: supports generator to CPromise resolving (something similar like [co](https://www.npmjs.com/package/co) library does);
- :fire: progress capturing with result scaling to handle progress of the whole chain (including nested promise chains), useful for long-term operations
- `CPromise.all` supports concurrency limit. Promises can be produced by generator function on the fly.
- static `all` and `race` methods support cancellation, so the others pending promises will be canceled
 when the result promise settled
 - `delay` method to return promise that will be resolved with the value after timeout
 - ability to set the `weight` for each promise in the chain to manage the impact on chain progress
 - ability to attach meta info on each setting of the progress
- `catch` method supports error class filtering

## Live Example

This is how an abortable fetch ([live example](https://jsfiddle.net/DigitalBrain/c6njyrt9/10/)) with a timeout might look like
````javascript
function fetchWithTimeout(url, {timeout, ...fetchOptions}= {}) {
   return new CPromise((resolve, reject, {signal}) => {
      fetch(url, {...fetchOptions, signal}).then(resolve, reject)
   }, timeout)
}

const promise= fetchWithTimeout('http://localhost/', {timeout: 5000})
      .then(response => response.json())
      .then(data => console.log(`Done: `, data), err => console.log(`Error: `, err))

// setTimeout(()=> promise.cancel(), 1000); 
// you able to call cancel() at any time to cancel the entire chain at any stage
// Take into account the related network request will also be aborted
````

- [Live browser example (jsfiddle.net)](https://jsfiddle.net/DigitalBrain/g0dv5L8c/5/)

<img src="http://g.recordit.co/E6e97qRPoY.gif" alt="Browser playground with fetch" width="50%" height="50%">

- [Live nodejs example (runkit.com)](https://runkit.com/digitalbrainjs/runkit-npm-c-promise2)

- [Using generator as a promise (jsfiddle.net)](https://jsfiddle.net/DigitalBrain/mtcuf1nj/)

- [Wrapping axios request (runkit.com)](https://runkit.com/digitalbrainjs/cancel-axios)

````javascript
function cancelableGet(url){
    return new CPromise((resolve, reject, {onCancel})=>{
        axios.get(url, {
            cancelToken: new axios.CancelToken(function executor(cancel) {
                onCancel(cancel)
            })
        }).then(resolve, reject);
    });
}
````

## How it works

The deepest pending CPromise in the chain will be rejected will a `CanceledError`, 
then if the error was not caught by the user code that chain and each above standing chain emit `cancel` event. This event will be handled by
callbacks attached by `onCancel(cb)` method and/or propagate with signal from `AbortController`.
These api can be used simultaneously. The `cancel([reason])` method is synchronous and can be called any time.
If cancellation failed (the chain has been already fulfilled) it will return `false`.

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
    yield CPromise.delay(1000); // wait for 1000ms- converts to CPromise.delay(1000)
    return "It works!";
}).then(message=> console.log(`Done: ${message}`));

//chain.cancel()
````
Of course, if don't need cancellation, capture progress etc. you may use plain async functions with CPromise.
#### CDN
- [development UMD version with ](https://unpkg.com/c-promise2/dist/dev/c-promise.umd.js) 
(additional error handling activated)

- [production UMD version](https://unpkg.com/c-promise2) (or [minified](https://unpkg.com/c-promise2/dist/c-promise.umd.min.js) ~9KB)

- [production CommonJS version](https://unpkg.com/c-promise2/dist/c-promise.cjs.js)

- [production ESM version](https://unpkg.com/c-promise2/dist/c-promise.mjs)

## Playground
- Clone https://github.com/DigitalBrainJS/c-promise.git repo
- Run npm install to install dev-dependencies
- Open playground/basic.js file with a basic example
- Run this file using npm run playground or npm run playground:watch command to see the result

## Using Generators
See the [live demo](https://jsfiddle.net/DigitalBrain/mtcuf1nj/)
````javascript
import CPromise from "c-promise2";

const promise= CPromise.from(function*(x, y, z){
    this.captureProgress(4); //optionally set the expected total progress score of the chain
    yield CPromise.delay(1000); // wait for 1000ms- converts to CPromise.delay(1000)
    yield [CPromise.delay(1000), CPromise.delay(1500)] // resolve chains using CPromise.all([...chains]);
    yield [[CPromise.delay(1000), CPromise.delay(1500)]] // resolve chains using CPromise.race([...chains]);
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

