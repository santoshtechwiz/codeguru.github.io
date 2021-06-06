
## Compare Record and Class

As per the Microsoft

> C# 9.0 introduces ***record types***. You use the `record` keyword to define a reference type that provides built-in functionality for encapsulating data. You can create record types with immutable properties by using positional parameters or standard property syntax:

```csharp
public record RPerson(string FirstName,string LastName);
```

If you want to create a class which have the same behaviour as the above statement, then you can achieve it by using class as shown below ( its not complete source code. There is a lot when the Record is converted to C#)

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


## Let's Compare the difference between class and Record with an example

In order to understand the diffrences I have a create a simple console application as shown below. There are two instances of each record and class.

```csharp
void Main()
{
	var rPerson1=new RPerson("John","Doe");
	var rPerson2=new RPerson("John","Doe");

	var cPerson1 = new RPerson("John", "Doe");
	var cPerson2 = new RPerson("John", "Doe");

}

```

## Record by Default  provide Value equality

`Record` by default override `Object.Equal` method to compare two Record. Suppose Record have the same value, then its return true otherwise false.

See the following example.


```csharp
var cPerson1 = new CPerson("John", "Doe");
var cPerson2 = new CPerson("John", "Doe");
Console.WriteLine(rPerson1.Equals(rPerson2)); // True
Console.WriteLine(cPerson1.Equals(cPerson2)); // False
```
> Note: C# compare record type by value, not by reference. If you try to compare their references, both will be different.


## Record By Default override `GetHashCode`
Record override the `GetHashCode` method internally. 
If you compare two records with the same value there, the hash code will be the same. see the below example

```csharp
Console.WriteLine(rPerson1.GetHashCode()==rPerson2.GetHashCode()); // True
Console.WriteLine(cPerson1.GetHashCode()==cPerson2.GetHashCode()); // False
```

## Built-in formatting for display

Record provide override version of `ToString`, which print the Record in the friendly format while class print the name.

```csharp
Console.WriteLine(rPerson1.ToString()); // RPerson { FirstName = John, LastName = Doe }
Console.WriteLine(cPerson1.ToString()); // CPerson
```

## record == and !=santosh

The Record already provide operator overloading for == and !=, so it is easy to compare two records.

```csharp
Console.WriteLine(rPerson1==rPerson2); // True
Console.WriteLine(cPerson1==cPerson2); // False
```


## Create a copy of Record with `with` syntax.

```csharp
	var rPersonCopy = rPerson1 with {
		
		FirstName="Updated Name"
	};
	Console.WriteLine(rPersonCopy); // RPerson { FirstName = Updated Name, LastName = Doe }
	Console.WriteLine(rPerson1==rPersonCopy); // False

```


## When to use Record

- Loading external data from API or Database that does; not change.
- Thread Safe
- Processing Huge Data
- Read-only data

## When not to use Record

When you need to change the data like database operations

## Record Other features

- Record type can only inherit from another record, not from class
 - By default, the Record type is immutable, but you can create mutable Record but not recommended
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwNDMxMjc2MDIsLTE1MDIyODUyODZdfQ
==
-->