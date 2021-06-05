In this post, I will show you how to remove the duplicate item from the javascript `Array.`
The naive approach is to loop the array (using `map`, `foreach` or `filter`) and keep track of the visited item and push the non visited item to the temp array.
For example, let's suppose you have the following array.
``` javascript
const fruites=['Apple','Orange','Manago','Apple','Grapes']
```
and you want to remove the duplicate from the array. In this case, `Apple` is a duplicate item.

``` javascript
function removeDuplicates(array) {
  let unique = []
  array.map(x => 
    if(!unique .includes(x) {
      unique .push(x)
    })
  return unique 
};
```
If you are using `ES6` then you can use `Set`  to remove the duplicate 

``` javascript
function removeDuplicates(array) {
	   return [...new Set(array)]
};
```
NOTE:  Set stores unique elements from the array.
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzkzMTEyMTYxXX0=
-->