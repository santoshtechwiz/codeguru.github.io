
In this blog post I will show you how to await foreach loop in C#. Onwards c# we can use `async foreach` in our code. In order to use `async foreach` your method must return `IAsyncEnumerable<T>` . 
Let's understand it with one example. In the following code snippet I am making request to `JsonPlaceHolder` api. Instead of preparing the data I am returning the data immediatly using the c# state machine operator `yield`

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

In order to use the above method you can simply write the foreach loop and then prefix the foreach with `await` operator


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
eyJoaXN0b3J5IjpbLTc5MDgxODc4Ml19
-->