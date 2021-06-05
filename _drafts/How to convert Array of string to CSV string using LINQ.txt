LINQ (Language integrated query) is a compelling feature of c#. By using LINQ, we can simplify the code very easily in fewer lines of code. 
In this example, I will show you how to convert an array of string to CSV using LINQ aggregate operator


Let's consider the following array
```csharp
	var names = new string[]{ "John", "Bill", "Steav", "Sundar", "Dell"};
```
### Expected output
```csharp
John,Bill,Steav,Sundar,Dell
```
Let's first solve the problem using iterative approach.

```csharp
public string ConvertToCSV(string[] names){
	var builder=new StringBuilder();
	foreach(var name in names){
		builder.Append(name+",");
    }
    return builder.ToString(); // take note of extra ','
}
```
Now let's solve the same problem using LINQ `Aggregate` operator. For this problem I am going to use following version of `Aggregate` method

```csharp
void Main()
{
	var names = new string[]{ "John", "Bill", "Steav", "Sundar", "Dell"};
	
	var csv=names.Aggregate ((acc,currentItem) =>acc+","+currentItem );
	Console.WriteLine(csv);

}
```
### Question 2
Let consider another example You have a list of numbers and you want to sum. Here also we can use `Aggregate` operator
```csharp
void Main()
{
	var numbers = new int[] { 1, 2, 3, 4, 5, 6, 7, 8};
	var sum=numbers.Aggregate ((acc,currentItem) =>acc*currentItem );
	Console.WriteLine(sum);

}
```
> If you did not pass any seed value C# automatically select the first item as an accumulator

### Question 3
Given an array of numbers add all the numbers and with 
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2NDU4MDg0OTYsLTEzODI0MzA4ODMsLT
YxMTAzMzc1MCw2NjI0MDE2MTEsLTEwNjM0OTgxNTRdfQ==
-->