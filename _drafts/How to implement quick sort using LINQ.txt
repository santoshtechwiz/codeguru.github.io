


```csharp
void Main()
{
	int[] array = { 1, 20, 3, 40, 5 };
	var sortedResult=QuickSort(array)
}
IEnumerable<int> QuickSort(IEnumerable<int> arr)
{
	//Base case
	if (arr.Count() <= 1)
	{
		return arr;
	}
	// Choose pivot point (in this example first item)
	var pivot = arr.First();
	// Split the array 
	var less = arr.Where(a => a < pivot);
	var greater = arr.Where(a => a > pivot);
	var equal = arr.Where(a => a == pivot);
	// recursive
	return QuickSort(less).Concat(QuickSort(equal)).Concat(QuickSort(greater));
}

```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI5NTMyMjczXX0=
-->