

This blog post will show you how to await the foreach loop in C#. Onwards c#, we can use `async foreach` in our code. To use `async foreach,` your method must return `IAsyncEnumerable<T>.` 
Let's understand it with one example. I am requesting the `JsonPlaceHolder` API in the following code snippet. Instead of preparing the data, I am returning the data immediately using the c# state machine operator `yield.`

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

## How to use

To use the above method, you can write the foreach loop and then prefix the foreach with the `await` operator


```csharp
async void Main()
{

	await foreach (var item in GetPostAsync())
	{
		Console.WriteLine(item);
	}
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc4MzcyMjY0NiwtNzkwODE4NzgyXX0=
-->