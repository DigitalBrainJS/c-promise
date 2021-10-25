[![Build Status](https://travis-ci.com/DigitalBrainJS/c-promise.svg?branch=master)](https://travis-ci.com/DigitalBrainJS/c-promise)
[![Coverage Status](https://coveralls.io/repos/github/DigitalBrainJS/c-promise/badge.svg?branch=master)](https://coveralls.io/github/DigitalBrainJS/c-promise?branch=master)
![npm](https://img.shields.io/npm/dm/c-promise2)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/c-promise2)
![David](https://img.shields.io/david/DigitalBrainJS/c-promise)
[![Stars](https://badgen.net/github/stars/DigitalBrainJS/c-promise)](https://github.com/DigitalBrainJS/c-promise/stargazers)

## CPromise2

This lib provides `CPromise` class - an advanced version of the built-in Promise that supports:
- deep cancellation **through rejection**. All static methods like `all`/`race`/`allSettled` support cancellation.
- `all` & `allSettled` method support concurrency limitation and generators as promise producers
- advanced progress capturing
- flat async code writing using `generators/yield` as an alternative of `async/await`
- event data flows (upstream & downstream)
- `pause` & `resume` ability
- timeouts
- retries
- `AbortController` support (providing & subscribing for multiple signals sources)
- atomic subchains - such chains will be completed if the execution has been started, even if its upper chain received a Cancel signal.

## Installation :hammer:

npm:
```bash
$ npm install c-promise2
```
yarn:
```bash
$ yarn add c-promise2
```
CDN:
- [production UMD version](https://unpkg.com/c-promise2) 
(or [minified](https://unpkg.com/c-promise2/dist/c-promise.umd.min.js) ~11KB) - provides the CPromise class 
as the default export, other exports values declared as static properties

- [production CommonJS version](https://unpkg.com/c-promise2/dist/c-promise.cjs.js)

- [production ESM version](https://unpkg.com/c-promise2/dist/c-promise.mjs)

### Quick start

- Import CPromise class:

````js
import { CPromise } from "c-promise2";
````

- Use `CPromise` constructor instead of `Promise`. To terminate internal async tasks (timers, request, streams etc.) gracefully subscribe your cleanup handler with `onCancel(handler)`:

````js
const doTask = (ms)=>{
  return CPromise((resolve, reject, {onCancel})=>{
    const timer= setTimeout(resolve, ms, "myValue");
    onCancel(()=> clearTimeout(timer));
  });
}

const promise = doTask(1000).then(console.log);
````

Or/and turn generators to async functions with `CPromise.promisify` to write cancellable async code in flat style:
````js
const doTask = CPromise.promisify(function*(ms){
  yield CPromise.delay(ms);
  return "myValue";
});

const promise = doTask(1000).then(console.log);
````
- Call `promise.cancel([reason])` to cancel pending promise chain by rejecting the deepest
pending promise in the chain with a special `CanceledError` reason:
````js
promise.cancel("My bad");
````

### Basic example

#### Building plain CPromise chains using `then`
[Codesandbox Live Demo](https://codesandbox.io/s/c-promise2-readme-basic1-7d8u0)
````javascript
import { CPromise } from "c-promise2";

const promise= new CPromise((resolve, reject, {onCancel, onPause, onResume})=>{
    onCancel(()=>{
        //optionally some code here to abort your long-term task (abort request, stop timers etc.)
    });
}).then(
    value => console.log(`Done: ${value}`), 
    (err, scope) => {
        console.warn(`Failed: ${err}`); // Failed: CanceledError: canceled
        console.log('chain isCanceled:', promise.isCanceled); // true
        console.log('promise isCanceled:', scope.isCanceled); // true
    }
);

console.log('isPromise:', promise instanceof Promise); // true

setTimeout(()=> promise.cancel(), 1000);
````

Log:
````
isPromise: true
Failed: CanceledError: canceled 
chain isCanceled: true
promise isCanceled: true
````

#### Writing flat code using generators

[Codesandbox Live Demo](https://codesandbox.io/s/cpromise-readme-flat-code1-forked-cg4ch?file=/src/index.js)

````javascript
import { CPromise } from "c-promise2";

const sayHello = CPromise.promisify(function* (v) {
  for (let i = 0; i < 3; i++) {
    console.log(`Hello [${i}]`);
    yield CPromise.delay(1000);
  }
  return v + 1;
});

const p = sayHello(5)
  .then(function* (v) {
    console.log(`Then`);
    yield CPromise.delay(1000);
    return v + 1;
  })
  .then((v) => console.log(`Done: ${v}`));

// setTimeout(() => p.cancel(), 1000); stop trying
````

#### Abortable fetch with timeout

This is how an abortable fetch ([live example](https://jsfiddle.net/DigitalBrain/c6njyrt9/10/)) with a timeout might look like
````javascript
function fetchWithTimeout(url, {timeout, ...fetchOptions}= {}) {
   return new CPromise((resolve, reject, {signal}) => {
      fetch(url, {...fetchOptions, signal}).then(resolve, reject)
   }, {timeout, nativeController: true})
}

const promise= fetchWithTimeout('http://localhost/', {timeout: 5000})
      .then(response => response.json())
      .then(data => console.log(`Done: `, data), err => console.log(`Error: `, err))

setTimeout(()=> promise.cancel(), 1000); 

// you able to call cancel() at any time to cancel the entire chain at any stage
// the related network request will also be aborted
````

#### Note

You can use the [cp-fetch](https://www.npmjs.com/package/cp-fetch) which provides a ready to use 
CPromise wrapper for cross-platform fetch API, or [cp-axios](https://www.npmjs.com/package/cp-axios) wrapper for `axios` with powers of CPromise.

## `.then` method behavior notes

The behavior of the method is slightly different from native Promise. 
In the case when you cancel the chain after it has been resolved within one eventloop tick,
`onRejected` will be called with a `CanceledError` instance, instead of `onFulfilled`.
This prevents the execution of unwanted code in the next eventloop tick if 
the user canceled the promise immediately after the promise was resolved,
 during the same eventloop tick.

## Ecosystem
#### React
* [use-async-effect2](https://www.npmjs.com/package/use-async-effect2) - feature-rich React async hooks that built on top of the cancellable promises ([CPromise](https://www.npmjs.com/package/c-promise2))

#### Data fetching
* [cp-axios](https://www.npmjs.com/package/cp-axios) - axios cancellable wrapper that supports CPromise context. Can be directly used in [use-async-effect2](https://www.npmjs.com/package/use-async-effect2) or general CPromise context
* [cp-fetch](https://www.npmjs.com/package/cp-fetch) - cross-platform fetch wrapper that can be used in cooperation with [use-async-effect2](https://www.npmjs.com/package/use-async-effect2) or general [CPromise](https://www.npmjs.com/package/c-promise2) chains

#### Backend
* [cp-koa](https://www.npmjs.com/package/cp-koa) - a wrapper for [`koa`](https://www.npmjs.com/package/koa) that adds cancellable middlewares/routes to the framework

## Learn more

See [CPromise wiki](https://github.com/DigitalBrainJS/c-promise/wiki)

## API Reference

JSDoc autogenerated [API Reference](https://github.com/DigitalBrainJS/c-promise/blob/master/API.md)

## License

The MIT License Copyright (c) 2020 Dmitriy Mozgovoy robotshara@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
