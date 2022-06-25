  -   [Why Mocking?](https://www.codeguru.co.in/2021/05/c-mock-protected-async-method-using-moq.html#why-mocking)
    -   [What is Partial Mock?](https://www.codeguru.co.in/2021/05/c-mock-protected-async-method-using-moq.html#what-is-partial-mock)
    -   [Example](https://www.codeguru.co.in/2021/05/c-mock-protected-async-method-using-moq.html#example)
    -   [How to mock the protected method](https://www.codeguru.co.in/2021/05/c-mock-protected-async-method-using-moq.html#how-to-mock-the-protected-method)
    -   [Limitations](https://www.codeguru.co.in/2021/05/c-mock-protected-async-method-using-moq.html#limitations)

In this blog post I will show you shome tips and trics of `Moq` framework. Like how to moq protected method,how to 

## Why Mocking?

An object you want to test can depend on other complex things. So you substitute the other objects for mocks simulating the conduct of the actual objects to isolate their behaviour. Simply put, mocking creates objects that mimic true objects’ behaviour.

> Moq is commonly used to create mock objects based on interfaces.  
> However, in some cases, Moq allows creating Moq of the classes that are called Partial Moq.

## What is Partial Mock?

> Partial mocking is where you take a class and ask it to behave as usual, except you want to override certain functionality.

## Example

This post will show you how to mock the async protected method in C# using the MOQ framework. The mocking protected method is a little bit tricky, but it’s straightforward.

```csharp

public class ServiceHelper
{
	public async Task<string> GetData(string url)
	{
		var result = await SendRequest(url);
		Console.WriteLine("Doing some real work");
		return result;
	}
	protected virtual async Task<string> SendRequest(string url)
	{
		Console.WriteLine($"Sending Request to {url}");
		var result = await Task.FromResult("From Protected Method");
		return result;
	}
}


```

Let’s write a unit test for the public method.

```csharp
public class ServiceHelperTest
{
	[Fact]
	public async Task Should_call_protected_method()
	{
		var p = new ServiceHelper();
		var data = await p.GetData("https://jsonplaceholder.typicode.com/todos/1");
		Assert.Contains(data,"From Protected Method");
	}
}


```

As you can see, the test is calling the actual protected method.  
Let’s create a mock of the class and set up the behaviour; as you can see in the image below, IntelliSense is not showing the protected method. So let’s run the test without setup and see the result.

![](https://lh3.googleusercontent.com/-IPUaeQ6KFj8/YK-J2GKl4dI/AAAAAAAAOsI/4n_VNBMEwJETRzr__tPxxs6bU5rgJZLDACLcBGAsYHQ/s16000-rw/image.png)]

```csharp


[Fact]
	public async Task Should_throw_error_if_call_on_mock_object()
	{
		var mockService = new Mock<ServiceHelper>();
		var data = await mockService.Object.GetData("https://jsonplaceholder.typicode.com/todos/1");
		Assert.Contains(data, "From Protected Method");
	}

```

> You will get the following error

```bash
[FAIL] ServiceHelperTest.Should_throw_error_if_call_on_mock_object: 
Value cannot be null. (Parameter 'value')

```

## How to mock the protected method

. To Mock the protected method, you need to import the following namespace first.

```csharp
using Moq.Protected;

```

```csharp
   [Fact]
	public async Task Should_call_mock_method()
	{
		var mockService = new Mock<ServiceHelper>();
		mockService.Protected().Setup<Task<string>>("SendRequest", ItExpr.IsAny<string>()).ReturnsAsync(() => "From Mock")
			.Verifiable();
		var result = await mockService.Object.GetData("https://jsonplaceholder.typicode.com/todos/1");
		Assert.Contains(result,"From Mock");
		mockService.Verify();
	}


```

If you run the above test case, you can see that it’s calling the Moq method, and the test is pass.

## Limitations

-   > Only drawback with this API is that you will not get the IntelliSense when setup the moq
    
-   > When setting up an  `IProtectedMock`, you should use  `Moq.Protected.ItExpr`  instead of  `Moq. It`.
    

[C# mock HttpClientFactory-HttpClient](https://www.codeguru.co.in/2020/05/easily-mock-htppclient-in-c-using-moq.html)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQzNDY2NzIxOF19
-->