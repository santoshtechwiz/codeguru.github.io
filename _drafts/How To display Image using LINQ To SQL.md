LINQ is very powerfull feature of C#. In this article I will show you how to read binary data from SQL using LINQ. Let's consider you have stored the image in SQL and you want to retrive the image and want to show on the web page. Check-out the following code snippet which is straight forward.

[![](http://3.bp.blogspot.com/_iY3Ra2OqpkA/SvFmvOxLn1I/AAAAAAAACEs/bsKYEQarIDo/s400/linq_image.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/1737987141100964360#)  
  
  

`Default.aspx`
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication1._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title></title>
</head>
<body>
   <form id="form1" runat="server">
   <div>
       <asp:GridView ID="grdCategories" runat="server" DataKeyNames="CategoryID" Width="600px"
           AutoGenerateColumns="false">
           <Columns>
               <asp:BoundField DataField="CategoryID" HeaderText="CategoryID" />
               <asp:BoundField DataField="CategoryName" HeaderText="CategoryName" />
               <asp:TemplateField>
                   <ItemTemplate>
                       <asp:Image ID="Image1" runat="server" ImageUrl='<%#"ImageHandler.ashx?CategoryID="+ Eval("CategoryID")  %>' />
                   </ItemTemplate>
               </asp:TemplateField>
           </Columns>
       </asp:GridView>
   </div>
   </form>
</body>
</html>
```

`Default.aspx.cs`

  
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
   public partial class _Default : System.Web.UI.Page
   {
       protected void Page_Load(object sender, EventArgs e)
       {
           NorthwindDataContext db = new NorthwindDataContext();
           var cate = from c in db.Categories
                      select new
                      {
                          CategoryName = c.CategoryName,
                          CategoryID = c.CategoryID,
                          Image = c.Picture,
                      };
           grdCategories.DataSource = cate;
           grdCategories.DataBind();
       }
   }
}

ImageHandler.ashx
  

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Drawing.Imaging;

namespace WebApplication1
{

   public class ImageHandler : IHttpHandler
   {

       public void ProcessRequest(HttpContext context)
       {
           HttpRequest req = context.Request;
           // string categoryID = "1";
           string categoryID = req.QueryString["CategoryID"].ToString();
           // Get information about the specified category
           NorthwindDataContext db = new NorthwindDataContext();
           var category = from c in db.Categories
                          where Convert.ToInt32(c.CategoryID) == Convert.ToInt32(categoryID)
                          select c.Picture;
           int len = category.First().Length;
           // Output the binary data
           // But first we need to strip out the OLE header
           int OleHeaderLength = 78;
           int strippedImageLength = len - OleHeaderLength;
           byte[] imagdata = new byte[strippedImageLength];
           Array.Copy(category.First().ToArray(), OleHeaderLength, imagdata, 0, strippedImageLength);
           if ((imagdata) != null)
           {
               MemoryStream m = new MemoryStream(imagdata);
               System.Drawing.Image image = System.Drawing.Image.FromStream(m);
               image.Save(context.Response.OutputStream, ImageFormat.Jpeg);
           }
       }

       public bool IsReusable
       {
           get
           {
               return false;
           }
       }
   }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyMDYyMTA3ODBdfQ==
-->