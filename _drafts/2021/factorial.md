In this Data Structure series today, I am going to discuss how to calculate factorial of any given number (In range) using recursion.

## What is recursion
Recursion is a technique in which function calls itself. When using recursion, we have to take care of the following two conditions.

- Base Case- Termination condition for the programme
- Recursive case

``` javascript
function fact(num:number):number{
		if(number<1){
			return 1;
			}
			else{
		return num*fact(num-1);
	}
}
```
## Animation



### Further reading
[MIT Course](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/lecture-videos/lecture-6-recursion-and-dictionaries/)

[Recursion- WikiPedia](https://en.wikipedia.org/wiki/Recursion)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MTUwNTg0OTZdfQ==
-->