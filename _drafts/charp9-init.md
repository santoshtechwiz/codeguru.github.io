You can use a 'init' accessor instead of a `set` accessor to declare a property in C# 9. Only an object's initializer can set init-only properties, which are generally read-only:

Large immutable classes can be created with init-only properties rather than the anti-pattern of writing a function Object() { [native code] } with thousands of optional parameters

```csharp

public class Blog{

	public string Title { get; init; } //init-only
	public string Description { get; init;} //init-only
	
}
```
## Usage
```csharp
var blog = new Blog { Title = "C# 9 New Feature", Description = "C# init create read only property" };
Console.WriteLine(blog); // It will print the output to console
```
But if you assign to 

```csharp
blog.Title="Some other title"; 
```




<!--stackedit_data:
eyJoaXN0b3J5IjpbOTY4NDkyMjczLC04MzUxNTgyODAsNzMwOT
k4MTE2XX0=
-->