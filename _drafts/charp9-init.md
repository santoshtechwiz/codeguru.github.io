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
>CS8852 Init-only property or indexer 'Blog.Title' can only be assigned in an object initializer, or on 'this' or 'base' in an instance constructor or an 'init' accessor.{alertError}

## You can assign init only propery in constructor also

```csharp
var newBlog=new Blog{Description="New Description"};
Console.WriteLine(newBlog);

public class Blog
{
	public string Title { get; init; } //init-only
	public string Description { get; init; } //init-only
	public Blog()
	{
		Title="Title From Constructor";
	}

}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbODY4OTU4ODE1LC04MzUxNTgyODAsNzMwOT
k4MTE2XX0=
-->