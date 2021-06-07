
## How to convert Promise to Observable in Angular

A promise is a future value. An observable is a flow of past and future values. So it makes sense to convert a list of promises into an observable.
Angular implements Observalbe in there API out of the box. Sometimes if you need to convert `Promise` to `Obserbable` in angular you can do it easily. Checkout the following code snippet

```javascript
import { from } from  'rxjs';
const observable = from(promise);
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MzEyNDY2ODIsLTU0OTI1NDgwMSwxOT
Q1NTM3MTI3LC0xODk0MTk5NDMzLDUwMjA5NjIzMSwtODM1Nzcx
MTkyLC01NTI5OTM0MjYsMTU1MzE2MDY4MCw2NjgxOTAwNDksMT
IwMzA0Njk0NiwxNDA3NTE3MzE1LC0zODQxMDUwMTMsLTMxNTY0
ODU4OCwtODAwNTYxOTMwLC0xNzI0MjMzMzc2LC0xNTY1NzEzOT
gzLC0yMDY2NjU1NDc1LC05Mzg1MTYyMzgsLTMzMjQ1NTM2M119

-->