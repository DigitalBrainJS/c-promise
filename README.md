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

[Using generators as a promise (jsfiddle.net)](https://jsfiddle.net/DigitalBrain/mtcuf1nj/)

<img src="http://g.recordit.co/E6e97qRPoY.gif" alt="Browser playground with fetch" width="50%" height="50%">

## How it works

The deepest pending CPromise in the chain will be rejected will a `CanceledError`, 
then that chain and each above standing chain will emit `cancel` event. This event will be handled by
callbacks attached by `onCancel(cb)` method and propagate with signal from `AbortController`.
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

Cancellable Promise with extra features


* [CPromise](#module_CPromise)
    * [~CPromiseScope](#module_CPromise..CPromiseScope) ⇐ <code>TinyEventEmitter</code>
        * [new CPromiseScope(resolve, reject, options)](#new_module_CPromise..CPromiseScope_new)
        * _instance_
            * [.signal](#module_CPromise..CPromiseScope+signal) : <code>AbortSignal</code>
            * [.isPending](#module_CPromise..CPromiseScope+isPending) ⇒ <code>Boolean</code>
            * [.isCanceled](#module_CPromise..CPromiseScope+isCanceled) ⇒ <code>Boolean</code>
            * [.onCancel(listener)](#module_CPromise..CPromiseScope+onCancel)
            * [.progress([value], [data])](#module_CPromise..CPromiseScope+progress)
            * [.debounceProgress(minTick)](#module_CPromise..CPromiseScope+debounceProgress) ⇒ <code>CPromiseScope</code>
            * [.propagate(type, data)](#module_CPromise..CPromiseScope+propagate) ⇒ <code>CPromiseScope</code>
            * [.captureProgress()](#module_CPromise..CPromiseScope+captureProgress) ⇒ <code>CPromiseScope</code>
            * [.scopes()](#module_CPromise..CPromiseScope+scopes) ⇒ <code>Array.&lt;CPromiseScope&gt;</code>
            * [.timeout(value)](#module_CPromise..CPromiseScope+timeout) ⇒ <code>Number</code> \| <code>this</code>
            * [.weight(weight)](#module_CPromise..CPromiseScope+weight) ⇒ <code>Number</code> \| <code>CPromiseScope</code>
            * [.label(label)](#module_CPromise..CPromiseScope+label) ⇒ <code>Number</code> \| <code>CPromiseScope</code>
            * [.resolve(value)](#module_CPromise..CPromiseScope+resolve)
            * [.reject(err)](#module_CPromise..CPromiseScope+reject)
            * [.done(err, value)](#module_CPromise..CPromiseScope+done)
            * [.cancel(reason)](#module_CPromise..CPromiseScope+cancel)
        * _static_
            * [.execute(executor, resolve, reject, options)](#module_CPromise..CPromiseScope.execute) ⇒ <code>CPromiseScope</code>
    * [~CPromise](#module_CPromise..CPromise) ⇐ <code>Promise</code>
        * [new CPromise(executor, [options])](#new_module_CPromise..CPromise_new)
        * _instance_
            * [.isPending](#module_CPromise..CPromise+isPending) ⇒ <code>Boolean</code>
            * [.isCanceled](#module_CPromise..CPromise+isCanceled) ⇒ <code>Boolean</code>
            * [.debounceProgress(minTick)](#module_CPromise..CPromise+debounceProgress) ⇒ <code>CPromise</code>
            * [.progress(listener)](#module_CPromise..CPromise+progress) ⇒ <code>Number</code> \| <code>CPromise</code>
            * [.captureProgress()](#module_CPromise..CPromise+captureProgress) ⇒ <code>CPromise</code>
            * [.cancel(reason)](#module_CPromise..CPromise+cancel) ⇒ <code>Boolean</code>
            * [.delay(ms)](#module_CPromise..CPromise+delay) ⇒ <code>CPromise</code>
            * [.then(onFulfilled, [onRejected])](#module_CPromise..CPromise+then) ⇒ <code>CPromise</code>
            * [.catch(onRejected, filter)](#module_CPromise..CPromise+catch) ⇒ <code>CPromise</code>
        * _static_
            * [.isCanceledError(thing)](#module_CPromise..CPromise.isCanceledError) ⇒ <code>boolean</code>
            * [.delay(ms, value)](#module_CPromise..CPromise.delay) ⇒ <code>CPromise</code>
            * [.all(thenables)](#module_CPromise..CPromise.all) ⇒ <code>CPromise</code>
            * [.race(thenables)](#module_CPromise..CPromise.race) ⇒ <code>CPromise</code>
            * [.from(thing)](#module_CPromise..CPromise.from) ⇒ <code>CPromise</code>
    * [~PromiseScopeOptions](#module_CPromise..PromiseScopeOptions) : <code>Object</code>
    * [~onFulfilled](#module_CPromise..onFulfilled) : <code>function</code>
    * [~onRejected](#module_CPromise..onRejected) : <code>function</code>
    * [~CPromiseExecutorFn](#module_CPromise..CPromiseExecutorFn) : <code>function</code>
    * [~CPromiseExecutorFn](#module_CPromise..CPromiseExecutorFn) : <code>function</code>
    * [~CPromiseOptions](#module_CPromise..CPromiseOptions) : <code>Object</code> \| <code>String</code> \| <code>Number</code>

<a name="module_CPromise..CPromiseScope"></a>

### CPromise~CPromiseScope ⇐ <code>TinyEventEmitter</code>
Scope for CPromises instances

**Kind**: inner class of [<code>CPromise</code>](#module_CPromise)  
**Extends**: <code>TinyEventEmitter</code>  

* [~CPromiseScope](#module_CPromise..CPromiseScope) ⇐ <code>TinyEventEmitter</code>
    * [new CPromiseScope(resolve, reject, options)](#new_module_CPromise..CPromiseScope_new)
    * _instance_
        * [.signal](#module_CPromise..CPromiseScope+signal) : <code>AbortSignal</code>
        * [.isPending](#module_CPromise..CPromiseScope+isPending) ⇒ <code>Boolean</code>
        * [.isCanceled](#module_CPromise..CPromiseScope+isCanceled) ⇒ <code>Boolean</code>
        * [.onCancel(listener)](#module_CPromise..CPromiseScope+onCancel)
        * [.progress([value], [data])](#module_CPromise..CPromiseScope+progress)
        * [.debounceProgress(minTick)](#module_CPromise..CPromiseScope+debounceProgress) ⇒ <code>CPromiseScope</code>
        * [.propagate(type, data)](#module_CPromise..CPromiseScope+propagate) ⇒ <code>CPromiseScope</code>
        * [.captureProgress()](#module_CPromise..CPromiseScope+captureProgress) ⇒ <code>CPromiseScope</code>
        * [.scopes()](#module_CPromise..CPromiseScope+scopes) ⇒ <code>Array.&lt;CPromiseScope&gt;</code>
        * [.timeout(value)](#module_CPromise..CPromiseScope+timeout) ⇒ <code>Number</code> \| <code>this</code>
        * [.weight(weight)](#module_CPromise..CPromiseScope+weight) ⇒ <code>Number</code> \| <code>CPromiseScope</code>
        * [.label(label)](#module_CPromise..CPromiseScope+label) ⇒ <code>Number</code> \| <code>CPromiseScope</code>
        * [.resolve(value)](#module_CPromise..CPromiseScope+resolve)
        * [.reject(err)](#module_CPromise..CPromiseScope+reject)
        * [.done(err, value)](#module_CPromise..CPromiseScope+done)
        * [.cancel(reason)](#module_CPromise..CPromiseScope+cancel)
    * _static_
        * [.execute(executor, resolve, reject, options)](#module_CPromise..CPromiseScope.execute) ⇒ <code>CPromiseScope</code>

<a name="new_module_CPromise..CPromiseScope_new"></a>

#### new CPromiseScope(resolve, reject, options)
Constructs PromiseScope instance


| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 
| options | <code>PromiseScopeOptions</code> | 

<a name="module_CPromise..CPromiseScope+signal"></a>

#### cPromiseScope.signal : <code>AbortSignal</code>
get promise abort signal object

**Kind**: instance property of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  
<a name="module_CPromise..CPromiseScope+isPending"></a>

#### cPromiseScope.isPending ⇒ <code>Boolean</code>
indicates if the promise is pending

**Kind**: instance property of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  
<a name="module_CPromise..CPromiseScope+isCanceled"></a>

#### cPromiseScope.isCanceled ⇒ <code>Boolean</code>
indicates if the promise is pending

**Kind**: instance property of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  
<a name="module_CPromise..CPromiseScope+onCancel"></a>

#### cPromiseScope.onCancel(listener)
registers the listener for cancel event

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  

| Param | Type |
| --- | --- |
| listener | <code>function</code> | 

<a name="module_CPromise..CPromiseScope+progress"></a>

#### cPromiseScope.progress([value], [data])
Set promise progress

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>Number</code> | a number between [0, 1] |
| [data] | <code>\*</code> | any data to send for progress event listeners |

<a name="module_CPromise..CPromiseScope+debounceProgress"></a>

#### cPromiseScope.debounceProgress(minTick) ⇒ <code>CPromiseScope</code>
Set the minimum progress tick

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  

| Param | Type |
| --- | --- |
| minTick | <code>Number</code> | 

<a name="module_CPromise..CPromiseScope+propagate"></a>

#### cPromiseScope.propagate(type, data) ⇒ <code>CPromiseScope</code>
emit propagate event that will propagate through each promise scope in the chain (bubbling)

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>String</code> \| <code>Symbol</code> |  | some type to identify the data kind |
| data | <code>\*</code> | <code></code> | some data |

<a name="module_CPromise..CPromiseScope+captureProgress"></a>

#### cPromiseScope.captureProgress() ⇒ <code>CPromiseScope</code>
capture initial progress state of the chain

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  
<a name="module_CPromise..CPromiseScope+scopes"></a>

#### cPromiseScope.scopes() ⇒ <code>Array.&lt;CPromiseScope&gt;</code>
Returns all parent scopes that are in pending state

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  
<a name="module_CPromise..CPromiseScope+timeout"></a>

#### cPromiseScope.timeout(value) ⇒ <code>Number</code> \| <code>this</code>
timeout before the promise will be canceled

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | timeout in ms |

<a name="module_CPromise..CPromiseScope+weight"></a>

#### cPromiseScope.weight(weight) ⇒ <code>Number</code> \| <code>CPromiseScope</code>
Sets the promise weight in progress capturing process

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  
**Returns**: <code>Number</code> \| <code>CPromiseScope</code> - returns weight if no arguments were specified  

| Param | Type | Description |
| --- | --- | --- |
| weight | <code>Number</code> | any number grater or equal 0 |

<a name="module_CPromise..CPromiseScope+label"></a>

#### cPromiseScope.label(label) ⇒ <code>Number</code> \| <code>CPromiseScope</code>
Sets the promise label

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  
**Returns**: <code>Number</code> \| <code>CPromiseScope</code> - returns weight if no arguments were specified  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | any string |

<a name="module_CPromise..CPromiseScope+resolve"></a>

#### cPromiseScope.resolve(value)
Resolves the promise with given value

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  

| Param |
| --- |
| value | 

<a name="module_CPromise..CPromiseScope+reject"></a>

#### cPromiseScope.reject(err)
Rejects the promise with given error

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  

| Param |
| --- |
| err | 

<a name="module_CPromise..CPromiseScope+done"></a>

#### cPromiseScope.done(err, value)
Resolves or rejects the promise depending on the arguments

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  

| Param | Description |
| --- | --- |
| err | error object, if specified the promise will be rejected with this error, resolves otherwise |
| value |  |

<a name="module_CPromise..CPromiseScope+cancel"></a>

#### cPromiseScope.cancel(reason)
throws the CanceledError that cause promise chain cancellation

**Kind**: instance method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  

| Param | Type |
| --- | --- |
| reason | <code>String</code> \| <code>Error</code> | 

<a name="module_CPromise..CPromiseScope.execute"></a>

#### CPromiseScope.execute(executor, resolve, reject, options) ⇒ <code>CPromiseScope</code>
Executes the promise executor in the PromiseScope context

**Kind**: static method of [<code>CPromiseScope</code>](#module_CPromise..CPromiseScope)  

| Param | Type |
| --- | --- |
| executor | <code>CPromiseExecutorFn</code> | 
| resolve |  | 
| reject |  | 
| options |  | 

<a name="module_CPromise..CPromise"></a>

### CPromise~CPromise ⇐ <code>Promise</code>
CPromise class

**Kind**: inner class of [<code>CPromise</code>](#module_CPromise)  
**Extends**: <code>Promise</code>  

* [~CPromise](#module_CPromise..CPromise) ⇐ <code>Promise</code>
    * [new CPromise(executor, [options])](#new_module_CPromise..CPromise_new)
    * _instance_
        * [.isPending](#module_CPromise..CPromise+isPending) ⇒ <code>Boolean</code>
        * [.isCanceled](#module_CPromise..CPromise+isCanceled) ⇒ <code>Boolean</code>
        * [.debounceProgress(minTick)](#module_CPromise..CPromise+debounceProgress) ⇒ <code>CPromise</code>
        * [.progress(listener)](#module_CPromise..CPromise+progress) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.captureProgress()](#module_CPromise..CPromise+captureProgress) ⇒ <code>CPromise</code>
        * [.cancel(reason)](#module_CPromise..CPromise+cancel) ⇒ <code>Boolean</code>
        * [.delay(ms)](#module_CPromise..CPromise+delay) ⇒ <code>CPromise</code>
        * [.then(onFulfilled, [onRejected])](#module_CPromise..CPromise+then) ⇒ <code>CPromise</code>
        * [.catch(onRejected, filter)](#module_CPromise..CPromise+catch) ⇒ <code>CPromise</code>
    * _static_
        * [.isCanceledError(thing)](#module_CPromise..CPromise.isCanceledError) ⇒ <code>boolean</code>
        * [.delay(ms, value)](#module_CPromise..CPromise.delay) ⇒ <code>CPromise</code>
        * [.all(thenables)](#module_CPromise..CPromise.all) ⇒ <code>CPromise</code>
        * [.race(thenables)](#module_CPromise..CPromise.race) ⇒ <code>CPromise</code>
        * [.from(thing)](#module_CPromise..CPromise.from) ⇒ <code>CPromise</code>

<a name="new_module_CPromise..CPromise_new"></a>

#### new CPromise(executor, [options])
Constructs new CPromise instance


| Param | Type | Description |
| --- | --- | --- |
| executor | <code>CPromiseExecutorFn</code> | promise executor function that will be invoked in the context of the new CPromiseScope instance |
| [options] | <code>CPromiseOptions</code> |  |

<a name="module_CPromise..CPromise+isPending"></a>

#### cPromise.isPending ⇒ <code>Boolean</code>
indicates if the promise is pending

**Kind**: instance property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+isCanceled"></a>

#### cPromise.isCanceled ⇒ <code>Boolean</code>
indicates if promise has been canceled

**Kind**: instance property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+debounceProgress"></a>

#### cPromise.debounceProgress(minTick) ⇒ <code>CPromise</code>
Debounce progress tick

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| minTick | <code>Number</code> | 

<a name="module_CPromise..CPromise+progress"></a>

#### cPromise.progress(listener) ⇒ <code>Number</code> \| <code>CPromise</code>
returns chains progress synchronously or adds a progress event listener if the argument was specified

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| listener | <code>function</code> | 

<a name="module_CPromise..CPromise+captureProgress"></a>

#### cPromise.captureProgress() ⇒ <code>CPromise</code>
**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  
**See**: [CPromiseScope.captureProgress](CPromiseScope.captureProgress)  
<a name="module_CPromise..CPromise+cancel"></a>

#### cPromise.cancel(reason) ⇒ <code>Boolean</code>
cancel the promise chain with specified reason

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  
**Returns**: <code>Boolean</code> - true if success  

| Param | Type |
| --- | --- |
| reason | <code>String</code> | 

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

#### cPromise.catch(onRejected, filter) ⇒ <code>CPromise</code>
Catches rejection with optionally specified Error class

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| onRejected | <code>function</code> | 
| filter | <code>Error</code> | 

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

#### CPromise.all(thenables) ⇒ <code>CPromise</code>
Returns a single CPromise that resolves to an array of the results of the input promises.If one fails then other promises will be canceled immediately

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| thenables | <code>Iterable</code> | 

<a name="module_CPromise..CPromise.race"></a>

#### CPromise.race(thenables) ⇒ <code>CPromise</code>
returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects,with the value or reason from that promise. Other pending promises will be canceled immediately

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| thenables | <code>Iterable</code> | 

<a name="module_CPromise..CPromise.from"></a>

#### CPromise.from(thing) ⇒ <code>CPromise</code>
Converts thing to CPromise. If thing if a thenable with cancel method it will be called on cancel event

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| thing | <code>\*</code> | 

<a name="module_CPromise..PromiseScopeOptions"></a>

### CPromise~PromiseScopeOptions : <code>Object</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | the label for the promise |
| weight= | <code>Number</code> | 1 - the progress weight of the promise |
| timeout= | <code>Number</code> | 0 - max pending time |

<a name="module_CPromise..onFulfilled"></a>

### CPromise~onFulfilled : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**this**: <code>CPromiseScope</code>  

| Param | Type |
| --- | --- |
| value |  | 
| scope | <code>CPromiseScope</code> | 

<a name="module_CPromise..onRejected"></a>

### CPromise~onRejected : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**this**: <code>CPromiseScope</code>  

| Param | Type |
| --- | --- |
| err |  | 
| scope | <code>CPromiseScope</code> | 

<a name="module_CPromise..CPromiseExecutorFn"></a>

### CPromise~CPromiseExecutorFn : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**this**: <code>CPromiseScope</code>  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 
| scope | <code>CPromiseScope</code> | 

<a name="module_CPromise..CPromiseExecutorFn"></a>

### CPromise~CPromiseExecutorFn : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="module_CPromise..CPromiseOptions"></a>

### CPromise~CPromiseOptions : <code>Object</code> \| <code>String</code> \| <code>Number</code>
If value is a number it will be considered as the value for timeout optionIf value is a string it will be considered as label

**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

## License

The MIT License Copyright (c) 2020 Dmitriy Mozgovoy robotshara@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

