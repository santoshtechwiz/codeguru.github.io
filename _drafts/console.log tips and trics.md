
The developer always used Google chrome  `console.log`  features for debugging their code.

In this post, I will share some cool tips about  `console`  API

# `console.log.`

For simple logging in  `Google Chrome`  console, we write  `console.log(msg)`

## `console.log`

If you want to change the colour of  `console.log`  message in the Developer Console, you can pass the console colour as below.

```javascript
 console.log('%c%s',"color:red;font-size:16px","Hello world")

```
[![](https://1.bp.blogspot.com/-Ei3vYwK7oqs/Xp1cT3wvXiI/AAAAAAAAMOM/UMyFnlMdaVYv7XXxeo1Y2CRcvM22mgYVgCPcBGAYYCw/s1600/console_color.png)](https://1.bp.blogspot.com/-Ei3vYwK7oqs/Xp1cT3wvXiI/AAAAAAAAMOM/UMyFnlMdaVYv7XXxeo1Y2CRcvM22mgYVgCPcBGAYYCw/s1600/console_color.png)


## `console.table`

You can use  `console.table`  to print the object in tabular form.
For example, let suppose you have the following object in your code and you want to write in the table

```javascript
const car = [
    { name: 'Honda', color: 'red' },
    { name: 'BMW', color: 'blue' },
    { name: 'Toyota', color: 'white' }
  ];

```
 [![](https://1.bp.blogspot.com/-AqLadGxndcs/Xp1cXcO44EI/AAAAAAAAMOU/aTobb2NngK4uUqZU_zklslU3fW7-QVCfQCPcBGAYYCw/s1600/console_table.png)](https://1.bp.blogspot.com/-AqLadGxndcs/Xp1cXcO44EI/AAAAAAAAMOU/aTobb2NngK4uUqZU_zklslU3fW7-QVCfQCPcBGAYYCw/s1600/console_table.png)

  
# `console.trace`

If you want to print the trace of function execution, you can use  `console.trace`  to print the performance of your function.

```javascript
function fact(number) {
    if (number < 1) {
      return 1;
    }
    else {
      console.trace(`calling fact(${number})`)
      return number * this.fact(number - 1);
    }
  }

```
 

[![](https://1.bp.blogspot.com/-FN_hbzAFtmM/XqKjch-m-PI/AAAAAAAAMPE/bdu_vesN9s0MGITiqtOa1bHmESu0hygMgCLcBGAsYHQ/s1600/trace.png)](https://1.bp.blogspot.com/-FN_hbzAFtmM/XqKjch-m-PI/AAAAAAAAMPE/bdu_vesN9s0MGITiqtOa1bHmESu0hygMgCLcBGAsYHQ/s1600/trace.png)


## `console.time`  and  `console.timeEnd`

Let's suppose you want to profile any function in javascript and want to check the execution time then you can use  `console.time.`  and  `console.timeEnd`  function. Just wrap your function in-between  `console.time`  and  `console.timeEnd`  as shown below

```javascript
function fact(n){
    if(n){
        return 1;
    }else{
        return n*fact(n-1);
    }
}
console.time('fact');
fact(40);
console.timeEnd(`fact`);

```
 
[![](https://1.bp.blogspot.com/-O0DsWl3URbs/XqKjo0XPErI/AAAAAAAAMPI/_OCvM7y7XxY33Sc0igPbTFBrM29EJjnDQCLcBGAsYHQ/s1600/console.time.png)](https://1.bp.blogspot.com/-O0DsWl3URbs/XqKjo0XPErI/AAAAAAAAMPI/_OCvM7y7XxY33Sc0igPbTFBrM29EJjnDQCLcBGAsYHQ/s1600/console.time.png)

## console.count

`console.count([obj])`  This function logs the number of times that this particular call to count() has been called. This function takes an optional argument label.

## console.clear

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ0MzU1ODA0OCwtODM1NzUzNzUzXX0=
-->