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
        * [.onSignal(listener)](#module_CPromise..CPromise+onSignal)
        * [.onSignal(signal, listener)](#module_CPromise..CPromise+onSignal)
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
        * [.pause(data)](#module_CPromise..CPromise+pause) ⇒ <code>Boolean</code>
        * [.resume(data)](#module_CPromise..CPromise+resume) ⇒ <code>Boolean</code>
        * [.atomic([type])](#module_CPromise..CPromise+atomic) ⇒
        * [.cancel([reason], [forced])](#module_CPromise..CPromise+cancel)
        * [.emitSignal(type, [data], [handler], [locator])](#module_CPromise..CPromise+emitSignal) ⇒ <code>Boolean</code>
        * [.delay(ms)](#module_CPromise..CPromise+delay) ⇒ <code>CPromise</code>
        * [.aggregate([weight])](#module_CPromise..CPromise+aggregate) ⇒ <code>CPromise</code>
        * [.then(onFulfilled, [onRejected])](#module_CPromise..CPromise+then) ⇒ <code>CPromise</code>
        * [.catch(onRejected, [filter])](#module_CPromise..CPromise+catch) ⇒ <code>CPromise</code>
        * [.finally(onFinally)](#module_CPromise..CPromise+finally) ⇒ <code>Promise.&lt;(T\|void)&gt;</code>
        * [.done(doneHandler)](#module_CPromise..CPromise+done) ⇒ <code>CPromise</code>
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
        * [.race(pending)](#module_CPromise..CPromise.race) ⇒ <code>CPromise</code>
        * [.allSettled(iterable, [options])](#module_CPromise..CPromise.allSettled) ⇒ <code>CPromise</code>
        * [.retry(fn, [options])](#module_CPromise..CPromise.retry) ⇒ <code>CPromise</code>
        * [.resolve([thing], [options])](#module_CPromise..CPromise.resolve) ⇒ <code>CPromise</code>
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
        * [.isCPromise(thing, [anyVersion])](#module_CPromise..CPromise.isCPromise) ⇒ <code>boolean</code>

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
indicates if the promise chain is paused

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

<a name="module_CPromise..CPromise+onSignal"></a>

#### cPromise.onSignal(listener)
registers the listener for done event

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| listener | <code>CPSignalListener</code> | 

<a name="module_CPromise..CPromise+onSignal"></a>

#### cPromise.onSignal(signal, listener)
registers the listener for done event

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| signal | <code>Signal</code> | 
| listener | <code>CPSignalListener</code> | 

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

#### cPromise.pause(data) ⇒ <code>Boolean</code>
Pause promise

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| data | <code>\*</code> | 

<a name="module_CPromise..CPromise+resume"></a>

#### cPromise.resume(data) ⇒ <code>Boolean</code>
Resume promise

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| data | <code>\*</code> | 

<a name="module_CPromise..CPromise+atomic"></a>

#### cPromise.atomic([type]) ⇒
Make promise chain atomic (non-cancellable for external signals)

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  
**Returns**: CPromise  

| Param | Type |
| --- | --- |
| [type] | <code>AtomicType</code> | 

<a name="module_CPromise..CPromise+cancel"></a>

#### cPromise.cancel([reason], [forced])
throws the CanceledError that cause promise chain cancellation

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default |
| --- | --- | --- |
| [reason] | <code>String</code> \| <code>Error</code> |  | 
| [forced] | <code>Boolean</code> | <code>false</code> | 

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

<a name="module_CPromise..CPromise+aggregate"></a>

#### cPromise.aggregate([weight]) ⇒ <code>CPromise</code>
Aggregate promise chain into one promise

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default |
| --- | --- | --- |
| [weight] | <code>number</code> | <code>1</code> | 

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

#### cPromise.finally(onFinally) ⇒ <code>Promise.&lt;(T\|void)&gt;</code>
Add handler that will be invoked when promise settled

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| onFinally | <code>CPFinallyHandler</code> | 

<a name="module_CPromise..CPromise+done"></a>

#### cPromise.done(doneHandler) ⇒ <code>CPromise</code>
Add a handler that will be called after the promise has been fulfilled, but unlike `finally`,the returned plain value will not be ignored

**Kind**: instance method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| doneHandler | <code>CPDoneHandler</code> | 

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
| iterable | <code>Iterable</code> \| <code>Generator</code> \| <code>GeneratorFunction</code> \| <code>array</code> | 
| [options] | <code>CPAllOptions</code> | 

**Example**  
```js
CPromise.all(function*(){    yield axios.get(url1);    yield axios.get(url2);    yield axios.get(url3);}, {concurrency: 1}).then(console.log)
```
<a name="module_CPromise..CPromise.race"></a>

#### CPromise.race(pending) ⇒ <code>CPromise</code>
returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects,with the value or reason from that promise. Other pending promises will be canceled immediately

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| pending | <code>Iterable</code> | 

<a name="module_CPromise..CPromise.allSettled"></a>

#### CPromise.allSettled(iterable, [options]) ⇒ <code>CPromise</code>
returns a promise that resolves after all of the given promises have either fulfilled or rejected

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| iterable | <code>Iterable</code> \| <code>Generator</code> \| <code>GeneratorFunction</code> | 
| [options] | <code>CPAllOptions</code> | 

<a name="module_CPromise..CPromise.retry"></a>

#### CPromise.retry(fn, [options]) ⇒ <code>CPromise</code>
Retry async operation

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default |
| --- | --- | --- |
| fn | <code>CPGeneratorRetryFunction</code> \| <code>CPRetryFunction</code> |  | 
| [options] | <code>Object</code> |  | 
| [options.args] | <code>Array</code> |  | 
| [options.retries] | <code>Number</code> |  | 
| [options.delayWeight] | <code>Number</code> |  | 
| [options.delay] | <code>Number</code> \| <code>CPRetryDelayResolver</code> |  | 
| [options.scopeArg] | <code>Boolean</code> | <code>false</code> | 

<a name="module_CPromise..CPromise.resolve"></a>

#### CPromise.resolve([thing], [options]) ⇒ <code>CPromise</code>
Converts thing to CPromise using the following rules:- CPromise instance returns as is- Objects with special method defined with key `Symbol.for('toCPromise')` will be converted using this method  The result will be cached for future calls- Thenable wraps into a new CPromise instance, if thenable has the `cancel` method it will be used for canceling- Generator function will be resolved to CPromise- Array will be resoled via `CPromise.all`, arrays with one element (e.g. `[[1000]]`) will be resolved via `CPromise.race`This method returns null if the conversion failed.

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type |
| --- | --- |
| [thing] | <code>\*</code> | 
| [options] | <code>resolveOptionsObject</code> \| <code>Boolean</code> | 

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
| [options.timeout] | <code>number</code> | 
| [options.label] | <code>string</code> | 
| [options.innerWeight] | <code>number</code> | 
| [options.weight] | <code>number</code> | 
| [options.listen] | <code>AbortControllerId</code> \| <code>AbortController</code> \| <code>AbortSignal</code> \| <code>Array.&lt;(AbortControllerId\|AbortController\|AbortSignal)&gt;</code> | 
| [options.atomic] | <code>AtomicType</code> | 

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

#### CPromise.isCPromise(thing, [anyVersion]) ⇒ <code>boolean</code>
Check whether object is CPromise instance

**Kind**: static method of [<code>CPromise</code>](#module_CPromise..CPromise)  

| Param | Type | Default |
| --- | --- | --- |
| thing | <code>\*</code> |  | 
| [anyVersion] | <code>boolean</code> | <code>false</code> | 

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

<a name="module_CPromise..CPSignalListener"></a>

### CPromise~CPSignalListener ⇒ <code>Boolean</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type |
| --- | --- |
| type | <code>Signal</code> | 
| data | <code>\*</code> | 

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

<a name="module_CPromise..CPDoneHandler"></a>

### CPromise~CPDoneHandler : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**this**: <code>CPromise</code>  

| Param | Type |
| --- | --- |
| settledValue | <code>\*</code> | 
| isRejected | <code>boolean</code> | 
| scope | <code>CPromise</code> | 

<a name="module_CPromise..CPAllOptions"></a>

### CPromise~CPAllOptions : <code>object</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [concurrency] | <code>number</code> | limit concurrency of promise being run simultaneously |
| [mapper] | <code>function</code> | function to map each element |
| [ignoreResults] | <code>boolean</code> | do not collect results |
| [signatures] | <code>boolean</code> | use advanced signatures for vales resolving |

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

<a name="module_CPromise..resolveOptionsObject"></a>

### CPromise~resolveOptionsObject : <code>Object</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [resolveSignatures] | <code>Boolean</code> | <code>true</code> | 
| [atomic] | <code>AtomicType</code> | <code>true</code> | 
| [args] | <code>\*</code> |  | 

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
| [bindListeners] | <code>boolean</code> | <code>true</code> | 
| [bindMethods] | <code>boolean</code> | <code>true</code> | 

<a name="module_CPromise..CPDecoratorDoneHandler"></a>

### CPromise~CPDecoratorDoneHandler : <code>function</code>
**Kind**: inner typedef of [<code>CPromise</code>](#module_CPromise)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 
| isRejected | <code>boolean</code> | 
| scope | <code>CPromise</code> | 
| context | <code>object</code> | 

