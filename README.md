![Travis (.com)](https://img.shields.io/travis/com/DigitalBrainJS/c-promise)
[![Coverage Status](https://coveralls.io/repos/github/DigitalBrainJS/c-promise/badge.svg?branch=master)](https://coveralls.io/github/DigitalBrainJS/c-promise?branch=master)
![npm](https://img.shields.io/npm/dm/c-promise2)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/c-promise2)
![David](https://img.shields.io/david/DigitalBrainJS/c-promise)

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
- `CPromise.all` supports concurrency limit
- `CPromise.all` and `CPromise.race` methods have cancellation support, so the others nested pending promises will be canceled
 when the result promise settled
- promise suspending (using `pause` and `resume` methods)
- custom signals (`emitSignal`)
- `delay` method to return promise that will be resolved with the value after timeout
- ability to set the `weight` for each promise in the chain to manage the impact on chain progress
- ability to attach meta info on each setting of the progress
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
As an alternative you can use any CDN with npn support:
- [development UMD version with ](https://unpkg.com/c-promise2/dist/dev/c-promise.umd.js) 
(additional error handling activated)

- [production UMD version](https://unpkg.com/c-promise2) (or [minified](https://unpkg.com/c-promise2/dist/c-promise.umd.min.js) ~9KB)

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
   }, timeout)
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

## Signals handling
Every CPromise instance could handle "signals", emitted using `emitSignal` method. 
The method emits `signal` event on each pending promise in the chain until some handler returns `true` as the result.
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
Generally you can use CPromise with ES6 async functions, but if you need some specific functionality
such as progress capturing or cancellation, you need to use generators instead of async functions to make it work.
This is because the async function leads all the nested thenables into its own Promise class,
and there is nothing we can do about it.
Generators allow you to write asynchronous code just in the same way as async functions do, just use `yield` instead of `await`.

See the [live demo](https://codesandbox.io/s/happy-ganguly-t1xx8?file=/src/index.js:429-451)
````javascript
import CPromise from "c-promise2";

const promise= CPromise.from(function*(){
    this.innerWeight(12); //optionally set the expected internal progress score of the nested chain
    yield CPromise.delay(1000);
    yield [CPromise.delay(1000), CPromise.delay(1500)] // resolve chains using CPromise.all([...chains]);
    yield [[CPromise.delay(1000), CPromise.delay(1500)]] // resolve chains using CPromise.race([...chains]);
    yield new CPromise(resolve=> resolve(true)); // any thenable object will be resolved 
    return "It works!";
})
.progress(value=> console.log(`Progress: ${value}`))
.then(message=> console.log(`Done: ${message}`));
````

## Related projects
- [cp-axios](https://www.npmjs.com/package/cp-axios) - a simple axios wrapper that provides an advanced cancellation api
- [cp-fetch](https://www.npmjs.com/package/cp-fetch) - fetch with timeouts and request cancellation

## API Reference

Cancellable Promise with extra features

<a name="module_CPromise..CPromise"></a>

### CPromise~CPromise ⇐ <code>Promise</code>
CPromise class

**Kind**: inner class of [<code>CPromise</code>](#module_CPromise)  
**Extends**: <code>Promise</code>  

* [~CPromise](#module_CPromise..CPromise) ⇐ <code>Promise</code>
    * [new CPromise([executor], [options])](#new_module_CPromise..CPromise_new)
    * _instance_
        * [.signal](#module_CPromise..CPromise+signal) : <code>AbortSignal</code>
        * [.isPending](#module_CPromise..CPromise+isPending) ⇒ <code>Boolean</code>
        * [.isCanceled](#module_CPromise..CPromise+isCanceled) ⇒ <code>Boolean</code>
        * [.isCaptured](#module_CPromise..CPromise+isCaptured) ⇒ <code>Boolean</code>
        * [.isPaused](#module_CPromise..CPromise+isPaused) ⇒ <code>Boolean</code>
        * [.parent](#module_CPromise..CPromise+parent) ⇒ <code>CPromise</code> \| <code>null</code>
        * [.totalWeight([weight])](#module_CPromise..CPromise+totalWeight) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.innerWeight([weight])](#module_CPromise..CPromise+innerWeight) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.progress([value], [data])](#module_CPromise..CPromise+progress) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.propagate(type, data)](#module_CPromise..CPromise+propagate) ⇒ <code>CPromise</code>
        * [.captureProgress([options])](#module_CPromise..CPromise+captureProgress) ⇒ <code>CPromise</code>
        * [.scopes()](#module_CPromise..CPromise+scopes) ⇒ <code>Array.&lt;CPromise&gt;</code>
        * [.timeout([ms])](#module_CPromise..CPromise+timeout) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.weight([weight])](#module_CPromise..CPromise+weight) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.label([label])](#module_CPromise..CPromise+label) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.resolve(value)](#module_CPromise..CPromise+resolve) ⇒ <code>CPromise</code>
        * [.reject(err)](#module_CPromise..CPromise+reject) ⇒ <code>CPromise</code>
        * [.pause()](#module_CPromise..CPromise+pause) ⇒ <code>Boolean</code>
        * [.resume()](#module_CPromise..CPromise+resume) ⇒ <code>Boolean</code>
        * [.cancel([reason])](#module_CPromise..CPromise+cancel)
        * [.emitSignal([data], type, [handler])](#module_CPromise..CPromise+emitSignal) ⇒ <code>Boolean</code>
        * [.delay(ms)](#module_CPromise..CPromise+delay) ⇒ <code>CPromise</code>
        * [.then(onFulfilled, [onRejected])](#module_CPromise..CPromise+then) ⇒ <code>CPromise</code>
        * [.catch(onRejected, [filter])](#module_CPromise..CPromise+catch) ⇒ <code>CPromise</code>
        * [.canceled([onCanceled])](#module_CPromise..CPromise+canceled) ⇒ <code>CPromise</code>
        * [.listen(signal)](#module_CPromise..CPromise+listen) ⇒ <code>CPromise</code>
        * [.on(type, listener, [prepend])](#module_CPromise..CPromise+on) ⇒ <code>CPromise</code>
        * [.off(type, listener)](#module_CPromise..CPromise+off) ⇒ <code>CPromise</code>
        * [.listenersCount(type)](#module_CPromise..CPromise+listenersCount) ⇒ <code>Number</code>
        * [.hasListeners(type)](#module_CPromise..CPromise+hasListeners) ⇒ <code>Boolean</code>
        * [.once(type, listener)](#module_CPromise..CPromise+once) ⇒ <code>CPromise</code>
        * [.emit(type, ...args)](#module_CPromise..CPromise+emit) ⇒ <code>CPromise</code>
        * [.emitHook(type, ...args)](#module_CPromise..CPromise+emitHook) ⇒ <code>Boolean</code>
    * _static_
        * [.isCanceledError(thing)](#module_CPromise..CPromise.isCanceledError) ⇒ <code>boolean</code>
        * [.delay(ms, value)](#module_CPromise..CPromise.delay) ⇒ <code>CPromise</code>
        * [.all(iterable, options)](#module_CPromise..CPromise.all) ⇒ <code>CPromise</code>
        * [.race(thenables)](#module_CPromise..CPromise.race) ⇒ <code>CPromise</code>
        * [.allSettled(iterable, options)](#module_CPromise..CPromise.allSettled) ⇒ <code>CPromise</code>
        * [.from(thing, [resolveSignatures])](#module_CPromise..CPromise.from) ⇒ <code>CPromise</code>

<a name="new_module_CPromise..CPromise_new"></a>

#### new CPromise([executor], [options])
Creates a new CPromise instance


| Param | Type | Description |
| --- | --- | --- |
| [executor] | <code>CPromiseExecutorFn</code> | promise executor function that will be invoked in the context of the new CPromise instance |
| [options] | <code>CPromiseOptions</code> |  |

<a name="module_CPromise..CPromise+signal"></a>

#### cPromise.signal : <code>AbortSignal</code>
get promise abort signal object

**Kind**: instance property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+isPending"></a>

#### cPromise.isPending ⇒ <code>Boolean</code>
indicates if the promise is pending

**Kind**: instance property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+isCanceled"></a>

#### cPromise.isCanceled ⇒ <code>Boolean</code>
indicates if the promise is pending

**Kind**: instance property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+isCaptured"></a>

#### cPromise.isCaptured ⇒ <code>Boolean</code>
indicates if the promise progress is captured

**Kind**: instance property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+isPaused"></a>

#### cPromise.isPaused ⇒ <code>Boolean</code>
indicates if the promise is paused

**Kind**: instance property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+parent"></a>

#### cPromise.parent ⇒ <code>CPromise</code> \| <code>null</code>
get parent promise

**Kind**: instance property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+totalWeight"></a>

#### cPromise.totalWeight([weight]) ⇒ <code>Number</code> \| <code>CPromise</code>
Set or get the total weight of the inner chains

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| [weight] | <code>Number</code> | 

<a name="module_CPromise..CPromise+innerWeight"></a>

#### cPromise.innerWeight([weight]) ⇒ <code>Number</code> \| <code>CPromise</code>
Set or get the total weight of the inner chains

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| [weight] | <code>Number</code> | 

<a name="module_CPromise..CPromise+progress"></a>

#### cPromise.progress([value], [data]) ⇒ <code>Number</code> \| <code>CPromise</code>
Set promise progress

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>Number</code> | a number between [0, 1] |
| [data] | <code>\*</code> | any data to send for progress event listeners |

<a name="module_CPromise..CPromise+propagate"></a>

#### cPromise.propagate(type, data) ⇒ <code>CPromise</code>
emit propagate event that will propagate through each promise scope in the chain (bubbling)

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>String</code> \| <code>symbol</code> |  | some type to identify the data kind |
| data | <code>\*</code> | <code></code> | some data |

<a name="module_CPromise..CPromise+captureProgress"></a>

#### cPromise.captureProgress([options]) ⇒ <code>CPromise</code>
capture initial progress state of the chain

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| options.throttle | <code>Number</code> | set min interval for firing progress event |
| options.innerWeight | <code>Number</code> | set weight of the nested promises |

<a name="module_CPromise..CPromise+scopes"></a>

#### cPromise.scopes() ⇒ <code>Array.&lt;CPromise&gt;</code>
Returns all parent scopes that are in pending state

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+timeout"></a>

#### cPromise.timeout([ms]) ⇒ <code>Number</code> \| <code>CPromise</code>
timeout before the promise will be canceled

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Description |
| --- | --- | --- |
| [ms] | <code>Number</code> | timeout in ms |

<a name="module_CPromise..CPromise+weight"></a>

#### cPromise.weight([weight]) ⇒ <code>Number</code> \| <code>CPromise</code>
Sets the promise weight in progress capturing process

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  
**Returns**: <code>Number</code> \| <code>CPromise</code> - returns weight if no arguments were specified  

| Param | Type | Description |
| --- | --- | --- |
| [weight] | <code>Number</code> | any number greater or equal 0 |

<a name="module_CPromise..CPromise+label"></a>

#### cPromise.label([label]) ⇒ <code>Number</code> \| <code>CPromise</code>
Sets the promise label

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  
**Returns**: <code>Number</code> \| <code>CPromise</code> - returns weight if no arguments were specified  

| Param | Type | Description |
| --- | --- | --- |
| [label] | <code>String</code> | any string |

<a name="module_CPromise..CPromise+resolve"></a>

#### cPromise.resolve(value) ⇒ <code>CPromise</code>
Resolves the promise with given value

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param |
| --- |
| value | 

<a name="module_CPromise..CPromise+reject"></a>

#### cPromise.reject(err) ⇒ <code>CPromise</code>
Rejects the promise with given error

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param |
| --- |
| err | 

<a name="module_CPromise..CPromise+pause"></a>

#### cPromise.pause() ⇒ <code>Boolean</code>
Pause promise

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+resume"></a>

#### cPromise.resume() ⇒ <code>Boolean</code>
Resume promise

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+cancel"></a>

#### cPromise.cancel([reason])
throws the CanceledError that cause promise chain cancellation

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| [reason] | <code>String</code> \| <code>Error</code> | 

<a name="module_CPromise..CPromise+emitSignal"></a>

#### cPromise.emitSignal([data], type, [handler]) ⇒ <code>Boolean</code>
Emit a signal of the specific type

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| [data] | <code>\*</code> | 
| type | <code>Signal</code> | 
| [handler] | <code>function</code> | 

<a name="module_CPromise..CPromise+delay"></a>

#### cPromise.delay(ms) ⇒ <code>CPromise</code>
Returns a chain that will be resolved after specified timeout

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| ms | <code>Number</code> | 

<a name="module_CPromise..CPromise+then"></a>

#### cPromise.then(onFulfilled, [onRejected]) ⇒ <code>CPromise</code>
returns a CPromise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| onFulfilled | <code>onFulfilled</code> | 
| [onRejected] | <code>onRejected</code> | 

<a name="module_CPromise..CPromise+catch"></a>

#### cPromise.catch(onRejected, [filter]) ⇒ <code>CPromise</code>
Catches rejection with optionally specified Error class

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| onRejected | <code>function</code> | 
| [filter] | <code>Error</code> | 

<a name="module_CPromise..CPromise+canceled"></a>

#### cPromise.canceled([onCanceled]) ⇒ <code>CPromise</code>
Catches CancelError rejection

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| [onCanceled] | <code>function</code> | 

<a name="module_CPromise..CPromise+listen"></a>

#### cPromise.listen(signal) ⇒ <code>CPromise</code>
Listen for abort signal

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| signal | <code>AbortSignal</code> | 

<a name="module_CPromise..CPromise+on"></a>

#### cPromise.on(type, listener, [prepend]) ⇒ <code>CPromise</code>
adds a new listener

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default |
| --- | --- | --- |
| type | <code>EventType</code> |  | 
| listener | <code>function</code> |  | 
| [prepend] | <code>Boolean</code> | <code>false</code> | 

<a name="module_CPromise..CPromise+off"></a>

#### cPromise.off(type, listener) ⇒ <code>CPromise</code>
removes the listener

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| type | <code>EventType</code> | 
| listener | <code>function</code> | 

<a name="module_CPromise..CPromise+listenersCount"></a>

#### cPromise.listenersCount(type) ⇒ <code>Number</code>
returns listeners count of the specific event type

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| type | <code>EventType</code> | 

<a name="module_CPromise..CPromise+hasListeners"></a>

#### cPromise.hasListeners(type) ⇒ <code>Boolean</code>
checks if there are listeners of a specific type

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| type | <code>String</code> \| <code>Symbol</code> | 

<a name="module_CPromise..CPromise+once"></a>

#### cPromise.once(type, listener) ⇒ <code>CPromise</code>
add 'once' listener

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| type | <code>EventType</code> | 
| listener | <code>function</code> | 

<a name="module_CPromise..CPromise+emit"></a>

#### cPromise.emit(type, ...args) ⇒ <code>CPromise</code>
emits the event

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| type | <code>EventType</code> | 
| ...args |  | 

<a name="module_CPromise..CPromise+emitHook"></a>

#### cPromise.emitHook(type, ...args) ⇒ <code>Boolean</code>
Emits event as a hook. If some listener return true, this method will immediately return true as the result.Else false will be retuned

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| type | <code>EventType</code> | 
| ...args |  | 

<a name="module_CPromise..CPromise.isCanceledError"></a>

#### CPromise.isCanceledError(thing) ⇒ <code>boolean</code>
Checks if thing is an CanceledError instance

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param |
| --- |
| thing | 

<a name="module_CPromise..CPromise.delay"></a>

#### CPromise.delay(ms, value) ⇒ <code>CPromise</code>
Returns a CPromise that will be resolved after specified timeout

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>Number</code> | delay before resolve the promise with specified value |
| value |  |  |

<a name="module_CPromise..CPromise.all"></a>

#### CPromise.all(iterable, options) ⇒ <code>CPromise</code>
Returns a single CPromise that resolves to an array of the results of the input promises.If one fails then other promises will be canceled immediately

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| iterable | <code>Iterable</code> \| <code>Generator</code> \| <code>GeneratorFunction</code> | 
| options | <code>AllOptions</code> | 

**Example**  
```js
CPromise.all(function*(){    yield axios.get(url1);    yield axios.get(url2);    yield axios.get(url3);}, {concurrency: 1}).then(console.log)
```
<a name="module_CPromise..CPromise.race"></a>

#### CPromise.race(thenables) ⇒ <code>CPromise</code>
returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects,with the value or reason from that promise. Other pending promises will be canceled immediately

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| thenables | <code>Iterable</code> | 

<a name="module_CPromise..CPromise.allSettled"></a>

#### CPromise.allSettled(iterable, options) ⇒ <code>CPromise</code>
returns a promise that resolves after all of the given promises have either fulfilled or rejected

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| iterable | <code>Iterable</code> \| <code>Generator</code> \| <code>GeneratorFunction</code> | 
| options | <code>AllOptions</code> | 

<a name="module_CPromise..CPromise.from"></a>

#### CPromise.from(thing, [resolveSignatures]) ⇒ <code>CPromise</code>
Converts thing to CPromise using the following rules:- CPromise instance returns as is- Objects with special method defined with key `Symbol.for('toCPromise')` will be converted using this method  The result will be cached for future calls- Thenable wraps into a new CPromise instance, if thenable has the `cancel` method it will be used for canceling- Generator function will be resolved to CPromise- Array will be resoled via `CPromise.all`, arrays with one element (e.g. `[[1000]]`) will be resolved via `CPromise.race`This method returns null if the conversion failed.

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default |
| --- | --- | --- |
| thing | <code>\*</code> |  | 
| [resolveSignatures] | <code>boolean</code> | <code>true</code> | 

<a name="module_CPromise..EventType"></a>

### CPromise~EventType : <code>String</code> \| <code>Symbol</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise..CPromiseExecutorFn"></a>

### CPromise~CPromiseExecutorFn : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**this**: <code>CPromise</code>  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 
| scope | <code>CPromise</code> | 

<a name="module_CPromise..PromiseOptionsObject"></a>

### CPromise~PromiseOptionsObject : <code>Object</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**Properties**

| Name | Type |
| --- | --- |
| label | <code>String</code> | 
| timeout | <code>Number</code> | 
| weight | <code>Number</code> | 

<a name="module_CPromise..CPromiseOptions"></a>

### CPromise~CPromiseOptions : <code>PromiseOptionsObject</code> \| <code>String</code> \| <code>Number</code>
If value is a number it will be considered as the value for timeout optionIf value is a string it will be considered as a label

**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise..OnCancelListener"></a>

### CPromise~OnCancelListener : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type |
| --- | --- |
| reason | <code>CanceledError</code> | 

<a name="module_CPromise..OnPauseListener"></a>

### CPromise~OnPauseListener : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise..OnResumeListener"></a>

### CPromise~OnResumeListener : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise..Signal"></a>

### CPromise~Signal : <code>String</code> \| <code>Signal</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise..SignalHandler"></a>

### CPromise~SignalHandler ⇒ <code>Boolean</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**this**: <code>{CPromise}</code>  

| Param | Type |
| --- | --- |
| type | <code>Signal</code> | 
| data | <code>\*</code> | 
| scope | <code>CPromise</code> | 

<a name="module_CPromise..AllOptions"></a>

### CPromise~AllOptions : <code>object</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| concurrency | <code>number</code> | limit concurrency of promise being run simultaneously |
| mapper | <code>function</code> | function to map each element |
| ignoreResults | <code>boolean</code> | do not collect results |
| signatures | <code>boolean</code> | use advanced signatures for vales resolving |


## License

The MIT License Copyright (c) 2020 Dmitriy Mozgovoy robotshara@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

