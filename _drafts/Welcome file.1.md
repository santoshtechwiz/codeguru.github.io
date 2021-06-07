
## How to convert Promise to Observable in Angular

A promise is a future value. An observable is a flow of past and future values. So it makes sense to convert a list of promises into an observable.
Angular implements Observalbe in there API out of the box. Sometimes if you need to convert `Promise` to `Obserbable` in angular you can do it easily. Checkout t

```javascript
import { from } from  'rxjs';
const observable = from(promise);
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY2NDgxMDM5OCwtNTQ5MjU0ODAxLDE5ND
U1MzcxMjcsLTE4OTQxOTk0MzMsNTAyMDk2MjMxLC04MzU3NzEx
OTIsLTU1Mjk5MzQyNiwxNTUzMTYwNjgwLDY2ODE5MDA0OSwxMj
AzMDQ2OTQ2LDE0MDc1MTczMTUsLTM4NDEwNTAxMywtMzE1NjQ4
NTg4LC04MDA1NjE5MzAsLTE3MjQyMzMzNzYsLTE1NjU3MTM5OD
MsLTIwNjY2NTU0NzUsLTkzODUxNjIzOCwtMzMyNDU1MzYzXX0=

-->