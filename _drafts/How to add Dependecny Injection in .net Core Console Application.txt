# How to add Dependency Injection in .net core console application

> In this post I will show you how to configure DI in .net core application. .Net core provides out of the box features Dependency injection.

# What is Dependency Injection

As per the Wikipedia
>In software engineering, dependency injection is a technique in which an object receives other objects that it depends on. These other objects are called dependencies. In the typical "using" relationship the receiving object is called a client, and the passed (that is, "injected") purpose is called a service.

Before .NET core developers used open-source DI container to achieve the loose coupling in their applications. Below are a few popular  DI container used in .net application

- Castle Windsor
- StructureMap 
- Unity
- Autofac

Now in .net core, DI is a first-class citizen. .Net Core exposed two classes `IServiceProvider` and `ServiceCollection` to implement the DI in .net core application.
Let's start the coding.


## Step1
- Create a new console application and add two interfaces `IHtmlService` and `IPrintService` as shown below

```csharp
public interface IHtmlService
{
	void GenerateHtml();
}

public interface IPrintService
{
	void Print();
}
```
## Step2 
- Provide the implementation for this two interface
```csharp
public class PrintService : IPrintService
{
	private readonly IHtmlService _fooService;
	public PrintService(IHtmlService fooService)
	{
		_fooService = fooService;
	}

	public void Print()
	{


		_fooService.GenerateHtml();

	}
}

public class HtmlService : IHtmlService
{
	private readonly ILogger<HtmlService> _logger;

	public HtmlService(ILoggerFactory loggerFactory)
	{
		_logger = loggerFactory.CreateLogger<HtmlService>();

	}

	public void GenerateHtml()
	{

		_logger.LogInformation($"Generating HTML");
	}
}
```
## Step3
- Create a startup class in your application and add the following code. Here we are creating instance of `ServiceCollection` class and adding the dependency to the collection.
```csharp
public class Startup
{


	public static ServiceProvider Configure()
	{
		var provider = new ServiceCollection()
					.AddTransient<IHtmlService, HtmlService>()
					.AddLogging(fs => fs.AddConsole())
					.AddTransient<IPrintService, PrintService>()
					.BuildServiceProvider();
		return provider;
	}

}
```
> IServiceProvider is the simple built-in container that is included in ASP.NET Core that supports constructor injection by default.

## Step4
- Go to `Main` method and paste the following code
```csharp
void Main()
{

	var container = Startup.Configure();
	var print = container.GetService<IPrintService>();
	print.Print();
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE1MTQzOTgwNSwtMTg2OTcwMjQ4Myw2Nz
E4MDc0NDAsMjA3NjU3Mjg5XX0=
-->