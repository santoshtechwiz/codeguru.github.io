LINQ (Language integrated query) is a compelling feature of c#. By using LINQ, we can simplify the code very easily in fewer lines of code. 
In this example, I will show you how to convert an array of string to the collection of an integer using LINQ `select` operator

Let's consider the following array
```csharp
var inputs=new[]{"1","2","3","10","4"};
```
Now, you want to convert to `integer` array using LINQ. 
It's simple apply the `select` opeator and pass `Convert.ToInt32` as argument. As shown below
```csharp
void Main()
{
	var inputs=new[]{"1","2","3","10","4"};
	var intArray=inputs.Select(i => Convert.ToInt32(i));
	Console.WriteLine(intArray);
	Console.WriteLine(intArray.GetType());
}
```


<!--stackedit_data:
eyJoaXN0b3J5IjpbNjg0OTY3MTIxLDY2MjEzNTYxM119
-->