[![Build Status](https://travis-ci.com/DigitalBrainJS/c-promise.svg?branch=master)](https://travis-ci.com/DigitalBrainJS/c-promise)
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
- [Comparison table](#comparison-table)
- Examples:
    - [cancellation & progress capturing](#progress-capturing-and-cancellation)
    - [pause & resume promise](#pause--resume-promises)
    - [concurrent limitation](#concurrency-limitation)
    - [retrying  async operations](#retrying-async-operations)
    - [abortable fetch with timeout](#abortable-fetch-with-timeout)
    - [wrapping axios request](#wrapping-axios-request)
    - [**using with React**](#using-with-react)
        - [React class components with CPromise decorators](#react-class-components-with-cpromise-decorators)
        - [React functional components](#react-functional-components)
- [Signals handling](#signals-handling)
- [Using generators](#using-generators-as-an-alternative-of-ecma-async-functions)    
- [Atomic sub-chains](#atomic-sub-chains)
- [Using decorators](#using-decorators)    
    - [@ReactComponent](#reactcomponentsubscribeall-boolean)
    - [@async](#asynctimeout-number-innerweight-number-label--string-weight-number)
    - [@listen](#listensignal-abortsignalstringsymbol)
    - [@cancel](#cancelreason-string-signal-abortsignalstringsymbol)
    - [@canceled](#canceledonrejectederr-scope-context-function)
    - [@timeout](#timeoutms-number)
    - [@innerWeight](#innerweightweight-number)
    - [@label](#labellabel-string)
    - [@progress](#progresshandler-function)
    - [@done](#donedonehandlervalue-isrejected-scope-context)
    - [@atomic](#atomicatomictype-disableddetachedawaittruefalse)
- [Events](#events) 
- [`then` method behavior notes](#then-method-behavior-notes)
- [Related projects](#related-projects) 
- [API Reference](#api-reference)
- [License](#license)   


## SYNOPSIS :sparkles:

CPromise library provides an advanced version of the built-in Promise by subclassing.
You might be interested in using it if you need:
- cancel the promise through rejection (including nested)
- cancel async tasks inside React components (useful to cancel internal code when components unmounts)
    - with built-in decorators for class components
    - with `useAsyncEffect`&`useAsyncCallback`  hooks provided by [useAsyncEffect2](https://www.npmjs.com/package/use-async-effect2) package
- cancel network requests with promises, which allows the network request to be automatically aborted when the parent async function is canceled:
    - `fetch` use [cp-fetch](https://www.npmjs.com/package/cp-fetch)  
    - `axios` use [cp-axios](https://www.npmjs.com/package/cp-axios)  
- control cancellation flow to write really complicated async flows with cancelation ability.
- define atomic promise chains that cannot be canceled in the middle of execution from upper chains
- `AbortController` support for promises
- some way to make cancellation declarative (with method decorators)
- capture promise chain progress with defining progress impact for each promise (default 1)
- generators support to write a flat code in the same way as `async`&`await` do, but with `CPromise` features support
- pause/resume the promise
- pending timeout
- concurrent limitation for `all` and `allSettled` methods with `mapper` reducer
- advanced signal communication

In terms of the library **the cancellation means rejection with a special error subclass**.

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
`CPromise` fully supports writing "flat" cancellable code:

[Codesandbox Live Demo](https://codesandbox.io/s/cpromise-readme-flat-code1-ooq7d?file=/src/index.js)

````javascript
const p= CPromise.run(function*(){
  yield CPromise.delay(1000);
  return 1;
}).then(function*(v){
  for(let i=0; i<3; i++) {
    console.log(`delay [${i}]`);
    yield CPromise.delay(500);
  }
  return v + 2;
}).then(v=> console.log(`Done: ${v}`));

//setTimeout(()=> p.cancel(), 1000);
````

You can use decorators to cancel asynchronous tasks inside React components when unmounted,
thereby preventing the [well-known React leak warning](https://stackoverflow.com/questions/32903001/react-setstate-on-unmounted-component) from appearing:

[Codesandbox Live Demo](https://codesandbox.io/s/react-fetch-classes-react-component-decorator-tiny-kugmw?file=/src/TestComponent.js)
````jsx
import React, { Component } from "react";
import { ReactComponent, timeout, cancel } from "c-promise2";
import cpFetch from "cp-fetch";

@ReactComponent
export class FetchComponent extends React.Component {
  state = {text: "fetching..."};

  @timeout(5000)
  *componentDidMount() {
    const response = yield cpFetch(this.props.url);
    this.setState({ text: `json: ${yield response.text()}` });
  }

  render() {
    return (
      <div>
        <span>{this.state.text}</span>
        <button onClick={() => cancel.call(this)}>Cancel request</button>
      </div>);
  }
}
````
If you prefer function components you can use [`use-async-effect2`](https://www.npmjs.com/package/use-async-effect2)
package that decorates CPromise into custom React hooks - `useAsyncEffect` and `useAsyncCallback`:

[Live demo](https://codesandbox.io/s/use-async-effect-fetch-tiny-ui-xbmk2?file=/src/TestComponent.js)
````javascript
import React from "react";
import {useState} from "react";
import {useAsyncEffect} from "use-async-effect2";
import cpFetch from "cp-fetch";

function FetchComponent(props) {
    const [text, setText] = useState("");

    const cancel= useAsyncEffect(function* () {
            setText("fetching..."); 
            const response = yield cpFetch(props.url); // will throw a CanceledError if component get unmounted
            const json = yield response.json();
            setText(`Success: ${JSON.stringify(json)}`);
    }, [props.url]);

    return (
      <div>
      <span>{text}</span>
      <button onClick={cancel}>Cancel request</button>
      </div>
    );
}
````
# Why :question:

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

The package consists of pre-built umd, cjs, mjs bundles which can be found in the `./dist/` directory

- Import the library:

````javascript
import {CPromise} from "c-promise2";
// const {CPromise} = require("c-promise2"); // using require
// import {CPromise} from "c-promise2/dev"; // development version
    
const chain= CPromise.delay(1000, 'It works!').then(message => console.log('Done', message));

//chain.cancel();
````
As an alternative you can use any CDN with npm support:

- [production UMD version](https://unpkg.com/c-promise2) 
(or [minified](https://unpkg.com/c-promise2/dist/c-promise.umd.min.js) ~9KB) - provides the CPromise class 
as the default export, other exports values declared as static properties

- [production CommonJS version](https://unpkg.com/c-promise2/dist/c-promise.cjs.js)

- [production ESM version](https://unpkg.com/c-promise2/dist/c-promise.mjs)

### Comparison table

|                                                                                                 | CPromise                                                                                | BlueBird.js                              | p-cancelable                                                          |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|------------------------------------------|-----------------------------------------------------------------------|
| `.cancel()` is synchronous                                                                        | ❌* (.cancel emits a cancel signal synchronously, but the cancellation is asynchronous) | ✓                                      | ✓                                                                   |
| No setup code required to make cancellation work                                                | ✓                                                                                       | ✓                                      | ✓                                                                   |
| Cancellation type                                                                               | asynchronous, rejection with `CanceledError` follows the special algorithm              | synchronous (ignoring attached callbacks) | synchronous (ignoring attached callbacks) / asynchronous (rejecting)  |
| onCancel handler to clean up internal tasks                                                     | ✓                                                                                     | ✓                                      | ✓                                                                   |
| Atomic sub-chains (protected from cancellation by upper chains)                                 | ✓                                                                                     |❌                                      |❌                                                                   |
| Cancellation flows                                                                              | ✓                                                                                     |❌                                      |❌                                                                   |
| Custom cancellation reasons                                                                     | ✓                                                                                     |❌                                      | ✓                                                                   |
| Cancellation composes with other own features, like `.all`, `.race`, `.allSettled`                 | ✓                                                                                     | ✓                                      |❌                                                                   |
| Chaining/nested promise cancellation  support                                                   | ✓                                                                                     | ✓                                      |❌                                                                   |
| Generators support for “flat” coroutines (as a functional replacement for ECMA async functions) | ✓                                                                                     | ✓                                      |❌                                                                   |
| Coroutines cancellation                                                                         | ✓                                                                                     |❌                                      |❌                                                                   |
| Concurrency limitation                                                                          | ✓                                                                                     | ✓                                      |❌                                                                   |
| Signals/data flows                                                                              | ✓                                                                                     |❌                                      |❌                                                                   |
| Chain progress capturing                                                                        | ✓                                                                                     |❌                                      |❌                                                                   |
| Pause/resume support                                                                            | ✓                                                                                     |❌                                      |❌                                                                   |
| timeouts                                                                                        | ✓                                                                                     | ✓                                      |❌                                                                   |
| AbortController support (outer/inner)                                                           | ✓/✓                                                                                 |❌                                      |❌                                                                   |
| `.catch` errors filter                                                                            | ✓                                                                                     | ✓                                      |❌                                                                   |
| `.delay` helper                                                                                   | ✓                                                                                     | ✓                                      |❌                                                                   |
| ECMA decorators for methods (legacy/current)                                                    | ✓/✓                                                                                 |❌                                      |❌                                                                   |
| Inherited from the native Promise                                                               | ✓                                                                                     |❌                                      |❌                                                                   |


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
You can use the [cp-fetch package](https://www.npmjs.com/package/cp-fetch) which provides a ready to use 
CPromise wrapper for cross-platform fetch API.

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
Tip: You can use ready for use [cp-axios package](https://www.npmjs.com/package/cp-axios) for this.

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

### Retrying async operations

Use `CPromise.retry` to retry async operations (3 attempts by default) with a delay(by default delay = attempt * 1000ms)

[Live demo](https://codesandbox.io/s/cpromise-readme-retry-example1-hpiu5)
````javascript
const p= CPromise.retry(function*(scope, attempt){
  console.log(`attempt [${attempt}]`);
  this.innerWeight(3);
  yield CPromise.delay(1000);
  yield CPromise.delay(1000);
  yield CPromise.delay(1000);
  throw Error('oops');
}).progress((v) => {
  console.log(`Progress: ${v}`);
});

// setTimeout(() => p.cancel(), 5000); stop trying
````
[Live demo](https://codesandbox.io/s/cpromise-readme-retry-example1-hpiu5)
````javascript
const p= CPromise.retry(async function(attempt){
  console.log(`attempt [${attempt}]`);
  await CPromise.delay(1000);
  await CPromise.delay(1000);
  await CPromise.delay(1000);
  throw Error('oops');
}).progress((v) => {
  console.log(`Progress: ${v}`);
});
````

You can use `.cancel` / `.pause` / `.resume` to control the sequence of attempts.

### Using with React

#### React class components with CPromise decorators

With CPromise decorators, a generic React class component that fetches JSON might look like the following:

[Live Demo](https://codesandbox.io/s/react-fetch-classes-decorators-tiny-forked-r390h?file=/src/TestComponent.js)
````jsx
import React, { Component } from "react";
import {
  CPromise,
  CanceledError,
  ReactComponent,
  E_REASON_UNMOUNTED,
  listen,
  cancel
} from "c-promise2";
import cpAxios from "cp-axios";

@ReactComponent
class TestComponent extends Component {
  state = {
    text: ""
  };

  *componentDidMount(scope) {
    console.log("mount", scope);
    scope.onCancel((err) => console.log(`Cancel: ${err}`));
    yield CPromise.delay(3000);
  }

  @listen
  *fetch() {
    this.setState({ text: "fetching..." });
    try {
      const response = yield cpAxios(this.props.url).timeout(
        this.props.timeout
      );
      this.setState({ text: JSON.stringify(response.data, null, 2) });
    } catch (err) {
      CanceledError.rethrow(err, E_REASON_UNMOUNTED);
      this.setState({ text: err.toString() });
    }
  }

  *componentWillUnmount() {
    console.log("unmount");
  }

  render() {
    return (
      <div className="component">
        <div className="caption">useAsyncEffect demo:</div>
        <div>{this.state.text}</div>
        <button
          className="btn btn-success"
          type="submit"
          onClick={() => this.fetch(Math.round(Math.random() * 200))}
        >
          Fetch random character info
        </button>
        <button
          className="btn btn-warning"
          onClick={() => cancel.call(this, "oops!")}
        >
          Cancel request
        </button>
      </div>
    );
  }
}
````
#### React functional components

To use `CPromise` powers in functional components use [`use-async-effect2`](https://www.npmjs.com/package/use-async-effect2)
hooks

Using some specific decorators we can control our async flow in a declarative way:
[Live Demo](https://codesandbox.io/s/react-fetch-classes-decorators-tiny-forked-34vf2?file=/src/TestComponent.js)
````jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { async, listen, cancel, timeout } from "c-promise2";
import cpFetch from "cp-fetch";

export class TestComponent extends React.Component {
  state = {
    text: ""
  };

  @timeout(5000)
  @listen
  @async
  *componentDidMount() {
    console.log("mounted");
    const response = yield cpFetch(this.props.url);
    this.setState({ text: `json: ${yield response.text()}` });
  }

  render() {
    return <div>{this.state.text}</div>;
  }

  @cancel()
  componentWillUnmount() {
    console.log("unmounted");
  }
}
````
It automatically manages async code i.g request, so it protects from warning appearing like:

`Warning: Can’t perform a React state update on an unmounted component.`

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
There are the following system signals (just for reference, don't use them unless you know what you are doing):
- `CPromise.SIGNAL_CANCEL`
- `CPromise.SIGNAL_PAUSE`
- `CPromise.SIGNAL_RESUME`


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

## Atomic sub-chains

Sometimes you need to prevent any sub-chain from being canceled from the outside because you want to allow some
already started asynchronous procedure to be completed before closing the following promise chains.
To solve this challenge use `.atomic(["disabled"|"detached"|"await"])` method.
- `'detached'` - keep the sub-chain execution running in 'background', the main chain reject immediately
- `'await'` - wait for the sub-chain to complete and then reject the next promise in the outer chain
- `false` considering as `'disabled'`
- `true`  considering as  `'await'`

Check out the difference with examples:
Normal cancellation behaviour `.atomic('disabled')` ([Demo](https://codesandbox.io/s/c-promise2-readme-not-atomic-i9pu8)):
````javascript
const p = CPromise.delay(1000, 1)
  .then((v) => {
    console.log("p1");
    return CPromise.delay(1000, 2);
  })
  .then((v) => {
    console.log("p2");
    return CPromise.delay(1000, 3);
  })
  .atomic()
  .then((v) => {
    console.log("p3");
    return CPromise.delay(1000, 4);
  })
  .then(
    (value) => console.log(`Done:`, value),
    (err) => console.warn(`Fail: ${err}`)
  );

setTimeout(() => p.cancel(), 1500);
````
output:
````
p1
Fail: CanceledError: canceled

Process finished with exit code 0
````
`.atomic('detached')` cancellation behaviour ([Demo](https://codesandbox.io/s/c-promise2-readme-atomic-detached-nvvwo?file=/src/index.js)):
````javascript
const p = CPromise.delay(1000, 1)
  .then((v) => {
    console.log("p1");
    return CPromise.delay(1000, 2);
  })
  .then((v) => {
    console.log("p2");
    return CPromise.delay(1000, 3);
  })
  .atomic('detached')
  .then((v) => {
    console.log("p3");
    return CPromise.delay(1000, 4);
  })
  .then(
    (value) => console.log(`Done:`, value),
    (err) => console.warn(`Fail: ${err}`)
  );

setTimeout(() => p.cancel(), 1500);
````
output:
````
p1
Fail: CanceledError: canceled
p2
````
`.atomic('await')` cancellation behaviour ([Demo](https://codesandbox.io/s/c-promise2-readme-atomic-await-e9812)):
````javascript
const p = CPromise.delay(1000, 1)
  .then((v) => {
    console.log("p1");
    return CPromise.delay(1000, 2);
  })
  .then((v) => {
    console.log("p2");
    return CPromise.delay(1000, 3);
  })
  .atomic()
  .then((v) => {
    console.log("p3");
    return CPromise.delay(1000, 4);
  })
  .then(
    (value) => console.log(`Done:`, value),
    (err) => console.warn(`Fail: ${err}`)
  );

setTimeout(() => p.cancel(), 1500);
````
output:
````
p1
p2
Fail: CanceledError: canceled

Process finished with exit code 0
````
## Using decorators

The library supports a few types of decorators to make your code cleaner. 
All decorators are isomorphic- `@async` and `@async()` are totally equal.
Also, they support both current and legacy decorator's specification.

### ReactComponent([{subscribeAll?: boolean}])
Decorates class as React component:
 - decorates all generator to `CPromise` async function;
 - subscribes `componentDidMount` method to the internal `AbortController` signal of the class
 - decorates `componentWillUnmount` with `@cancel` decorator
 to invoke `AbortController.abort()` before running the method;

### @async([{timeout?: Number, innerWeight?: Number, label? : String, weight?: Number}])
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
It can be called as a function, passing the context using `.call` or `.apply`.

````javascript
class Klass{
   @canceled(()=> console.log(`canceled`))
   @listen('internalControllerId')
   *bar(){
     yield CPromise.delay(1000);
     console.log('done!');
   }

   @cancel('E_SOME_REASON', 'internalControllerId')
   *baz(){
   
   }
}
const instance= new Klass;

instance.bar().then(console.log, console.warn);

// cancel bar execution
cancel.call(intance, E_SOME_REASON, 'internalControllerId');
// calling `baz` will terminate the `bar` execution as well
instance.baz();
````

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

### @progress(handler: Function)
Adds a listener to monitor the function progress
````javascript
class Test{
    @progress(function (value, scope, data, context) {
        console.log(`Progress: ${value}`);
        // Prints: 0.25, 0.5, 0.75, 1
    })
    @innerWeight(4)
    @async
    * asyncMethod() {
        yield delay(100);
        yield delay(100);
        yield delay(100);
        yield delay(100);
    }
}

const test= new Test();
const promise= test.asyncMethod();
````

### @timeout(ms: Number)
Sets the timeout option for the CPromise async function.

### @innerWeight(weight: Number)
Sets the innerWeight option for the CPromise async function.

### @label(label: String)
Sets the label option for the CPromise async function.

### @done([doneHandler(value, isRejected, scope, context)])
Decorates async function with `done` chain

### @atomic([atomicType: 'disabled'|'detached'|'await'|true|false])
Configures decorated CPromise async function as atomic.

## Events
All events (system and user defined) can be fired only when promises in pending state.

Predefined (system) events:
- `cancel(reason: CanceledError)` - fires when promise is canceled (rejected with `CanceledError`)
- `pause` - on promise pause request
- `resume` - on promise resume request
- `capture(scope: CPromise)` - fired when some consumer directly or above standing in the chain starts progress capturing
- `progress(value: Number, scope: CPromise, data: Object?)` - fired when promise chain progress changes

Event listener attaching shortcuts (methods bound to the promise instance):
- `onCancel(listener: Function)`
- `onPause(listener: Function)`
- `onResume(listener: Function)`
- `onCapture(listener: Function)`

## `then` method behavior notes

The behavior of the method is slightly different from native Promise. 
In the case when you cancel the chain after it has been resolved within one eventloop tick,
onRejected will be called with a CanceledError instance, instead of onFulfilled.
This prevents the execution of unwanted code in the next eventloop tick if 
the user canceled the promise immediately after the promise was resolved,
 during the same eventloop tick.

## Related projects
- [cp-axios](https://www.npmjs.com/package/cp-axios) - a simple axios wrapper that provides an advanced cancellation api
- [cp-fetch](https://www.npmjs.com/package/cp-fetch) - fetch with timeouts and request cancellation
- [use-async-effect2](https://www.npmjs.com/package/use-async-effect2) - cancel async code in functional React components

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

