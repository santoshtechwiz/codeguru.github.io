## How to convert Promise to Observable in Angular?

## What is Obserable?

An Observable is a Producer of numerous values that "push" them to Observers (Consumers). On invocation, a Function is a lazily evaluated function that synchronously returns a single value.

## What is Promise?
As per the MDN

>The Promise object **represents the eventual completion (or failure) of an asynchronous operation and its resulting value**

The diffrence between `Promise` and `Observable` is that Promises can be resolved with a single value or an array of values, and Observables emit one or more values over time.


Angular by default returns  `Obserable`  when you invoked HTTP client methods. But let’s assume that you have a function that returns a promise. In this case, you can easily change the return type from  `Promise`  to  `Observable` . Converting `promise` to `Observable` is very straight forword in Anguar. In order to do this first import  `from`  operator from ’`rxjs`  and wrap the promise in the from the operator.

```javascript
import { from } from  'rxjs';
const observable = from(promise);
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTM3OTU4NDMwNl19
-->