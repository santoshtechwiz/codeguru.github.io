In this post, I will show you how to modify the response before it is sent to the client. The trick here is to override the Render method of the Page class and modify the response.  
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="InterceptHtml.aspx.cs"
Inherits="InterceptHtml" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0
Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title>Untitled Page</title>
</head>
<body>
   <form id="form1" runat="server">
       <div>
           Hello World!
           <br />
           Hi
       </div>
   </form>
</body>
</html>
```
  
```csharp
using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Text;
using System.IO;

public partial class InterceptHtml : System.Web.UI.Page
{
   protected void Page_Load(object sender, EventArgs e)
   {

       Response.Filter = new ReplaceHTML(Response.Filter);


   }
   /// <summary>
   /// Second Method!!!!!!! overide the Render Method.
   /// </summary>
   /// <param name="writer"></param>
   protected override void Render(HtmlTextWriter writer)
   {


       StringWriter output = new StringWriter();
       base.Render(new HtmlTextWriter(output));
       writer.Write(output.ToString().Replace("Hi", "This is the replaced text!
Welcome to <a href=\"http://www.aspdotnetcodebook.blogspot.com\
">www.aspdotnetcodebook.blogspot.com</a>"));
   }
}
```
### Second Approach

```csharp
using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

/// <summary>
/// To intercept and get a reference to the HTML, we now need to create a
/// class to inherit System.IO.Stream. So, create a new class in
/// </summary>
public class ReplaceHTML : System.IO.Stream
{

    private System.IO.Stream Base;

    public ReplaceHTML(System.IO.Stream ResponseStream)
    {
        if (ResponseStream == null)
            throw new ArgumentNullException("ResponseStream");
        this.Base = ResponseStream;
    }
    public override int Read(byte[] buffer, int offset, int count)
    {
        return this.Base.Read(buffer, offset, count);
    }
    public override void SetLength(long value)
    {

    }

    public override void Write(byte[] buffer, int offset, int count)
    {
        // Get HTML code 
        string HTML = System.Text.Encoding.UTF8.GetString(buffer, offset, count);

        // Replace the text with something else 
        HTML = HTML.Replace("Hello World!", "I've replaced the Hello World example!");

        // Send output 
        buffer = System.Text.Encoding.UTF8.GetBytes(HTML);
        this.Base.Write(buffer, 0, buffer.Length);
    }

    public override bool CanRead
    {
        get { throw new Exception("The method or operation is not implemented."); }
    }

    public override bool CanSeek
    {
        get { throw new Exception("The method or operation is not implemented."); }
    }

    public override bool CanWrite
    {
        get { throw new Exception("The method or operation is not implemented."); }
    }

    public override void Flush()
    {
        HttpContext.Current.Response.Flush();

    }

    public override long Length
    {
        get { throw new Exception("The method or operation is not implemented."); }
    }

    public override long Position
    {
        get
        {
            throw new Exception("The method or operation is not implemented.");
        }
        set
        {
            throw new Exception("The method or operation is not implemented.");
        }
    }

    public override long Seek(long offset, System.IO.SeekOrigin origin)
    {
        throw new Exception("The method or operation is not implemented.");
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQzMjg2ODUwM119
-->