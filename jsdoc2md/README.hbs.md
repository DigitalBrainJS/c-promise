![Travis (.com)](https://img.shields.io/travis/com/DigitalBrainJS/c-promise)
[![Coverage Status](https://coveralls.io/repos/github/DigitalBrainJS/c-promise/badge.svg?branch=master)](https://coveralls.io/github/DigitalBrainJS/c-promise?branch=master)
![npm](https://img.shields.io/npm/dm/c-promise2)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/c-promise2)
![David](https://img.shields.io/david/DigitalBrainJS/c-promise)
[![Stars](https://badgen.net/github/stars/DigitalBrainJS/c-promise)](https://github.com/DigitalBrainJS/c-promise/stargazers)

## Table of contents
- [SYNOPSIS](#synopsis-sparkles)
- [Why](#why-question)
- [Features](#features)
- [Installation](#installation-hammer)
- Examples:
    - [cancellation & progress capturing](#progress-capturing-and-cancellation)
    - [pause & resume promise](#pause--resume-promises)
    - [concurrent limitation](#concurrency-limitation)
    - [abortable fetch with timeout](#abortable-fetch-with-timeout)
    - [wrapping axios request](#wrapping-axios-request)
    - [**using with React**](#using-with-react)
- [Signals handling](#signals-handling)
- [Using generators](#using-generators-as-an-alternative-of-ecma-async-functions)    
- [Using decorators](#using-decorators)    
    - [@async](#asynctimeout-number)
    - [@listen](#listensignal-abortsignalstringsymbol)
    - [@cancel](#cancelreason-string-signal-abortsignalstringsymbol)
    - [@canceled](#canceledonrejectederr-scope-context-function)
    - [@timeout](#timeoutms-number)
    - [@innerWeight](#innerweightweight-number)
    - [@label](#labellabel-string)
- [Related projects](#related-projects) 
- [API Reference](#api-reference)
- [License](#license)   


## SYNOPSIS :sparkles:

CPromise library provides an advanced version of the built-in Promise by subclassing.
You might be interested in using it if you need:
- cancel the promise (including nested)
- capture progress
- pause the promise
- pending timeout
- concurrent limit for `all` and `allSettled` methods with `mapper` reducer
- auto canceling internal async jobs of your React components 
- advanced signal communication

In terms of the library **the cancellation means rejection with a special error subclass**.

````javascript
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


## Why :question:

You may run into a problem when you need to cancel some long-term asynchronous
operation before it will be completed with success or failure, just because the result
has lost its relevance to you.

## Features
- no dependencies (except [native] Promise)
- built-in `AbortController` class
- browser support
- supports two ways to make your promise internal code cancellable: 
    - `onCancel` callbacks (clear timers, abort requests)
    - `signal` provided by the [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) (to wrap API like 
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) method)
- :fire: supports cancellation of the whole chain
- :fire: supports generator to CPromise resolving (something similar like [co](https://www.npmjs.com/package/co) library does);
- :fire: progress capturing support
- :fire: pretty awesome isomorphic decorators, with both specification support
- `CPromise.all` supports concurrency limit
- `CPromise.all` and `CPromise.race` methods have cancellation support, so the others nested pending promises will be canceled
 when the resulting promise settled
- promise suspending (using `pause` and `resume` methods)
- custom signals (`emitSignal`)
- `delay` method to return a promise that will be resolved with the value after a timeout
- ability to set the `weight` for each promise in the chain to manage the impact on chain progress
- ability to attach meta info on each set of the progress
- `catch` method supports error class filtering
- Supports listening to multiple `AbortController` signals

## Installation :hammer:

- Install for node.js using npm/yarn:

```bash
$ npm install c-promise2
```

```bash
$ yarn add c-promise2
```

The package consists pre-built bundles for umd, cjs, mjs versions which can be found in the `./dist/` directory

- Import the library:

````javascript
import CPromise from "c-promise2";
// const CPromise = require("c-promise2"); // using require
// import CPromise from "c-promise2/dev"; // development version
    
const chain= CPromise.delay(1000, 'It works!').then(message => console.log('Done', message));

//chain.cancel();
````
As an alternative you can use any CDN with npm support:

- [production UMD version](https://unpkg.com/c-promise2) 
(or [minified](https://unpkg.com/c-promise2/dist/c-promise.umd.min.js) ~9KB) - provides the CPromise class 
as the default export, other exports values declared as static properties

- [production CommonJS version](https://unpkg.com/c-promise2/dist/c-promise.cjs.js)

- [production ESM version](https://unpkg.com/c-promise2/dist/c-promise.mjs)

### Examples
#### Progress capturing and cancellation
Basic example ([Live demo](https://codesandbox.io/s/thirsty-taussig-3nqbp?file=/src/index.js)):
````javascript
import CPromise from 'c-promise';

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

setTimeout(()=> promise.cancel(), 3100); // cancel the promise after 3100ms
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

#### Pause / resume promises
See [the live demo](https://codesandbox.io/s/intelligent-bird-oe2n1?file=/src/index.js)
````javascript
import CPromise from 'c-promise';

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
You can use the [cp-fetch package](https://www.npmjs.com/package/cp-fetch) which provides a CPromise wrapper for fetch API.

- [Live browser example (jsfiddle.net)](https://jsfiddle.net/DigitalBrain/g0dv5L8c/5/)

![Demo](https://raw.githubusercontent.com/DigitalBrainJS/c-promise/master/public/demo.gif)

- [Live nodejs example (runkit.com)](https://runkit.com/digitalbrainjs/runkit-npm-c-promise2)

- [Using generator as a promise (jsfiddle.net)](https://jsfiddle.net/DigitalBrain/mtcuf1nj/)

#### Wrapping axios request
- [Wrapping axios request (runkit.com)](https://runkit.com/digitalbrainjs/cancel-axios)

````javascript
function cancelableAxios(url){
    return new CPromise((resolve, reject, {onCancel})=>{
        axios.get(url, {
            cancelToken: new axios.CancelToken(function executor(cancel) {
                onCancel(cancel)
            })
        }).then(resolve, reject);
    });
}
````
You can use the [cp-axios package](https://www.npmjs.com/package/cp-axios) to get Axios to work with CPromise.

### Concurrency limitation:
````javascript
import CPromise from "c-promise2";
import cpFetch from "cp-fetch";

(async()=>{
    await CPromise.all([
        'url1',
        'url2',
        'url3',
        'url4',
        'url5',
        'url6',
    ], {
        mapper: async (url) => {
            return cpFetch(url);
        },
        concurrency: 2
    })
    console.log('Done');
});

// Or

(async()=>{
    await CPromise.all(function*(){
        const urls= [
           'url1',
           'url2',
           'url3',
           'url4',
           'url5',
           'url6',
        ];
        for(let url of urls){
            yield cpFetch('url1');
        }
    }, {
        concurrency: 2
    })
    console.log('Done');
})();
````

#### Using with React
Check out this [live demo](https://codesandbox.io/s/infallible-ardinghelli-7r6o8?file=/src/App.js)
````jsx
 import CPromise from "c-promise2";
 import cFetch from "cp-fetch";

 export class AsyncComponent extends React.Component {
 state = {};

 async componentDidMount() {
    console.log("mounted");
    this.controller = new CPromise.AbortController();
    try {
      const json = await this.myAsyncTask(
        "https://run.mocky.io/v3/7b038025-fc5f-4564-90eb-4373f0721822"
      );
      console.log("json:", json);
      await this.myAsyncTaskWithDelay(1000, 123); // just another async task
      this.setState({ text: JSON.stringify(json) });
    } catch (err) {
      if (CPromise.isCanceledError(err)) {
        console.log("tasks terminated");
      }
    }
  }

  myAsyncTask(url) {
    return CPromise.from(function* () {
      const response = yield cFetch(url); // cancellable request
      // some another promises here
      return yield response.json();
    }).listen(this.controller.signal);
  }

  // another one cancellable async task
  myAsyncTaskWithDelay(ms, value) {
    return new CPromise((resolve, reject, { onCancel }) => {
      const timer = setTimeout(resolve, ms, value);
      onCancel(() => {
        console.log("timeout cleared");
        clearTimeout(timer);
      });
    }).listen(this.controller.signal);
  }

  render() {
    return (
      <div>
        AsyncComponent: <span>{this.state.text}</span>
      </div>
    );
  }
  componentWillUnmount() {
    console.log("unmounted");
    this.controller.abort(); // kill all tasks
  }
}
````
Using hooks and CPromise `cancel` method [Live Demo](https://codesandbox.io/s/react-cpromise-fetch-kydim?file=/src/MyComponent.js):
````jsx
import React, { useEffect, useState } from "react";
import CPromise from "c-promise2";
import cpFetch from "cp-fetch";

function MyComponent(props) {
    const [text, setText] = useState("fetching...");

    useEffect(() => {
        console.log("mount");
        const promise = cpFetch(props.url)
            .then((response) => response.json())
            .then((value) => CPromise.delay(1000, value))
            .then((json) => setText(`Success: ${JSON.stringify(json)}`))
            .canceled() // catch CanceledError
            .catch((err) => {
                setText(`Failed: ${err}`);
            });

        return () => {
            console.log("unmount");
            promise.cancel();
        };
    }, [props.url]);

    return <p>{text}</p>;
}

````

## Signals handling
Every CPromise instance can handle "signals", emitted using `emitSignal` method. 
The method emits a `signal` event on each pending promise in the chain until some handler returns `true` as the result.
This method is used internally for predefined system signals for cancellation and suspending actions.

[Live demo](https://codesandbox.io/s/dank-https-sqruh?file=/src/index.js)
````javascript
const CPromise= require('../lib/c-promise');

const chain= new CPromise((resolve, reject, scope)=>{
    scope.on('signal', (type, data) => {
        if (type === 'inc') { // ignore other signal types
            console.log(`Signal ${type} handled`);
            resolve(data.x + 1);
            return true; // we have accepted this signal, so we should return `true` to stop the propagation
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
````
Console output:
````
Signal inc handled
Inc signal result: true
Custom signal result: false
Done: 3

Process finished with exit code 0
````
## Using Generators as an alternative of ECMA async functions 
Generally, you able to use CPromise with ES6 async functions, 
but if you need some specific functionality such as progress capturing or cancellation,
you need to use generators instead of async functions to make it work. 
This is because the async function leads all the nested thenables into its own Promise class,
and there is nothing we can do about it. Generators allow you to write asynchronous code 
just in the same way as async functions do, just use `yield` instead of `await`.
See the [live demo](https://codesandbox.io/s/happy-ganguly-t1xx8?file=/src/index.js:429-451)
````javascript
import CPromise from "c-promise2";

const promise= CPromise.from(function*(){
    this.innerWeight(12); //optionally set the expected internal progress score of the nested chain
    yield CPromise.delay(1000);
    yield [CPromise.delay(1000), CPromise.delay(1500)] // resolve chains using CPromise.all([...chains]);
    yield [[CPromise.delay(1000), CPromise.delay(1500)]] // resolve chains using CPromise.race([...chains]);
    yield new Promise.resolve(); // any thenable object will be resolved 
    return "It works!";
})
.progress(value=> console.log(`Progress: ${value}`))
.then(message=> console.log(`Done: ${message}`));
````
`Then` method also supports generators as callback function
````javascript
CPromise.resolve().then(function*(){
    const value1= yield CPromise.delay(3000, 3);
    // Run promises in parallel using CPromise.all (shortcut syntax)
    const [value2, value3]= yield [CPromise.delay(3000, 4), CPromise.delay(3000, 5)]
    return value1 + value2 + value3;
}).then(value=>{
    console.log(`Done: ${value}`); // Done: 12
}, err=>{
    console.log(`Failed: ${err}`);
})
````

## Using decorators

The library supports a few types of decorators to make your code cleaner. 
All decorators are isomorphic- `@async` and `@async()` are totally equal.
Also, they support both current and legacy decorator's specification.

### @async([{timeout?: Number}])
Wraps a generator function into an async function, that returns CPromise instance.
````javascript
import CPromise from 'c-promise2';
const {async}= CPromise;

class Test{
    @async
    *asyncMethod(x, y){
        const z= yield CPromise.delay(1000);
        return x + y + z;
    }  
}

const test= new Test();

const promise= test.asyncMethod(1, 2);

console.log(promise instanceof CPromise); // true

promise.then(value=> console.log(`Done: ${value}`), err=> console.warn(`Fail: ${err}`));

setTimeout(()=> promise.cancel(), 500);
````

### @listen([signal: AbortSignal|String|Symbol])
Subscribe the CPromise async function to the AbortController signal. 
If the first argument is String or Symbol it will be considered as controller id, 
created internally in context of the class.
If this argument not specified or null, the internal default AbortController will be used.

### @cancel([reason: String], [signal: AbortSignal|String|Symbol])
Emits the cancel signal before the target function invoking.

### @canceled([onRejected(err, scope, context): Function])
Catches rejections with CanceledError errors

````javascript
import cpFetch from "cpFetch";

class Test{
    constructor(url) {
        this.fetchJSON(url).then(json=>{
            this.json= json;
            // working with json;
        })
    }

    @timeout(10000)
    @listen
    @async
    *fetchJSON(url){
        const response= yield cpFetch(url);
        return yield response.json();
    }  
    
    @cancel(E_REASON_DISPOSED)
    destroy(){
        // your code here
    }
}
````

### @timeout(ms: Number)
Sets the timeout option for the CPromise async function.

### @innerWeight(weight: Number)
Sets the innerWeight option for the CPromise async function.

### @label(label: String)
Sets the label option for the CPromise async function.

## Related projects
- [cp-axios](https://www.npmjs.com/package/cp-axios) - a simple axios wrapper that provides an advanced cancellation api
- [cp-fetch](https://www.npmjs.com/package/cp-fetch) - fetch with timeouts and request cancellation

## API Reference

{{#module name="CPromise"}}
{{>body}}
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

