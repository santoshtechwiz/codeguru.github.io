
[![](http://1.bp.blogspot.com/_iY3Ra2OqpkA/SLZOQuLeNpI/AAAAAAAABTE/pkDWoupcbPE/s400/emb_3.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/3108281191786163790#)

In .Net when you don’t want to relay for a file on physical location, then it is very good option to take an advantage of Embedded resources. Using embedded resources you can add any file type in the assembly/DLL/EXE when they get compiled. And whenever you want to use it, load it from the assembly, the files get stored in the metadata of Assembly. Here is an example of how to use Embedded Resources.    

- Open Microsoft Visual Studio and create new project for C# Windows Application, here I have created Windows Application named “EmbeddedTest”, even you can use “Class Library”
- To add a file in the project Right click on the project name in Solution Explorer, select “Add” >> “Existing Item…”[![](http://4.bp.blogspot.com/_iY3Ra2OqpkA/SLZM6CR_ZPI/AAAAAAAABS0/K1NdqDUkbis/s400/emb_1.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/3108281191786163790#)
- Now we have added a file to the project, so it doesn’t mean that it will automatically embedded in the Assembly, for that we need to change the files “Build Action” property to “Embedded Resource”, and compiler will include this file in metatdata. Here I have added Image file(blue.jpg), you can add one or more any kind of files[![](http://1.bp.blogspot.com/_iY3Ra2OqpkA/SLZNGxZBsnI/AAAAAAAABS8/Gu7spfbWiig/s400/emb_2.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/3108281191786163790#)
- Now use the following code in Form1_Load method to list all the Embedded Resources available in the Assembly
```csharp
protected void Page_Load(object sender, EventArgs e)
{
    if (!IsPostBack)
    {
        string[] resources = ImageLibrary.Images.GetNames();

        foreach (string resourceName in resources)
        {
            ListBox1.Items.Add(resourceName);
        }
    }
}
```
- The following code is used to get the resource from the Manifest of the Assembly when user clicks on the listBox1

```csharp
protected void ListBox1_SelectedIndexChanged(object sender, EventArgs e)
 {
     if (ListBox1.SelectedIndex == -1)
         return;

     string selectedResourceName = ListBox1.SelectedItem.ToString();

    System.Drawing.Image  img = ImageLibrary.Images.GetImageByResourceName(selectedResourceName);
     if (img != null)
     {
         System.Drawing.Bitmap obj = new System.Drawing.Bitmap(img);
         Response.ContentType = "image/gif";


         obj.Save(Response.OutputStream, System.Drawing.Imaging.ImageFormat.Gif);
    
     }
     else
     {
    
    
     }
 

 }
 ```

>complete code
```csharp
using System;
using System.Collections.Generic;
using System.Text;
using System.Drawing;
using System.Reflection;

using System.IO;

namespace ImageLibrary
{
  public class Images
  {
      public static string[] GetNames()
      {
          Assembly a = Assembly.GetExecutingAssembly();

          return a.GetManifestResourceNames();
      }

      public static Image GetImageByResourceName(string resourceName)
      {
          Assembly a = Assembly.GetExecutingAssembly();

          try
          {
              Stream stream = a.GetManifestResourceStream(resourceName);

              return Bitmap.FromStream(stream) as Bitmap;
          }
          catch (Exception ex)
          {
              return null;
          }
      }
  }
}
```

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EmbeedTest.aspx.cs" Inherits="EmbeedTest" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title>Untitled Page</title>
</head>
<body>
  <form id="form1" runat="server">
      <div>
          <table style="width: 100%">
              <tr>
                  <td style="width: 100px">
                      <asp:ListBox ID="ListBox1" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ListBox1_SelectedIndexChanged">
                      </asp:ListBox></td>
                  <td style="width: 100px">
                  </td>
              </tr>
          </table>
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

public partial class EmbeedTest : System.Web.UI.Page
{
  protected void Page_Load(object sender, EventArgs e)
  {
      if (!IsPostBack)
      {
          string[] resources = ImageLibrary.Images.GetNames();

          foreach (string resourceName in resources)
          {
              ListBox1.Items.Add(resourceName);
          }
      }
  }
  protected void ListBox1_SelectedIndexChanged(object sender, EventArgs e)
  {
      if (ListBox1.SelectedIndex == -1)
          return;

      string selectedResourceName = ListBox1.SelectedItem.ToString();

     System.Drawing.Image  img = ImageLibrary.Images.GetImageByResourceName(selectedResourceName);
      if (img != null)
      {
          System.Drawing.Bitmap obj = new System.Drawing.Bitmap(img);
          Response.ContentType = "image/gif";


          obj.Save(Response.OutputStream, System.Drawing.Imaging.ImageFormat.Gif);
      
      }
      else
      {
      
      
      }
   

  }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MjQyMzMzNzYsLTE1NjU3MTM5ODMsLT
IwNjY2NTU0NzUsLTkzODUxNjIzOCwtMzMyNDU1MzYzXX0=
-->