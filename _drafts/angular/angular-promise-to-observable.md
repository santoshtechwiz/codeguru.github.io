## How to convert Promise to Observable in Angular?

Angular by default returns  `Obserable`  when you invoked HTTP client methods. But let’s assume that you have a function that returns a promise. In this case, you can easily change the return type from  `Promise`  to  `Observable`  .

In order to do this first import  `from`  operator from ’`rxjs`  and wrap the promise in the from the operator.

```javascript
import { from } from  'rxjs';
const observable = from(promise);
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU4ODc0MTQ4MV19
-->