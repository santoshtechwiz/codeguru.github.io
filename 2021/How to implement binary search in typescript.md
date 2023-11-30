In this article, I will discuss how to implement `Binary Search` in typescript.

### What is Binaary Search
>Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated, and the search continues on the remaining half, again taking the middle element to compare to the target value, and repeating this until the target value is found. If the search ends with the remaining half being empty, the target is not in the array.
---
Pseudo Code

 

```javascript
export function binarySearch(nums: Array<number>, key: number): number {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    mid;
    if (nums[mid] === key) {
      return mid + 1;
    }
    if (key > nums[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}
```
## Animation

<img src="https://1.bp.blogspot.com/-D1FhJn-pbbI/Xq-0NbMLyfI/AAAAAAAAMWI/tY2jT3JZqUQWkqomgtd91E23ldYkzVrqACLcBGAsYHQ/s1600/binary_search.gif">

## Complexsites

- Worst-case performance	O(log n)
- Best-case performance	O(1)
- Average performance	O(log n)
- Worst-case space complexity

## Further reading

[WikiPedeia](https://en.wikipedia.org/wiki/Binary_search_algorithm)

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTY4NjU4NjI5MCwxNDYwNTQyMTQwLDU1OT
g2MzUwMywtMTkwMjYwMjc3MywxODQwODcyMTI2LDE1NzEyMjg0
ODUsLTEyMDYwNjUyNDFdfQ==
-->