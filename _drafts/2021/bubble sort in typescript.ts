
In this post , I will show you how to implement bubble sort in typescript
### Bubble Sort



![](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)

> By Swfung8 - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=14953478

``` typescript
export function bubbleSort(arr: Array<number>): Array<number> {
  for (let outer = arr.length; outer >= 0; outer--) {
    for (let inner = 0; inner < outer; inner++) {
      if (arr[inner] > arr[inner + 1]) {
        [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]];
      }
    }
  }
  return arr;
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTYwMDE0NDcxNF19
-->