>You are given an integer array  `coins`  representing coins of different denominations and an integer  `amount`  representing a total amount of money.

Return  _the fewest number of coins that you need to make up that amount_. If that amount of money cannot be made up by any combination of the coins, return  `-1`.

You may assume that you have an infinite number of each kind of coin.
>**Example 1:**

**Input:** coins = [1,2], amount = 4
**Output:** 2
**Explanation:** 11 = 2 + 2 


```javascript
function coin_change(amount) {
  // if remaining  coin is zero return
  if (amount == 0) return 0
  // if coin is negative return some large value
  if (amount < 0) return Infinity
  
  let ans = Infinity
  for (const coin of coins)
    ans = Math.min(
      ans,
      1 + coin_change(amount - coin)
    )
  return ans
}
```

## How The aboive code is running
```
C[0] = 0; C[1] = min    1 + C[1 − 50] = ∞ 1 + C[1 − 25] = ∞ 1 + C[1 − 10] = ∞ 1 + C[1 − 1] = 1 C[2] = min    1 + C[2 − 50] = ∞ 1 + C[2 − 25] = ∞ 1 + C[2 − 10] = ∞ 1 + C[2 − 1] = 2 Similarly, C[3] = 3; C[4] = 4; ...; C[9] = 9; C[10] = 1;
```
## Recursion Tree

![](https://1.bp.blogspot.com/-qJf9RTk0_VQ/YLxz6UPEheI/AAAAAAAAOwE/3V0MQCcf4NkyqdmZArvcc7_0LEpjUYMIgCLcBGAsYHQ/w400-h272/coin-change.gif)

>This article only show you how to write recursive program. I know this is not optimized way to write coin change problem{alertError}
<!--stackedit_data:
eyJoaXN0b3J5IjpbODUxNDExMjMsLTkwODk5OTMwOF19
-->