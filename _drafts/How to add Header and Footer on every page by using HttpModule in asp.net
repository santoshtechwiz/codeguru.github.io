In this post, I will show you a straightforward way to add header and footer on every page using [HttpModule](https://support.microsoft.com/en-my/help/307985/info-asp-net-http-modules-and-http-handlers-overview). 

-   Open visual studio and create a new website.
-   Right-click on-site and add a new class named HeaderAndFooter, and inherit this class with IHttpModule interface.

```csharp
using System;
using System.Web;
using System.IO;

public class HeaderAndFooter : IHttpModule
{
    const string PageHeaderText = "<h1>Header Added by Module<h1>";
    const string PageFooterText = "<h1>Footer added by Module</h1>";

    public void Init(HttpApplication app)
    {
        // Register for pipeline events
        app.BeginRequest += new EventHandler(OnBeginRequest);
        app.EndRequest += new EventHandler(OnEndRequest);
    }

    public void Dispose()
    {
        // Nothing to do here
    }

    public void OnBeginRequest(object sender, EventArgs e)
    {
        HttpApplication app = (HttpApplication)sender;
        HttpContext ctx = app.Context;

        // Add custom header to the HTTP response
        ctx.Response.AppendHeader("Author", "DinoE");
        ctx.Response.Write(PageHeaderText);
    }

    public void OnEndRequest(object sender, EventArgs e)
    {
        // Get access to the HTTP context 
        HttpApplication app = (HttpApplication)sender;
        HttpContext ctx = app.Context;

        // Append some custom text
        ctx.Response.Write(PageFooterText);
    }
}
```
-   Open the web.config and register the module as below
```xml
<?xml version="1.0"?>
<!--
 For more information on how to configure your ASP.NET application, please visit
 http://go.microsoft.com/fwlink/?LinkId=169433
 -->
<configuration>
  <system.web>
    <httpModules>
      <add name="HeaderAndFooter" type="HeaderAndFooter,App_Code"/>
    </httpModules>
    <compilation debug="true" targetFramework="4.0"/>
  </system.web>
</configuration>
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMzQ0ODg3NjUwXX0=
-->