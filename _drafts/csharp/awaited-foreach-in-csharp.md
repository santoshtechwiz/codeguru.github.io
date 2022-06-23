
In this blog post I will show you how to await foreach loop in C#. Onwards c# we can use `async foreach` in our code. In order to use `async foreach` your method must return `IAsyncEnumerable<T>` . 
Let's understand it with one example

```csharp

public async IAsyncEnumerable<string> GetPostAsync()
{
	using var httpClient = new HttpClient()
	{
		BaseAddress = new Uri("https://jsonplaceholder.typicode.com/todos/")
	};

	for (int i = 1; i < 100; i++)
	{

		var data = await httpClient.GetStringAsync(i.ToString());
		yield return data;

	}
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwNzgzOTExMjJdfQ==
-->