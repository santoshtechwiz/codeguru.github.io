In this post, I am going to show you how to implement the bubble sorting in c#.

## What is Bubble Sort

Bubble sort is a simple sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order.

## Bubble Sort Animation

[![](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fc%2Fc8%2FBubble-sort-example-300px.gif&container=blogger&gadget=a&rewriteMime=image%2F*)](http://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)

  
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace SortingDemo
{
    public class BubbleSort
    {
    public void BubbleSort()
        {
    //Initialize array data
    int[] data = { 5, 3, 6, 1, 8, 7, 2, 4 };
           
    for (int outerIndex = 0; outerIndex < data.Length; outerIndex++)
            {
    for (int innerIndex = 0; innerIndex < data.Length-1; innerIndex++)
                {
                    
    if (data[innerIndex] > data[innerIndex+1])
                    {
    //swap data.
                        Swap(data, innerIndex);
                    }
                }
            }
        }
    private static void Swap(int[] data, int innerIndex)
        {
    int temp = data[innerIndex + 1];
            data[innerIndex + 1] = data[innerIndex];
            data[innerIndex] = temp;
        }
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMzQzMTIzMDcyXX0=
-->