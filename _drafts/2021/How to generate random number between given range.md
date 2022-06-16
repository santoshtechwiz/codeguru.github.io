
In this article, I will show you how to generate a random number between the given range in javascript. In javascript `Math.random.` returns a floating-point, pseudo-random number in the range 0 to less than 1 (inclusive of 0, but not 1).

Follow the below steps.
- Generate the random number `Math.random()
- Multiply the generated number with the range (max-min)
- Take the floor `Math.floor.`
- If you want the inclusive range, then add one to the result

```javascript
const randomNumber=(min, max)=> {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(randomNumber(1,10));
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTcwNjIzNTg3LC00MTM5NjAyNTNdfQ==
-->