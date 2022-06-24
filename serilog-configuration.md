### Table of contents

[What is SeriLog](https://www.blogger.com/blog/post/edit/6673695286148904603/4366762326115193244#)  
[What is Sink in serilog](https://www.blogger.com/blog/post/edit/6673695286148904603/4366762326115193244#)  
[What are the enrich in serilog?](https://www.blogger.com/blog/post/edit/6673695286148904603/4366762326115193244#)  
[How to configure Serilog in .NET Core](https://www.blogger.com/blog/post/edit/6673695286148904603/4366762326115193244#)  
[How to add enricher in Serilog?](https://www.blogger.com/blog/post/edit/6673695286148904603/4366762326115193244#)  
[How to add sink in Serilog?](https://www.blogger.com/blog/post/edit/6673695286148904603/4366762326115193244#)  
[Message template](https://www.blogger.com/blog/post/edit/6673695286148904603/4366762326115193244#)  
[How to override the log level](https://www.blogger.com/blog/post/edit/6673695286148904603/4366762326115193244#)

This blog will show you how to configure `Serilog` in the `asp.net` core application. Logging is significant in any application; by using logging, we can easily troubleshoot the production issue. `ASP.NET` core already provided the logging features, but this blog, we will discuss `Serilog` which is a very popular logging framework for .net core application

## What is SeriLog

`SeriLog`  is a structured logging library for a .NET core application. It is straightforward to integrate and provide a lot of output (Sink) format like  `Console`,`File`  And databases like SQLLite.

## What is Sink in serilog?

Sink in serilog means where serilog output the Log like standard output, file, or somewhere else. Serilog out of the box provides the following  [Sink](https://www.blogger.com/blog/post/edit/6673695286148904603/4366762326115193244#).

-   Console
-   File  
    Then syntax for using Sink are as follows

```csharp
Log.Logger = new LoggerConfiguration()
	 .WriteTo.Console()
	 .WriteTo.File(@"c:\\temp\\log.txt")
    .CreateLogger();

```

## What are the enrich in serilog?

Serilog  `Enrich`  allows you to add new property other than the ones originating from the message template. Some example of enrichers is like logging. `ThreadId`,`ProcessId`, machine name` etc. You can add them with the following syntax

```csharp
Log.Logger = new LoggerConfiguration()
    .Enrich.WithThreadId()
    .Enrich.WithMachineName()
    .CreateLogger();

```

## How to configure Serilog in .NET Core

**$ads={1}**

Integrating serilog in the .net core application is very straightforward.

#### STEP-1

Create an application using .net core CLI and then install the serilog library from the NuGet

```bash
dotnet new webapp loggerdemo
dotnet restore
dotnet add package Serilog.AspNetCore

```

#### STEP-2

Open  `Program.cs`  and add the following code snippet

```csharp
 public class Program
    {
        public static void Main(string[] args)
        {

            ConfigureSerilog();

            Log.Information("Starting the application");
            try
            {
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            finally
            {
                Log.Information("Application closed");
                Log.CloseAndFlush();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); }).UseSerilog();
		// Serilog configuration
        public static void ConfigureSerilog()
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .CreateLogger();
        }
    }

```

In the above code snippet, the serilog configuration is inside the  `ConfigureSerilog`  method. Let’s break down the technique.

-   The  `LoggerConfiguration` the class provides a fluent interface for building a logging pipeline
-   `WriteTo.Console()`  adds the console sink to the pipeline, which will log the events to standard output, which is the console in our case
-   `CreateLogger()`  assembles everything and returns a  `Logger`  object, which implements  `ILogger`
-   Now serilog pipeline is integrated with the .NET Core, and you can use  `Log.Information()`  and  `Log.Error()`  emit events through the logger

## How to add enricher in Serilog?

To add an enricher in serilog, first, you have to install the enricher from the NuGet package and then add the enricher in the pipeline, as shown below

```csharp
Log.Logger = new LoggerConfiguration()
    .Enrich.WithThreadId()
    .Enrich.WithMachineName()
    .CreateLogger();

```

In the above code snippet, I am adding two enrichers which will add  `ThreadId`  and  `MachineName`  to serilog log events

## How to add a sink in Serilog?

When you install the Serilog library in your application Serilog by default, install two sinks named  `Console`  and  `File`. But if you want to configure any other sink like SQLite sink, first you have to install the Sink from the NuGet, and then you can use the Sink as shown below.

```bash
dotnet add package Serilog.Sinks.SQLite

```

```csharp
Log.Logger = new LoggerConfiguration()
	 .WriteTo.Console()
	 .WriteTo.SQLite(@"c:\\temp\\log.db")
	 .WriteTo.File(@"c:\\temp\\log.txt")
    .CreateLogger();

```

Add  `WriteTo.SQLite`  and pass the database name. Now your log message will be written to Console, File, and SQLite database.  
![code guru](https://i.imgur.com/3vMeQBO.png "CodeGuru Serilog")

## Message template

Serilog provides a simple  `DSL`  for customizing the log message. Serilog Message templates are a superset of standard .NET format strings, so any format string acceptable will also be correctly processed by Serilog.

-   Property names are written between  `{`  and  `}`  brackets
-   Property names must be valid C# identifiers, for example  `FooBar`, but  **not**  `Foo.Bar`  or  `Foo-Bar`
-   Brackets can be escaped by doubling them, e.g.  `{{`  will be rendered as  `{`
-   Property names should use  `PascalCase`  for consistency with other code and libraries from the Serilog ecosystem.  
    Let’s consider you want to print the  `ThreadIs`  and  `MachineName`  in the log message then you can pass the message template as shown below

```csharp
 .WriteTo.File("c:\\temp\\log.txt", outputTemplate: "{Timestamp:yyyy-mm-dd} {MachineName} {ThreadId} {Message} {Exception:1} {NewLine}"

```

OUTPUT

![codeguru](https://i.imgur.com/NiDs600.png "Serilog Code Guru")

## How to override the log level

You can override the log level events from the code as well as from the config file.

```csharp

Log.Logger = new LoggerConfiguration()
	.MinimumLevel.Debug()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExMzg1NzI4NzZdfQ==
-->