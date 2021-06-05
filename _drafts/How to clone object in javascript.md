In this post, I will show you how to clone an object in javascript.
## What is cloning
In **computer science**, **cloning** is the process of creating an exact copy of another application program or object. There are two types of cloning.

- Shallow Copy
- Deep Copy

### Shallow Copy
> Shallow copy is a bit-wise copy of an object. A new object is created that has an exact replica of the values in the original object. If any of the fields of the object are references to other objects, just the reference addresses are copied, i.e., only the memory address is copied. 
> 
> -- <cite>[source](https://we-are.bookmyshow.com/understanding-deep-and-shallow-copy-in-javascript-13438bad941c)</cite>

### Deep Copy
> A deep copy copies all fields and makes copies of dynamically allocated memory pointed to by the fields. A deep copy occurs when an object is copied along with the objects to which it refers.
> 
> --<cite>[Source](https://we-are.bookmyshow.com/understanding-deep-and-shallow-copy-in-javascript-13438bad941c)</cite>

## How to clone the object in javascript
 In javascript, there are three ways to clone the object. Let's suppose you want to clone the following object in javascript
``` javascript
const food = { name: 'Orange', color: 'Yellow' };
```

## Using ES6 Spread operator
By using ES6 spread operator, you can clone/copy the object.

``` javascript
const cloneFood={...food};
```
## Using Object.assign method
If you are not using ES6 then you can use javascript `Object.assign` function to copy the object.

``` javascript
const cloneFood=Object.assign({},food);
```

> The `Object.assign()` method copies all `enumerable` own properties from one or more source objects to a target object. It returns the target object. 
> 
>  -- <cite>[Mozila]([https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)</cite>

## Using JSON.stringify
You can use `JSON.stringify` and `JSON.parse` function of javascript to clone the object.
``` javascript
JSON.parse(JSON.stringify(food))
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1MzQ4NzM0MzBdfQ==
-->