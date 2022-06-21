I have started a series on recursive problem. In this problem I will show you how to  flatten javascript array.This example is for nested array objects. In order to understand the recursive part I have added the visualization which will help to understand the recur

Let's suppose you have following function `fn` which accepts nested array as arguments and then it flat the array into single array.
>Input
```javascript
fn([1,[2,[3],4]])
```

> Output
1,2,3,4

The above example is perfect for recursion.

```javascript
function flatten(ary) {
  var ret = [];
    for(var i = 0; i < ary.length; i++) {
        if(Array.isArray(ary[i])) {
            ret = ret.concat(flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}
```
Lets understand the code line by line

- First time function call is `flatten([2,[3],4]`
- Then it calls `flatten([3]` because three is the array
- In the final call last function returns 3 and append to the result

![](https://1.bp.blogspot.com/-gW4XETt9RJY/YL8HP7ooGQI/AAAAAAAAOxQ/IrR_h1hY3lcT6I75wfeSnVmtQxtlZffIgCLcBGAsYHQ/w640-h402/flatten.gif)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1MjI1NDM1MzYsLTcwMzAzNjQ1OCw3OD
A0ODAxMTddfQ==
-->