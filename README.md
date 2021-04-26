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
        - [React class component](#react-class-component)
        - [React functional component](#react-functional-component)
        - [React class component with CPromise decorators](#react-class-component-with-cpromise-decorators)
- [Signals handling](#signals-handling)
- [Using generators](#using-generators-as-an-alternative-of-ecma-async-functions)    
- [Atomic sub-chains](#atomic-sub-chains)
- [Using decorators](#using-decorators)    
    - [@async](#asynctimeout-number-innerweight-number-label--string-weight-number)
    - [@listen](#listensignal-abortsignalstringsymbol)
    - [@cancel](#cancelreason-string-signal-abortsignalstringsymbol)
    - [@canceled](#canceledonrejectederr-scope-context-function)
    - [@timeout](#timeoutms-number)
    - [@innerWeight](#innerweightweight-number)
    - [@label](#labellabel-string)
    - [@progress](#progresshandler-function)
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

````jsx
export class FetchComponent extends React.Component {
  state = {text: ""};

  @timeout(5000)
  @listen
  @async
  *componentDidMount() {
    const response = yield cpFetch(this.props.url);
    this.setState({ text: `json: ${yield response.text()}` });
  }

  render() {
    return <div>{this.state.text}</div>;
  }

  @cancel()
  componentWillUnmount() {}
}
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
#### React class component
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
#### React functional component
Using hooks and CPromise `cancel` method [Live Demo](https://codesandbox.io/s/react-cpromise-fetch-promisify-forked-3h4v2?file=/src/MyComponent.js):
````jsx
import React, { useEffect, useState } from "react";
import { CPromise, CanceledError } from "c-promise2";
import cpFetch from "cp-fetch";

function MyComponent(props) {
  const [text, setText] = useState("fetching...");

  useEffect(() => {
    console.log("mount");
    const promise = CPromise.from(function* () {
      try {
        const response = yield cpFetch(props.url);
        const json = yield response.json();
        yield CPromise.delay(1000);
        setText(`Success: ${JSON.stringify(json)}`);
      } catch (err) {  
        console.warn(err);
        CanceledError.rethrow(err);
        setText(`Failed: ${err}`);
      }
    });

    return () => {
      console.log("unmount");
      promise.cancel();
    };
  }, [props.url]);

  return <p>{text}</p>;
}
````
#### React class component with CPromise decorators
With CPromise decorators, a generic React class component might look like this one:
[Demo](https://codesandbox.io/s/react-fetch-classes-decorators-tiny-forked-34vf2?file=/src/TestComponent.js)
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

More complex example:
[Demo](https://codesandbox.io/s/react-fetch-classes-decorators-forked-oyjf7?file=/src/TestComponent.js)
````jsx
import React from "react";
import {
  CPromise,
  async,
  listen,
  cancel,
  timeout,
  canceled,
  E_REASON_DISPOSED
} from "c-promise2";
import cpFetch from "cp-fetch";

export class TestComponent extends React.Component {
  state = {};

  @canceled(function (err) {
    console.warn(`Canceled: ${err}`);
    if (err.code !== E_REASON_DISPOSED) {
      this.setState({ text: err + "" });
    }
  })
  @listen
  @async
  *componentDidMount() {
    console.log("mounted");
    const json = yield this.fetchJSON(
      "https://run.mocky.io/v3/7b038025-fc5f-4564-90eb-4373f0721822?mocky-delay=2s"
    );
    this.setState({ text: JSON.stringify(json) });
  }

  @timeout(5000)
  @async
  *fetchJSON(url) {
    const response = yield cpFetch(url); // cancellable request
    return yield response.json();
  }

  render() {
    return (
      <div>
        AsyncComponent: <span>{this.state.text || "fetching..."}</span>
      </div>
    );
  }

  @cancel(E_REASON_DISPOSED)
  componentWillUnmount() {
    console.log("unmounted");
  }
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

## Events
All events (system and user defined) can be fired only when promises in pending state.

Predefined (system) events:
- `cancel(reason: CanceledError)` - fired when promise is canceled (rejected with `CanceledError`)
- `pause` - on promise pause request
- `resume` - on promise resume request
- `capture(scope: CPromise)` - fired when some consumer directly or above standing in the chain starts progress capturing
- `progress(value: Number, scope: CPromise, data: Object?)` - fired when promise chain progress changes

Event listener attaching shortcuts (methods binded to the promise instance):
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

Cancellable Promise with extra features

<a name="module_CPromise.CanceledError"></a>

### CPromise.CanceledError : <code>CanceledError</code>
CanceledError class

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.AbortController"></a>

### CPromise.AbortController : <code>AbortController</code> \| <code>AbortControllerEx</code>
Refers to the AbortController class (native if available)

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.AbortControllerEx"></a>

### CPromise.AbortControllerEx : <code>AbortControllerEx</code>
AbortControllerEx class

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.E_REASON_CANCELED"></a>

### CPromise.E\_REASON\_CANCELED
Generic cancellation reason

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.E_REASON_DISPOSED"></a>

### CPromise.E\_REASON\_DISPOSED
Cancellation reason for the case when the instance will be disposed

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.E_REASON_TIMEOUT"></a>

### CPromise.E\_REASON\_TIMEOUT
Timeout cancellation reason

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.E_REASON_UNMOUNTED"></a>

### CPromise.E\_REASON\_UNMOUNTED
React specific canceled reason

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.async"></a>

### CPromise.async : <code>function</code>
async decorator

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.listen"></a>

### CPromise.listen : <code>function</code>
listen decorator

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.cancel"></a>

### CPromise.cancel : <code>function</code>
cancel decorator

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.ReactComponent"></a>

### CPromise.ReactComponent : <code>function</code>
cancel decorator

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.atomic"></a>

### CPromise.atomic : <code>function</code>
make CPromise function atomic

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.done"></a>

### CPromise.done : <code>function</code>
append `done` chain to the resulting promise of the decorated method

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.timeout"></a>

### CPromise.timeout : <code>function</code>
timeout decorator

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.innerWeight"></a>

### CPromise.innerWeight : <code>function</code>
innerWeight decorator

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.label"></a>

### CPromise.label : <code>function</code>
label decorator

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.canceled"></a>

### CPromise.canceled : <code>function</code>
label decorator

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.progress"></a>

### CPromise.progress : <code>function</code>
progress decorator

**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise.promisify"></a>

### CPromise.promisify : <code>function</code>
**Kind**: static property of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise..CPromise"></a>

### CPromise~CPromise : <code>object</code>
Creates a new CPromise instance

**Kind**: inner namespace of [<code>CPromise</code>](#module_CPromise)  
**Extends**: <code>Promise</code>  

| Param | Type | Description |
| --- | --- | --- |
| [executor] | <code>CPromiseExecutorFn</code> | promise executor function that will be invoked in the context of the new CPromise instance |
| [options] | <code>CPromiseOptions</code> |  |


* [~CPromise](#module_CPromise..CPromise) : <code>object</code>
    * _instance_
        * [.signal](#module_CPromise..CPromise+signal) : <code>AbortSignal</code>
        * [.isPending](#module_CPromise..CPromise+isPending) ⇒ <code>Boolean</code>
        * [.isCanceled](#module_CPromise..CPromise+isCanceled) ⇒ <code>Boolean</code>
        * [.isCaptured](#module_CPromise..CPromise+isCaptured) ⇒ <code>Boolean</code>
        * [.isPaused](#module_CPromise..CPromise+isPaused) ⇒ <code>Boolean</code>
        * [.isRejected](#module_CPromise..CPromise+isRejected) ⇒ <code>Boolean</code>
        * [.parent](#module_CPromise..CPromise+parent) ⇒ <code>CPromise</code> \| <code>null</code>
        * [.onCancel(listener)](#module_CPromise..CPromise+onCancel) ⇒ <code>CPromise</code>
        * [.onPause(listener)](#module_CPromise..CPromise+onPause) ⇒ <code>CPromise</code>
        * [.onResume(listener)](#module_CPromise..CPromise+onResume) ⇒ <code>CPromise</code>
        * [.onCapture(listener)](#module_CPromise..CPromise+onCapture) ⇒ <code>CPromise</code>
        * [.onDone(listener)](#module_CPromise..CPromise+onDone)
        * [.totalWeight([weight])](#module_CPromise..CPromise+totalWeight) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.innerWeight([weight])](#module_CPromise..CPromise+innerWeight) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.progress([value], [data], [scope])](#module_CPromise..CPromise+progress) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.propagate(type, data, [scope])](#module_CPromise..CPromise+propagate) ⇒ <code>CPromise</code>
        * [.captureProgress([options])](#module_CPromise..CPromise+captureProgress) ⇒ <code>CPromise</code>
        * [.scopes([pendingOnly])](#module_CPromise..CPromise+scopes) ⇒ <code>Array.&lt;CPromise&gt;</code>
        * [.timeout([ms])](#module_CPromise..CPromise+timeout) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.weight([weight])](#module_CPromise..CPromise+weight) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.label([label])](#module_CPromise..CPromise+label) ⇒ <code>Number</code> \| <code>CPromise</code>
        * [.resolve(value)](#module_CPromise..CPromise+resolve) ⇒ <code>CPromise</code>
        * [.reject(err)](#module_CPromise..CPromise+reject) ⇒ <code>CPromise</code>
        * [.pause()](#module_CPromise..CPromise+pause) ⇒ <code>Boolean</code>
        * [.resume()](#module_CPromise..CPromise+resume) ⇒ <code>Boolean</code>
        * [.atomic([type])](#module_CPromise..CPromise+atomic) ⇒
        * [.cancel([reason], [force])](#module_CPromise..CPromise+cancel)
        * [.emitSignal(type, [data], [handler], [locator])](#module_CPromise..CPromise+emitSignal) ⇒ <code>Boolean</code>
        * [.delay(ms)](#module_CPromise..CPromise+delay) ⇒ <code>CPromise</code>
        * [.then(onFulfilled, [onRejected])](#module_CPromise..CPromise+then) ⇒ <code>CPromise</code>
        * [.catch(onRejected, [filter])](#module_CPromise..CPromise+catch) ⇒ <code>CPromise</code>
        * [.finally(finallyHandler)](#module_CPromise..CPromise+finally) ⇒ <code>Promise.&lt;(T\|void)&gt;</code>
        * [.canceled([onCanceled])](#module_CPromise..CPromise+canceled) ⇒ <code>CPromise</code>
        * [.listen(signal)](#module_CPromise..CPromise+listen) ⇒ <code>CPromise</code>
        * [.on(type, listener, [prepend])](#module_CPromise..CPromise+on) ⇒ <code>CPromise</code>
        * [.off(type, listener)](#module_CPromise..CPromise+off) ⇒ <code>CPromise</code>
        * [.listenersCount(type)](#module_CPromise..CPromise+listenersCount) ⇒ <code>Number</code>
        * [.hasListeners(type)](#module_CPromise..CPromise+hasListeners) ⇒ <code>Boolean</code>
        * [.once(type, listener)](#module_CPromise..CPromise+once) ⇒ <code>CPromise</code>
        * [.emit(type, ...args)](#module_CPromise..CPromise+emit) ⇒ <code>CPromise</code>
        * [.emitHook(type, ...args)](#module_CPromise..CPromise+emitHook) ⇒ <code>Boolean</code>
        * [.toString([entireChain])](#module_CPromise..CPromise+toString) ⇒ <code>string</code>
    * _static_
        * [.version](#module_CPromise..CPromise.version) ⇒ <code>string</code>
        * [.versionNumber](#module_CPromise..CPromise.versionNumber) ⇒ <code>number</code>
        * [.isCanceledError(thing)](#module_CPromise..CPromise.isCanceledError) ⇒ <code>boolean</code>
        * [.delay(ms, value, [options])](#module_CPromise..CPromise.delay) ⇒ <code>CPromise</code>
        * [.all(iterable, [options])](#module_CPromise..CPromise.all) ⇒ <code>CPromise</code>
        * [.race(thenables)](#module_CPromise..CPromise.race) ⇒ <code>CPromise</code>
        * [.allSettled(iterable, [options])](#module_CPromise..CPromise.allSettled) ⇒ <code>CPromise</code>
        * [.retry(fn, [options])](#module_CPromise..CPromise.retry) ⇒ <code>CPromise</code>
        * [.from(thing, [options])](#module_CPromise..CPromise.from) ⇒ <code>CPromise</code>
        * [.promisify(originalFn, [options])](#module_CPromise..CPromise.promisify) ⇒ <code>function</code>
        * [.run(generatorFn, [options])](#module_CPromise..CPromise.run) ⇒ <code>CPromise</code>
        * [.async([options])](#module_CPromise..CPromise.async)
        * [.listen([signals])](#module_CPromise..CPromise.listen)
        * [.cancel([reason], signal)](#module_CPromise..CPromise.cancel)
        * [.canceled(onCanceledChain)](#module_CPromise..CPromise.canceled)
        * [.progress(onProgressHandler)](#module_CPromise..CPromise.progress)
        * [.ReactComponent(options)](#module_CPromise..CPromise.ReactComponent)
        * [.timeout(ms)](#module_CPromise..CPromise.timeout)
        * [.label(str)](#module_CPromise..CPromise.label)
        * [.innerWeight(weight)](#module_CPromise..CPromise.innerWeight)
        * [.atomic(atomicType)](#module_CPromise..CPromise.atomic)
        * [.done(doneHandler)](#module_CPromise..CPromise.done)
        * [.isPromisifiedFn(fn)](#module_CPromise..CPromise.isPromisifiedFn) ⇒ <code>\*</code> \| <code>boolean</code>
        * [.isCPromise(thing, anyVersion)](#module_CPromise..CPromise.isCPromise) ⇒ <code>boolean</code>

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
<a name="module_CPromise..CPromise+isRejected"></a>

#### cPromise.isRejected ⇒ <code>Boolean</code>
indicates if the promise is rejected

**Kind**: instance property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+parent"></a>

#### cPromise.parent ⇒ <code>CPromise</code> \| <code>null</code>
get parent promise

**Kind**: instance property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise+onCancel"></a>

#### cPromise.onCancel(listener) ⇒ <code>CPromise</code>
registers the listener for cancel event

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| listener | <code>OnCancelListener</code> | 

<a name="module_CPromise..CPromise+onPause"></a>

#### cPromise.onPause(listener) ⇒ <code>CPromise</code>
registers the listener for pause event

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| listener | <code>OnPauseListener</code> | 

<a name="module_CPromise..CPromise+onResume"></a>

#### cPromise.onResume(listener) ⇒ <code>CPromise</code>
registers the listener for resume event

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| listener | <code>OnResumeListener</code> | 

<a name="module_CPromise..CPromise+onCapture"></a>

#### cPromise.onCapture(listener) ⇒ <code>CPromise</code>
registers the listener for capture event

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| listener | <code>OnCaptureListener</code> | 

<a name="module_CPromise..CPromise+onDone"></a>

#### cPromise.onDone(listener)
registers the listener for done event

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| listener | <code>CPDoneListener</code> | 

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

#### cPromise.progress([value], [data], [scope]) ⇒ <code>Number</code> \| <code>CPromise</code>
Set promise progress

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>Number</code> | a number between [0, 1] |
| [data] | <code>\*</code> | any data to send for progress event listeners |
| [scope] | <code>CPromise</code> | CPromise scope |

<a name="module_CPromise..CPromise+propagate"></a>

#### cPromise.propagate(type, data, [scope]) ⇒ <code>CPromise</code>
emit propagate event that will propagate through each promise scope in the chain (bubbling)

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>String</code> \| <code>symbol</code> |  | some type to identify the data kind |
| data | <code>\*</code> | <code></code> | some data |
| [scope] | <code>CPromise</code> | <code></code> | CPromise scope |

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

#### cPromise.scopes([pendingOnly]) ⇒ <code>Array.&lt;CPromise&gt;</code>
Returns all parent scopes that are in pending state

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default |
| --- | --- | --- |
| [pendingOnly] | <code>boolean</code> | <code>false</code> | 

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
<a name="module_CPromise..CPromise+atomic"></a>

#### cPromise.atomic([type]) ⇒
Make promise chain atomic (non-cancellable for external signals)

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  
**Returns**: CPromise  

| Param | Type |
| --- | --- |
| [type] | <code>AtomicType</code> | 

<a name="module_CPromise..CPromise+cancel"></a>

#### cPromise.cancel([reason], [force])
throws the CanceledError that cause promise chain cancellation

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default |
| --- | --- | --- |
| [reason] | <code>String</code> \| <code>Error</code> |  | 
| [force] | <code>Boolean</code> | <code>false</code> | 

<a name="module_CPromise..CPromise+emitSignal"></a>

#### cPromise.emitSignal(type, [data], [handler], [locator]) ⇒ <code>Boolean</code>
Emit a signal of the specific type

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| type | <code>Signal</code> | 
| [data] | <code>\*</code> | 
| [handler] | <code>SignalHandler</code> | 
| [locator] | <code>SignalLocator</code> | 

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

<a name="module_CPromise..CPromise+finally"></a>

#### cPromise.finally(finallyHandler) ⇒ <code>Promise.&lt;(T\|void)&gt;</code>
Add done chain, whose handler will be invoked in any case with resolved value or rejection error

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| finallyHandler | <code>CPFinallyHandler</code> | 

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

<a name="module_CPromise..CPromise+toString"></a>

#### cPromise.toString([entireChain]) ⇒ <code>string</code>
Render promise to String

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [entireChain] | <code>boolean</code> | <code>false</code> | render the entire promise chain |

<a name="module_CPromise..CPromise.version"></a>

#### CPromise.version ⇒ <code>string</code>
CPromise version string

**Kind**: static property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise.versionNumber"></a>

#### CPromise.versionNumber ⇒ <code>number</code>
CPromise version number

**Kind**: static property of [<code>CPromise</code>](#module_CPromise..CPromise)  
<a name="module_CPromise..CPromise.isCanceledError"></a>

#### CPromise.isCanceledError(thing) ⇒ <code>boolean</code>
Checks if thing is an CanceledError instance

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param |
| --- |
| thing | 

<a name="module_CPromise..CPromise.delay"></a>

#### CPromise.delay(ms, value, [options]) ⇒ <code>CPromise</code>
Returns a CPromise that will be resolved after specified timeout

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ms | <code>Number</code> |  | delay before resolve the promise with specified value |
| value |  |  |  |
| [options] | <code>object</code> |  |  |
| [options.progressTick] | <code>number</code> | <code>1000</code> | progress timer tick, must be >= 100ms |

<a name="module_CPromise..CPromise.all"></a>

#### CPromise.all(iterable, [options]) ⇒ <code>CPromise</code>
Returns a single CPromise that resolves to an array of the results of the input promises.If one fails then other promises will be canceled immediately

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| iterable | <code>Iterable</code> \| <code>Generator</code> \| <code>GeneratorFunction</code> | 
| [options] | <code>AllOptions</code> | 

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

#### CPromise.allSettled(iterable, [options]) ⇒ <code>CPromise</code>
returns a promise that resolves after all of the given promises have either fulfilled or rejected

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| iterable | <code>Iterable</code> \| <code>Generator</code> \| <code>GeneratorFunction</code> | 
| [options] | <code>AllOptions</code> | 

<a name="module_CPromise..CPromise.retry"></a>

#### CPromise.retry(fn, [options]) ⇒ <code>CPromise</code>
Retry async operation

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| fn | <code>CPGeneratorRetryFunction</code> \| <code>CPRetryFunction</code> | 
| [options] | <code>object</code> | 
| [options.args] | <code>array</code> | 
| [options.retries] | <code>number</code> | 
| [options.delayWeight] | <code>number</code> \| <code>CPRetryDelayResolver</code> | 
| [options.delay] | <code>object</code> | 

<a name="module_CPromise..CPromise.from"></a>

#### CPromise.from(thing, [options]) ⇒ <code>CPromise</code>
Converts thing to CPromise using the following rules:- CPromise instance returns as is- Objects with special method defined with key `Symbol.for('toCPromise')` will be converted using this method  The result will be cached for future calls- Thenable wraps into a new CPromise instance, if thenable has the `cancel` method it will be used for canceling- Generator function will be resolved to CPromise- Array will be resoled via `CPromise.all`, arrays with one element (e.g. `[[1000]]`) will be resolved via `CPromise.race`This method returns null if the conversion failed.

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default |
| --- | --- | --- |
| thing | <code>\*</code> |  | 
| [options] | <code>Object</code> |  | 
| [options.resolveSignatures] | <code>Boolean</code> | <code>true</code> | 
| [options.args] | <code>Array</code> |  | 

<a name="module_CPromise..CPromise.promisify"></a>

#### CPromise.promisify(originalFn, [options]) ⇒ <code>function</code>
Converts callback styled function|GeneratorFn|AsyncFn to CPromise async function

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| originalFn | <code>function</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> | 
| [options] | <code>PromisifyOptions</code> \| <code>function</code> \| <code>Boolean</code> | 

<a name="module_CPromise..CPromise.run"></a>

#### CPromise.run(generatorFn, [options]) ⇒ <code>CPromise</code>
Resolves the generator to an CPromise instance

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Description |
| --- | --- | --- |
| generatorFn | <code>GeneratorFunction</code> |  |
| [options] | <code>Object</code> |  |
| [options.args] | <code>Array</code> |  |
| [options.resolveSignatures] | <code>Boolean</code> | resolve extra signatures (like arrays with CPromise.all) |
| [options.scopeArg] | <code>Boolean</code> | pass the CPromise scope as the first argument to the generator function |
| [options.context] | <code>\*</code> |  |

<a name="module_CPromise..CPromise.async"></a>

#### CPromise.async([options])
Decorator to make CPromise async function from generator, ECMA async or callback-styled method

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| [options] | <code>object</code> | 
| [options.timeout] | <code>object</code> | 
| [options.label] | <code>object</code> | 
| [options.innerWeight] | <code>object</code> | 
| [options.weight] | <code>object</code> | 
| [options.listen] | <code>object</code> | 

<a name="module_CPromise..CPromise.listen"></a>

#### CPromise.listen([signals])
Decorator to subscribe CPromise async method to the internal or external controller

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| [signals] | <code>AbortControllerId</code> \| <code>AbortController</code> \| <code>AbortSignal</code> \| <code>Array.&lt;(AbortControllerId\|AbortController\|AbortSignal)&gt;</code> | 

<a name="module_CPromise..CPromise.cancel"></a>

#### CPromise.cancel([reason], signal)
Decorator to cancel internal or external abort controller before the decorated function invocation.Can be used as a plain function by passing a object context with `.call` or `.apply` methods

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| [reason] | <code>string</code> | 
| signal | <code>AbortControllerId</code> \| <code>AbortController</code> | 

**Example**  
```js
el.onclick= ()=> cancel.call(this, reason, 'myControllerId'); - to use the decorator as a plain function
```
<a name="module_CPromise..CPromise.canceled"></a>

#### CPromise.canceled(onCanceledChain)
Decorator to add an `onCanceled` rejection handler to the resulting promise of the decorated method

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| onCanceledChain | <code>function</code> \| <code>GeneratorFunction</code> | 

<a name="module_CPromise..CPromise.progress"></a>

#### CPromise.progress(onProgressHandler)
Decorator to subscribe the handler to the `onProgress` event of the resulting promise

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| onProgressHandler | <code>ProgressDecoratorHandler</code> | 

<a name="module_CPromise..CPromise.ReactComponent"></a>

#### CPromise.ReactComponent(options)
Decorate class as React component

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| options | <code>boolean</code> \| <code>ReactComponentDecoratorOptions</code> | 

<a name="module_CPromise..CPromise.timeout"></a>

#### CPromise.timeout(ms)
Decorator to set timeout for the resulting promise of the decorated function

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| ms | <code>number</code> | 

<a name="module_CPromise..CPromise.label"></a>

#### CPromise.label(str)
Decorator to set label for the resulting promise of the decorated function

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="module_CPromise..CPromise.innerWeight"></a>

#### CPromise.innerWeight(weight)
Decorator to set innerWeight for the resulting promise of the decorated function

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| weight | <code>number</code> | 

<a name="module_CPromise..CPromise.atomic"></a>

#### CPromise.atomic(atomicType)
Decorator to set timeout for the resulting promise of the decorated function

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| atomicType | <code>AtomicType</code> | 

<a name="module_CPromise..CPromise.done"></a>

#### CPromise.done(doneHandler)
append `done` chain to the resulting promise of the decorated method

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| doneHandler | <code>CPDecoratorDoneHandler</code> | 

<a name="module_CPromise..CPromise.isPromisifiedFn"></a>

#### CPromise.isPromisifiedFn(fn) ⇒ <code>\*</code> \| <code>boolean</code>
Returns promisification strategy that was used to the original function

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="module_CPromise..CPromise.isCPromise"></a>

#### CPromise.isCPromise(thing, anyVersion) ⇒ <code>boolean</code>
Check whether object is CPromise instance

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| thing | <code>\*</code> | 
| anyVersion | <code>boolean</code> | 

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

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  |  |
| timeout | <code>Number</code> |  |  |
| weight | <code>Number</code> |  |  |
| [nativeController] | <code>Boolean</code> | <code>false</code> | prefer native AbortController class as the internal signal |

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
<a name="module_CPromise..OnCaptureListener"></a>

### CPromise~OnCaptureListener : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type |
| --- | --- |
| CPromise | <code>scope</code> | 

<a name="module_CPromise..CPDoneListener"></a>

### CPromise~CPDoneListener ⇒ <code>CPromise</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 
| isRejected | <code>boolean</code> | 

<a name="module_CPromise..AtomicType"></a>

### CPromise~AtomicType : <code>number</code> \| <code>boolean</code> \| <code>&quot;disabled&quot;</code> \| <code>&quot;detached&quot;</code> \| <code>&quot;await&quot;</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise..Signal"></a>

### CPromise~Signal : <code>String</code> \| <code>Symbol</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise..SignalHandler"></a>

### CPromise~SignalHandler ⇒ <code>Boolean</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**this**: <code>{CPromise}</code>  

| Param | Type |
| --- | --- |
| data | <code>\*</code> | 
| type | <code>Signal</code> | 
| scope | <code>CPromise</code> | 

<a name="module_CPromise..SignalLocator"></a>

### CPromise~SignalLocator ⇒ <code>Boolean</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**this**: <code>{CPromise}</code>  

| Param | Type |
| --- | --- |
| data | <code>\*</code> | 
| type | <code>Signal</code> | 
| scope | <code>CPromise</code> | 
| isRoot | <code>Boolean</code> | 

<a name="module_CPromise..CPFinallyHandler"></a>

### CPromise~CPFinallyHandler : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**this**: <code>CPromise</code>  

| Param | Type |
| --- | --- |
| settledValue | <code>\*</code> | 
| isRejected | <code>boolean</code> | 
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

<a name="module_CPromise..CPRetryFunction"></a>

### CPromise~CPRetryFunction ⇒ <code>\*</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type |
| --- | --- |
| attempt | <code>number</code> | 
| args | <code>array</code> | 

<a name="module_CPromise..CPGeneratorRetryFunction"></a>

### CPromise~CPGeneratorRetryFunction ⇒ <code>\*</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type |
| --- | --- |
| scope | <code>CPromise</code> | 
| attempt | <code>number</code> | 
| args | <code>array</code> | 

<a name="module_CPromise..CPRetryDelayResolver"></a>

### CPromise~CPRetryDelayResolver ⇒ <code>number</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**Returns**: <code>number</code> - a delay in ms before next attempt  

| Param | Type |
| --- | --- |
| attempt | <code>number</code> | 
| retries | <code>number</code> | 

<a name="module_CPromise..PromisifyFinalizeFn"></a>

### CPromise~PromisifyFinalizeFn : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type |
| --- | --- |
| result | <code>\*</code> | 
| scope | <code>CPromise</code> | 

<a name="module_CPromise..CPPromisifyDecoratorFn"></a>

### CPromise~CPPromisifyDecoratorFn ⇒ <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type | Description |
| --- | --- | --- |
| originalFn | <code>function</code> | function to decorate |
| options | <code>PromisifyOptions</code> |  |

<a name="module_CPromise..PromisifyOptions"></a>

### CPromise~PromisifyOptions : <code>Object</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [multiArgs] | <code>Boolean</code> |  | aggregate all passed arguments to an array |
| [finalize] | <code>PromisifyFinalizeFn</code> |  | aggregate all passed arguments to an array |
| [fnType] | <code>&quot;plain&quot;</code> \| <code>&quot;generator&quot;</code> \| <code>&quot;async&quot;</code> |  |  |
| [scopeArg] | <code>boolean</code> |  | pass the CPromise scope as the first argument to the generator function |
| [decorator] | <code>function</code> |  | CPPromisifyDecoratorFn |
| [alignArgs] | <code>boolean</code> |  | align passed arguments to function definition for callback-styled function |
| [once] | <code>boolean</code> | <code>true</code> | don't promisify already promisified function |
| [types] | <code>array.&lt;(&#x27;plain&#x27;\|&#x27;async&#x27;\|&#x27;generator&#x27;)&gt;</code> |  | function types to promisify |

<a name="module_CPromise..AbortControllerId"></a>

### CPromise~AbortControllerId : <code>string</code> \| <code>symbol</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
<a name="module_CPromise..ProgressDecoratorHandler"></a>

### CPromise~ProgressDecoratorHandler : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type |
| --- | --- |
| progress | <code>number</code> | 
| scope | <code>CPromise</code> | 
| data | <code>\*</code> | 
| context | <code>object</code> | 

<a name="module_CPromise..ReactComponentDecoratorOptions"></a>

### CPromise~ReactComponentDecoratorOptions : <code>object</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [subscribeAll] | <code>boolean</code> | <code>false</code> | 

<a name="module_CPromise..CPDecoratorDoneHandler"></a>

### CPromise~CPDecoratorDoneHandler : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 
| isRejected | <code>boolean</code> | 
| scope | <code>CPromise</code> | 
| context | <code>object</code> | 


## License

The MIT License Copyright (c) 2020 Dmitriy Mozgovoy robotshara@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

