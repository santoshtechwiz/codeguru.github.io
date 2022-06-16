
# What is Mock
Mocking is a process when writing the unit test case for the unit which have an external dependency like Network request or database call. The purpose of the mocking is to isolate the external dependency and focus on the code being tested.


## What is HttpClient
`HttpClient` is base class for sending the request and receiving the response from the server. You can read more about this [here](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=netcore-3.1)

Let's consider you have the following class, and you want to test this class using Nunit/xUnit. You can see this class is using `HttpClient`, which is an external dependency. Let's see the definition of HttpClient.

```csharp

    public class HttpClient : HttpMessageInvoker
    {
        //
        // Summary:
        //     Initializes a new instance of the System.Net.Http.HttpClient class using a System.Net.Http.HttpClientHandler
        //     that is disposed when this instance is disposed.
        public HttpClient();
        //
        // Summary:
        //     Initializes a new instance of the System.Net.Http.HttpClient class with the specified
        //     handler. The handler is disposed when this instance is disposed.
        //
        // Parameters:
        //   handler:
        //     The HTTP handler stack to use for sending requests.
        //
        // Exceptions:
        //   T:System.ArgumentNullException:
        //     The handler is null.
        public HttpClient(HttpMessageHandler handler);
        ...
   }
```
For unit tests, you don't mock `HttpClient`. Instead, you mock `HttpMessageHandler`. You can learn more about how to mock `Protected` member [here](https://github.com/Moq/moq4/wiki/Quickstart)



```csharp
public class RestClient
{
	private readonly HttpClient _httpClient;
	public RestClient(HttpClient httpClient)
	{
		_httpClient = httpClient;
		_httpClient.BaseAddress = new Uri("https://jsonplaceholder.typicode.com/");
	}
	public async Task<HttpResponseMessage> GetSomethingRemoteAsync(string url)
	{
		var result = await _httpClient.GetAsync("users");
		return result;
	}
}
```

Let's create a class `TestHelper.cs` and add one method named `GetFakeHttpClient` and paste the following code snippet



```csharp
public class TestHelper
{

	public static Mock<HttpMessageHandler> GetFakeHttpClient()
	{

		// ARRANGE
		var handlerMock = new Mock<HttpMessageHandler>(MockBehavior.Strict);
		handlerMock
		   .Protected()
				.Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
			   .ReturnsAsync(new HttpResponseMessage()
			   {
				   StatusCode = HttpStatusCode.OK,
				   Content = new StringContent("[{'id':1,'name':'Leanne Graham','email':'example@test.com'}]"),
			   }).Verifiable();
		return handlerMock;

	}
}
```

Now you can use the Fake HttpClient in your unit test as shown below.

```csharp
public class RestClientTest
{


	[Fact]
	public async Task It_Should_Return_Response_If_Input_Is_Valid()
	{
		var handlerMock = TestHelper.GetFakeHttpClient();
		var httpClient = new HttpClient(handlerMock.Object)
		{
			BaseAddress = new Uri("https://jsonplaceholder.typicode.com/"),
		};

		var restClient = new RestClient(httpClient);

		// ACT
		var result = await restClient
		   .GetSomethingRemoteAsync("users");

		Assert.Equal(HttpStatusCode.OK,result.StatusCode);
		Assert.NotNull(result);

		var expectedUri = new Uri("https://jsonplaceholder.typicode.com/users");

		handlerMock.Protected().Verify(
		   "SendAsync",
		   Times.Exactly(2), // we expected a single external request
		   ItExpr.Is<HttpRequestMessage>(req =>
			  req.Method == HttpMethod.Get
			  && req.RequestUri == expectedUri
		   ),
		   ItExpr.IsAny<CancellationToken>()
		);
	}
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTU1Mjc0ODQ5LDIzNzE3NTgxLC0xNjQwOD
I0ODU4LDgwNjQ4MTI1LDk0OTU4NTM0NF19
-->