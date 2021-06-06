## Compare Record and Class

As per the microsoft

> C# 9.0 introduces ***record types***. You use the `record` keyword to define a reference type that provides built-in functionality for encapsulating data. You can create record types with immutable properties by using positional parameters or standard property syntax:



```csharp
public record RPerson(string FirstName,string LastName);
```

## 

If you want to create a class which have the same behavior as above statement then you can achieve by using class as shown below ( its not full source code there is a lot when record is converted to C#)

```csharp
public class CPerson{
	
	public string FirstName { get; init; }
	public string LastName { get; init; }
	
	public CPerson(string firstName,string lastName)
	{
		FirstName=firstName;
		LastName=lastName;
	}
}
```



## Let's Compare the diffrence between class and record with example





```csharp
void Main()
{
	var rPerson1=new RPerson("John","Doe");
	var rPerson2=new RPerson("John","Doe");

	var cPerson1 = new RPerson("John", "Doe");
	var cPerson2 = new RPerson("John", "Doe");

}

```

## Record by Default override `Object.Equal`

`Record` by default override `Object.Equal` method in order to compare two record. If record have same value then its return true otherwise false.

See the following example


```csharp
var cPerson1 = new CPerson("John", "Doe");
var cPerson2 = new CPerson("John", "Doe");
Console.WriteLine(rPerson1.Equals(rPerson2)); // True
Console.WriteLine(cPerson1.Equals(cPerson2)); // False
```
> Note: C# compare record type by value not by refrence. If you try to compare there refrences both will be diffrent.


## Record By Default override `GetHashCode`
Record override `GetHashCode` method internally. 
If you compare two records with same value there hash code will be same. see the below example

```csharp
Console.WriteLine(rPerson1.GetHashCode()==rPerson2.GetHashCode()); // True
Console.WriteLine(cPerson1.GetHashCode()==cPerson2.GetHashCode()); // False
```

## Record by Default override `ToString`
Record provide override version of `ToString` which print the record in nicely format while class print the name

```csharp
Console.WriteLine(rPerson1.ToString()); // RPerson { FirstName = John, LastName = Doe }
Console.WriteLine(cPerson1.ToString()); // CPerson
```

## record == and !=santosh

Record already provide operator overloding for == and != so it easy to compare two records.

```csharp
Console.WriteLine(rPerson1==rPerson2); // True
Console.WriteLine(cPerson1==cPerson2); // False
```


## Create copy of record with `with` syntax.

```csharp
	var rPersonCopy = rPerson1 with {
		
		FirstName="Updated Name"
	};
	Console.WriteLine(rPersonCopy); // RPerson { FirstName = Updated Name, LastName = Doe }
	Console.WriteLine(rPerson1==rPersonCopy); // False

```


## When to use Record

- Loading external data from API or Database that does;not change.
- Thread Safe
- Processing Huge Data
- Read only data

## Whn not to use Record

When you need to change the data like database operations

- Record type can only inherit from another record not from class
 - By default Record type is imutable but you can create mutable record but not recommended
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE2MzMxODY1MF19
-->