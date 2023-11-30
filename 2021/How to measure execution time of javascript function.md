In this post, I will show you how to measure the execution time of any function in Javascript.
Javascript `console` api have two functions `console.time` and `console.timeEnd`

 
 -  `console.time` -  start the timer
 -  `console.timeEnd` - Stops  a  timer  that  was  previously  started  by  calling  `console.time()`  and  prints  the  result  to  stdout:


for example,let's suppose you have following javascript function which calculate the factorial iif give number
``` javascript
const fact = (number) => {
    if (number < 1) {
        return 1;
    }
    else {
        return number * fact(number - 1);
    }
}
```
and you want to calculate the execution time of the function.
You can wrap this function between `console.time` and `console.timeEnd` whiich will display the execution time on `stdout`

``` javascript
console.time('Factorial')
fact(10);
console.timeEnd('Factorial');
```
if execute above script you will see the following output
```
Factorial: 0.175ms
```
This approach is not reusable you can create one helper function as below 

``` javascript
const measure = (label, fn) => {
    console.time(label);
    fn();
    console.timeEnd(label);
}
```

and use like below
``` javascript
measure('Factorial', () => {    
 fact(10);
 })
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjA5NjkzMjM1Ml19
-->