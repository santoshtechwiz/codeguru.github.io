In this article, I will show you how to shuffle an array in javascript. Suffling or randomization is used in security or game design. In order to shuffle or randomized the item we need the efficinent algorithm. Here We will use The modern version of the Fisher-Yates shuffle, designed for computer use, was introduced by  [Richard Durstenfeld](https://en.wikipedia.org/w/index.php?title=Richard_Durstenfeld&action=edit&redlink=1 "Richard Durstenfeld (page does not exist)")  in 1964

The algorithm for shuffling the array is very simple.

```
-- To shuffle an array an of n elements (indices 0..n-1):
for i from n−1 downto 1 do
     j ← random integer such that 0 ≤ j ≤ i
     exchange a[j] and a[i]

```

I will translate the above algorithm to javascript. First, we need a function that generates a random number between 0 and the array’s length. The following function is .self-explanatory

[Generate a random number between two numbers in JavaScript](https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript)

```javascript
function randomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min);
}

```

```javascript
function arrayShuffle(arr){
  for (let i = 0; i < arr.length; i++) {
    let randIndex = randomNumber(0, arr.length - 1);
    let temp = arr[i];
    arr[i] = arr[randIndex];
    arr[randIndex] = temp;
  }

  return arr;
}

```

As you can see in the above algorithm, we are looping through the array and generating random index and swapping with the current element. Once the loop is finished, the array is shuffled.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTk1MDgyOTAwMl19
-->