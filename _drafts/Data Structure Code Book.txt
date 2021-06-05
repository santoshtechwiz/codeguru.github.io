
# Wy Data Structure is important for Programmer

The **data structure** and algorithm provide a set of techniques to the **programmer** for handling the **data** efficiently. ... The **data structure** concepts can be implemented in any **programming** language. They can write the code in any **programming** language with minimal effort.

# How to mesaure the performance of an Alogrithm
In computer science to measure the performance of any alogrithm we used `Space` and `Time` Complexity. Time and space complexity depends on a lot of things like hardware,processor ,operating system etc. but while calculting the performance we don't consider these things.

# Space Complexity





# Sorting


## Bubble Sort
```csharp
void Main()
{
	var arr = new[] { -1, 4, 2, 11, 10, 3 };
	var sortedResult = BubbleSort(arr);


	Console.WriteLine(sortedResult);

}

public int[] BubbleSort(int[] arr)
{
	for (var outer = 0; outer < arr.Length; outer++)
	{
		for (var inner = 0; inner < arr.Length - outer - 1; inner++)
		{
			if (arr[inner] > arr[inner + 1])
			{
				var temp = arr[inner];
				arr[inner] = arr[inner+1];
				arr[inner+1] = temp;
			}
		}
	}
	return arr;
}
```

## Insertion Sort

## Algorithm

1.  Loop the array/list
2.  Add the first element from your input to the output set.
3.  If there are no more elements in the input set, you're done!
4.  Take the next element from your input and call it  `current`.
5.  Call the first element of your output set  `target`.
6.  Compare  `current`  to  `target`:

-   If  `target`  is larger than  `current`, insert  `current`  just before  `target`  then go to Step 3.
-   Else if it is not larger, move the name  `target`  to point to the next element in the output set and repeat Step 6.



```csharp

void Main()
{
	var arr = new[] { -1, 4, 2, 11, 10, 3 };
	var sortedResult = InsertionSort(arr);


	Console.WriteLine(sortedResult);
}

public int[] InsertionSort(int[] arr)
{
	// First item is already sorted. so start from second item
	for (int i = 1; i < arr.Length; i++)
	{
		int j = i;

		while (j > 0 && arr[j - 1] > arr[j])
		{
			int temp = arr[j];
			arr[j] = arr[j - 1];
			arr[j - 1] = temp;
			j--;
		}
	}
	return arr;
}
```

# Selection Sort

1 - Given an array of `n` items 
2-. Find the largest item x, in the range of [0…n−1] 3-.Swap x with the `(n−1)th` item 
4. Reduce n by 1 and go to Step 2

```csharp
void Main()
{
	
}

public void SelectionSort(int[] arr)
{
	for (int i = 0; i < arr.Length; i++)
	{
		int minIndex = i;
		for (int j = i + 1; j < arr.Length; j++)
		{
			if (arr[minIndex] > arr[j])
				minIndex = j;
		}
		if (minIndex != i)
		{
			int temp = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = temp;
		}

	}

}
```
# Quick Sort
The **quick sort** uses divide and conquer to gain the same advantages as the merge sort, while not using additional storage. As a trade-off, however, it is possible that the list may not be divided in half. When this happens, we will see that performance is diminished.
![](https://runestone.academy/runestone/books/published/pythonds/_images/partitionA.png)

```csharp
  

void Main()
{
	var arr = RandomList(100).ToArray();
	
//	var arr = new[] { 1, -1, 2, -2, -2 };


	Console.WriteLine("Before Sorting");
	Print(arr);
	Console.WriteLine("After Sorting");
	QuickSort(arr, 0, arr.Length - 1);
	Print(arr);
	
}
static List<int> RandomList(int size)
{
	List<int> ret = new List<int>(size);
	Random rand = new Random(1);
	for (int i = 0; i < size; i++)
	{
		ret.Add(rand.Next(size));
	}
	return ret;
}
int Partion(int[] arr, int l, int r)
{
	int left = l;
	int right = r;
	int pivot = arr[left];
	while (left < right)
	{
		while (arr[left] < pivot) left++;
		while (arr[right] > pivot) right--;
		if (left <= right)
		{
			int temp = arr[left];
			arr[left] = arr[right];
			arr[right] = temp;
			left++;
			right--;
		}

	}

	return left;

}
void QuickSort(int[] arr, int left, int right)
{
	int pivotIndex = Partion(arr, left, right);
	if (left < right)
	{
		QuickSort(arr, left, pivotIndex - 1);
		QuickSort(arr, pivotIndex, right);
	}
}

void Print(int[] arr)
{
	for (int i = 0; i < arr.Length; i++)
	{
		Console.Write(arr[i] + "|");

	}
	Console.WriteLine();
}
```


# Chapter 2 - Linkedlist
As per the wekipedia 
>In computer science, a linked list is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a collection of nodes which together represent a sequence. [Wikipedia](https://en.wikipedia.org/wiki/Linked_list)

Linked lists were developed in 1955–1956 by [Allen Newell](https://en.wikipedia.org/wiki/Allen_Newell "Allen Newell"), [Cliff Shaw](https://en.wikipedia.org/wiki/Cliff_Shaw "Cliff Shaw") and [Herbert A. Simon](https://en.wikipedia.org/wiki/Herbert_A._Simon "Herbert A. Simon") at [RAND Corporation](https://en.wikipedia.org/wiki/RAND_Corporation "RAND Corporation") as the primary [data structure](https://en.wikipedia.org/wiki/Data_structure "Data structure") for their [Information Processing Language](https://en.wikipedia.org/wiki/Information_Processing_Language "Information Processing Language")

## Singlylinked list
Singly linked lists contain nodes which have a data field as well as 'next' field, which points to the next node in line of nodes. Operations that can be performed on singly linked lists include insertion, deletion and traversal.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/612px-Singly-linked-list.svg.png)

```csharp
public class Node
{
	public int Data { get; set; }
	public Node Next { get; set; }
	public Node(int data)
	{
		this.Data = data;
		this.Next = null;
	}

}

public class LinkedList
{

	private Node _head;
	public LinkedList() { }

	public void Delete(int key)
	{
		Node prev = null;
		Node current = _head;
		bool found = false;
		if (current != null && current.Data == key)
		{
			_head = current.Next;
			return;

		}
		while (current.Next != null && !found)
		{
			if (current.Data == key)
			{
				prev.Next = current.Next;
				Console.WriteLine(current.Data + " Item Deleted");
				found = true;
			}
			else
			{
				prev = current;
				current = current.Next;
			}
		}
		if (!found)
			Console.WriteLine("Item was not in the list");

	}
	public void Search(int key)
	{
		Node current = _head;
		bool found = false;

		while (current.Next != null && found == false)
		{
			if (current.Data == key)
			{
				Console.WriteLine(current.Data + "Found");

				found = true;
			}
			current = current.Next;
		}
		if (!found)
		{
			Console.WriteLine("Not found");
		}

	}
	public void AddFirst(int data)
	{
		//1->2-3
		Node newNode = new Node(data);
		if (_head == null)
			_head = newNode;
		newNode.Next = _head;
		_head = newNode;


	}
	public void AddLast(int data)
	{
		Node newNode = new Node(data);
		if (_head == null)
			_head = newNode;
		else
		{
			Node current = _head;
			while (current.Next != null)
			{
				current = current.Next;
			}
			current.Next = newNode;
		}
	}
	public override string ToString()
	{
		StringBuilder builder = new StringBuilder();
		Node current = _head;
		while (current != null)
		{
			builder.Append(current.Data + "->");
			current = current.Next;

		}
		builder.Append("NULL");
		return builder.ToString();
	}

}
```


<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2MTE3ODM3MTcsMTEyMjQ0NzQ4NywxMT
YxMTIzNjM2LC0xNDMzMjI5MDk4LDg2NjcwOTIwNiwxMzg2NTQ3
ODMyLC0xNjEyOTA5MjM5LC0xMjUyNTM1MzhdfQ==
-->