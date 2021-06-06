>You are given an integer array  `coins`  representing coins of different denominations and an integer  `amount`  representing a total amount of money.

Return  _the fewest number of coins that you need to make up that amount_. If that amount of money cannot be made up by any combination of the coins, return  `-1`.

You may assume that you have an infinite number of each kind of coin.
>**Example 1:**

**Input:** coins = [1,2], amount = 4
**Output:** 2
**Explanation:** 11 = 2 + 2 


```javascript
function coin_change(v) {
  // if remaining  coin is zero return
  if (v == 0) return 0
  // if coin is negative return some large value
  if (v < 0) return Infinity
  
  let ans = Infinity
  for (const coin of coins)
    ans = Math.min(
      ans,
      1 + fn(v - coin)
    )
  return ans
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjg1MDkwOTI0XX0=
-->