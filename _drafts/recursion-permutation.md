

In this post, I will show you how to generate the permutations of a given string in c#. This problem is perfect example of recursion technique.

## What is recursion

In computer science, recursion is a programming technique using function or algorithm that calls itself one or more times until a specified condition is met at which time the rest of each repetition is processed from the last one called to the first.


Pseudocode:
-  if you have no more characters left to rearrange
-  print current permutation
  - for (every possible choice among the characters left
to rearrange){

-  Make a choice and add that character to the permutation 
 so far
 - Use recursion to rearrange the remaining letters


```csharp
using System.Collections.Generic;
using System;
using System.Generic;
using System.Linq;
using System.Text;
namespace Permutation
{
    class Program
    {
    static void Main(string[] args)
        {
            Permutation("abc");
        }
    public static void Permutation(string input)
        {
            RecPermutation("", input);
        }
    private static void RecPermutation(string soFar, string input)
        {
    if (string.IsNullOrEmpty(input))
            {
                Console.WriteLine(soFar);
    return;
            }
    else
            {
    for (int i = 0; i < input.Length; i++)
                {
                    
    string remaining = input.Substring(0, i) + input.Substring(i + 1);
                    RecPermutation(soFar + input[i], remaining);
                }
            }
        }
    }
}

```

## Recursion Tree Visualization

![](https://1.bp.blogspot.com/-p2ifD-oxOUM/YLxsBJZLpnI/AAAAAAAAOv8/pz_FPx595o8rNkgilEqfo2T27dPSLwbTgCLcBGAsYHQ/s16000/permutation.gif)
Happy Coding 😊
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQzMTE2MjMxMl19
-->
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTYxNTYwODU5MF19
-->