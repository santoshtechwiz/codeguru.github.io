
>You are given an integer array  `coins`  representing coins of different denominations and an integer  `amount`  representing a total amount of money.

Return  _the fewest number of coins that you need to make up that amount_. If that amount of money cannot be made up by any combination of the coins, return  `-1`.

You may assume that you have an infinite number of each kind of coin.
Example 1:

Input: coins = [1,2], amount = 4
Output: 2
Explanation: 4 = 2 + 2,4=1+1+2 

## The recursion formual for coin change as below

$$
  coinchange(j,a) =
\begin{cases}
\infty,  & \text{if $j$<0} \\
0,  & \text{if $j$ =0} \\
 1+\min(\sum_{i=k}^n c[j-a_i]) & \text{if $j$ >1}
\end{cases}
$$

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






## Recursion Tree

![](https://1.bp.blogspot.com/-qJf9RTk0_VQ/YLxz6UPEheI/AAAAAAAAOwE/3V0MQCcf4NkyqdmZArvcc7_0LEpjUYMIgCLcBGAsYHQ/w400-h272/coin-change.gif)

>This article only show you how to write recursive program. I know this is not optimized way to write coin change problem{alertError}
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoiZXh0ZW5zaW9uczpcbiBcbiAga2F0ZX
g6XG4gICAgZW5hYmxlZDogdHJ1ZVxuIiwiaGlzdG9yeSI6Wy02
OTIyNjE0MzgsLTE3NDg4OTY4MTIsMTk3NjkyNzEzOSwxMjYyNj
k3ODA1LDg1MTQxMTIzLC05MDg5OTkzMDhdfQ==
-->