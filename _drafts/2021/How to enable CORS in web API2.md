In this post I am going to show you a very simple and useful tips that how to enable CORS in web API2.  
## What is CORS
**Cross-origin resource sharing** (**CORS**) is a mechanism that allows many resources (e.g. fonts, JavaScript, etc.) on a [web page](http://en.wikipedia.org/wiki/Web_page) to be requested from another [domain](http://en.wikipedia.org/wiki/Domain_name) outside the domain from which the resource originated  

**How to enable in CORS in web API2**  

In Visual Studio, from the Tools menu, select Library Package Manager, then select Package Manager Console. In the Package Manager Console window, type the following command:

``` bash
Install-Package Microsoft.AspNet.WebApi.Cors
```
Open the file App_Start/WebApiConfig.cs. Add the following code to the **WebApiConfig.Register** method.  
``` csharp
 public static void Register(HttpConfiguration config)
        {
            // New code
            config.EnableCors();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
  ```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4NTc1NDIzMjRdfQ==
-->