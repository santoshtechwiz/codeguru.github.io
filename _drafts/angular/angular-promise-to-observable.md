## How to convert Promise to Observable in Angular?

## What is Obserable?

An Observable is a Producer of numerous values that "push" them to Observers (Consumers). On invocation, a Function is a lazily evaluated function that synchronously returns a single value.

## What is Promise?
As per the MDN

>The Promise object **represents the eventual completion (or failure) of an asynchronous operation and its resulting value**

B

Angular by default returns  `Obserable`  when you invoked HTTP client methods. But let’s assume that you have a function that returns a promise. In this case, you can easily change the return type from  `Promise`  to  `Observable`  .

In order to do this first import  `from`  operator from ’`rxjs`  and wrap the promise in the from the operator.

```javascript
import { from } from  'rxjs';
const observable = from(promise);
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTgxNDAyNzI1XX0=
-->