In this article, I will show you how to create windows service using .NET core 3.x. In .net core 2.x, Microsoft introduced `IHostedService` for building service, but in .net 3.x they provided a template for creating Worker Service with some improvements with the previous version.
Let's start the tutorial.
> Open Visual Studio 2019 and create a worker service project 

![Imgur](https://i.imgur.com/9YrYVWy.png "Worker Service")

> Run the application by pressing F5. You will see the output as shown below

![Imgur](https://i.imgur.com/0Hk59Cq.png "Worker Service")

> Right-click on the Project and then click on Manage Nuget Packages and Install the following package

`Microsoft.Extensions.Hosting.WindowsServices`

![Imgur](https://i.imgur.com/0KNS8xa.png ,"Worker Service")

> Open Program.cs and add `UseWindowsService()` method in `CreateHostBuilder`
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace WindowsServiceDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddHostedService<Worker>();
                }).UseWindowsService();
    }
}
```
> Finally open the Terminal (CMD/POWERSHELL) as Administrator and run the following command

```bash
sc.exe create WindowsServiceDemo binPath= WindowsServiceDemo.exe start= auto
```
Here **WIndowsServiceDemo** is the name of the service( You can use any name here) **binPath** is the location of the executable code.

If everything works, you will see output something like below

![Imgur](https://i.imgur.com/6ZkeEC2.png "Windows Service")


<!--stackedit_data:
eyJoaXN0b3J5IjpbOTIzOTQ5MjMyXX0=
-->