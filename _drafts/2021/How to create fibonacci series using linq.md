In this post I am going to show you how to generate fiboancci number series using Linq.

### What is Fibonacci series : 

The Fibonacci Sequence is the series of numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... The next number is found by adding up the two numbers before it.

```csharp
 public static IEnumerable<int> Fib(int n)
        {
            List<int> fibs = new List<int>();
            Enumerable.Range(0, n)
                .ToList()
                .ForEach(f => fibs.Add((f <= 1 ? 1 : fibs[f - 2] + fibs[f - 1])));
            return fibs;


        }
 ```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI4NTkwODUzOF19
-->