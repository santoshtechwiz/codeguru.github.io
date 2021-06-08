I have started a series on recursive problem. In this problem I will show you how to flat of nested array objects using javascript with visulization.

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
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzgwNDgwMTE3XX0=
-->