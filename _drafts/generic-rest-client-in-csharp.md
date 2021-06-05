## Create Generic Rest Client

In this post I will show you how to create rest cliet

```csharp
void Main()
{
	var todoClient = new TodoClient();
	var todo = todoClient.Get("1");
	Console.WriteLine(todo);
	var todos=todoClient.GetAll();
	Console.WriteLine(todos);


}
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
public class RestClient<TResource, TIdentifier> where TResource : class
{


	private HttpClient httpClient;
	protected readonly string _baseAddress;
	private readonly string _addressSuffix;

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
}
```