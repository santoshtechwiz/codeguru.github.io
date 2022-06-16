In this post, I will show you how to merge objects in javascript.

The most straightforward approach is to use `ES6` `spread` operator.
Let's suppose you have following objects in javascript.

``` javascript
const person = {
  name: 'John',
  age: 21,
};
const address={
  email:'john@example.com',
  city:'NYC.'
}
```
Now if you want to merge these two objects you can use the spread operator as below
``` JavaScript

const mergedObject={...person,...address};
console.log(mergedObject);
// OUTPUT
{
name:"John",
age:21,
email:"john@example.com",
city:"NYC"
}
```
What if both objects have same property then in this case last object property will win.
For example, if you merge the following objects, you will see object2 override the value of the first object

``` JavaScript
const obj1={
  prop1:'Object1'
};
const obj2= {
  prop1:'Object2'
}
const merged= {...obj1,...obj2};
console.log(merged);
// OUTPUT
{
prop1:"Object2"
}
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTU2NjAwMjMxXX0=
-->