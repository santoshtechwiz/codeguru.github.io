## Create Generic Rest Client

In this article, We will look at a generic asynchronous RESTful  HttpClient used with any service. This class will make it extremely simple for us to create RESTful clients that interact with RESTful services. Take a look at this post if you want to build a RESTful cross-domain client.

>HttpClient Provides a class for sending HTTP requests and receiving HTTP responses from a resource identified by a URI.{alertInfo}

>RestClient.cs

Create a generic class with two parameter `TResource` and `TIdentifier`


```csharp
public class RestClient<TResource, TIdentifier> : IDisposable where TResource : class
{


	private HttpClient httpClient;
	protected readonly string _baseAddress;
	private readonly string _addressSuffix;
	private bool disposed = false;

	public RestClient(string baseAddress, string addressSuffix)
	{
		_baseAddress = baseAddress;
		_addressSuffix = addressSuffix;
		httpClient = CreateHttpClient(_baseAddress);
	}
	protected virtual HttpClient CreateHttpClient(string serviceBaseAddress)
	{
		httpClient = new HttpClient();
		httpClient.BaseAddress = new Uri(serviceBaseAddress);
		return httpClient;
	}
	public async Task<TResource> GetAsync(TIdentifier identifier)
	{
		var responseMessage = await httpClient.GetAsync(_addressSuffix + identifier.ToString());
		responseMessage.EnsureSuccessStatusCode();
		return await responseMessage.Content.ReadAsAsync<TResource>();
	}
	public async Task<IEnumerable<TResource>> GetAll()
	{
		var responseMessage = await httpClient.GetAsync(_addressSuffix);
		responseMessage.EnsureSuccessStatusCode();
		return await responseMessage.Content.ReadAsAsync<IEnumerable<TResource>>();
	}

	public void Dispose()
	{
		Dispose(true);
		GC.SuppressFinalize(this);
	}

	private void Dispose(bool disposing)
	{
		if (!disposed && disposing)
		{
			if (httpClient != null)
			{
				httpClient.Dispose();
			}
			disposed = true;
		}
	}
}
```

> TodoClient

Now you can use the generic RestClient in any service with type arguments

```csharp
public class Todo
{
	public int userId { get; set; }
	public int id { get; set; }
	public string title { get; set; }
	public bool completed { get; set; }
}

public class TodoClient
{
	private readonly RestClient<Todo, string> _restClient;
	private readonly string baseAddress = "https://jsonplaceholder.typicode.com/";
	public TodoClient()
	{
		_restClient = new RestClient<Todo, string>(baseAddress, "todos/");
	}
	public async Task<Todo> Get(string id)
	{
		var result = await _restClient.GetAsync(id);
		return result;
	}
	public async Task<IEnumerable<Todo>> GetAll()
	{
		var result = await _restClient.GetAll();
		return result;
	}


}
```

## How to use the Generic Client

```csharp

void Main()
{
	var todoClient = new TodoClient();
	var todo = todoClient.Get("1");
	Console.WriteLine(todo);
	var todos = todoClient.GetAll();
	Console.WriteLine(todos);


}
```