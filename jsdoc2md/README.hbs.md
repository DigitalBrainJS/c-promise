![Travis (.com)](https://img.shields.io/travis/com/DigitalBrainJS/c-promise)
[![Coverage Status](https://coveralls.io/repos/github/DigitalBrainJS/c-promise/badge.svg?branch=master)](https://coveralls.io/github/DigitalBrainJS/c-promise?branch=master)
![npm](https://img.shields.io/npm/dy/c-promise)
![David](https://img.shields.io/david/DigitalBrainJS/c-promise)

## SYNOPSIS :sparkles:

CPromise is a subclass of the Promise provided by the environment with some extra features
like cancellation, timeouts and progress capturing. 

In terms of the library **the cancellation means rejection of the deepest promise in
the chain with a special error subclass**.

It supports cancellation of the whole chain, not just a single promise.
The cancellation could be handled by the above standing chains, since it's just
throwing a special error and invoking onCancel listeners and/or notify subscribers by the signals
using AbortController (built-in implementation or native if it's available).

This lib can be used on the backend and frontend sides. 

## Why :question:

You may face with a challenge when you need to cancel some long-term asynchronous
operation before it will be completed with success or failure, just because the result
has lost its relevance to you.

## Installation :hammer:

Install for node.js using npm/yarn:

``` bash
$ npm install c-promise2
```

``` bash
$ yarn add c-promise2
```

The package consists pre-built bundles with umd, cjs, mjs versions which can be found in the `./dist/` directory

#### CDN
- [development UMD version with ](https://unpkg.com/c-promise2@0.1.0/dist/dev/c-promise.umd.js) 
(additional error handling activated)

- [production UMD version](https://unpkg.com/c-promise2@0.1.0/dist/c-promise.umd.js) (or [minified](https://unpkg.com/c-promise2@0.1.0/dist/c-promise.umd.min.js) ~9KB)

- [production CommonJS version](https://unpkg.com/c-promise2@0.1.0/dist/c-promise.cjs.js)

- [production ESM version](https://unpkg.com/c-promise2@0.1.0/dist/c-promise.mjs)

## Features / Advantages
- there are no any dependencies (except [native] Promise)
- browser support
- :fire: supports cancellation of the whole chain - rejects the deepest pending promise in the chain
- supports onCancel event handler to abort some internal work (clear timers, close requests etc.)
- supports built-in signal interface for API that supports it (like fetch method)
- proper handling of `CanceledError` errors manually thrown inside the chain
- :fire: progress capturing with result scaling to handle progress of the whole chain (including nested promise chains), useful for long-term operations
- ability to install the `weight` for each promise in the chain
- ability to attach meta info on each setting of the progress
- the `delay` method to return promise that will be resolved with the value after timeout
- static methods `all`, `race` support cancellation and will cancel all other pending promises after they resolved
- the `catch` method supports error class filtering

## Live Example

[Live browser example](https://jsfiddle.net/DigitalBrain/g0dv5L8c/5/)

[Live nodejs example](https://runkit.com/digitalbrainjs/runkit-npm-c-promise2)

<img src="http://g.recordit.co/E6e97qRPoY.gif" alt="Browser playground with fetch" width="50%" height="50%">

## Playground
- Clone https://github.com/DigitalBrainJS/c-promise.git repo
- Run npm install to install dev-dependencies
- Open playground/basic.js file with a basic example
- Run this file using npm run playground or npm run playground:watch command to see the result

## Usage example
A font-end example of wrapping fetch to the CPromise and handling cancellation using signals (AbortController)
````javascript
    function cancelableFetch(url) {
        return new CPromise((resolve, reject, {signal}) => {
            fetch(url, {signal}).then(resolve, reject);
        })
    }
    // URL with 5 seconds delay to respond
    const chain= cancelableFetch('https://run.mocky.io/v3/753aa609-65ae-4109-8f83-9cfe365290f0?mocky-delay=5s')
        .then(console.log, console.warn);

    setTimeout(()=> chain.cancel(), 1000);
````

Handling cancellation with `onCancel` listeners (see the [live demo](https://runkit.com/digitalbrainjs/runkit-npm-c-promise2)):
````javascript
import CPromise from "c-promise";

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

