
[![](http://1.bp.blogspot.com/_iY3Ra2OqpkA/SLaVlEJQMfI/AAAAAAAABTc/1jZ2ddat6fo/s400/reg_array.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/6555678894328060084#

)Let's create a simple Web page to demonstrate the RegisterArrayDeclaration method. This page provides a slide show where the client-side JavaScript changes the image. In this example, we will search a specified folder on the server and load the names of all the images in a JavaScript array. We will also provide two buttons, one for showing the next image from the list and another for showing the previous one
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ArrayDeclaration.aspx.cs"
    Inherits="ArrayDeclaration" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>

    <script type="text/javascript">
      var curPic = 0;

      function processPrevious()
      {
            if (curPic==0)
            {
                  curPic=Pictures.length - 1;
            }
            else
            {
                  curPic--;
            }
            document.getElementById('<%=myPicture.ClientID%>').src=Pictures[curPic];
      }

      function processNext()
      {
            if (curPic==Pictures.length -1)
            {
                  curPic=0;
            }
            else
            {
                  curPic++;
            }
            document.getElementById('<%=myPicture.ClientID%>').src=Pictures[curPic];
      }
    </script>

</head>
<body>
    <form id="form1" runat="server">
        <div>
            <table border="1">
                <tr>
                    <td>
                        <asp:Image ID="myPicture" runat="Server" Height="500px" Width="600px" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Button ID="BackButton" runat="Server" Text="Back" />
                        <asp:Button ID="NextButton" runat="Server" Text="Previous" />
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
using System.Text;
using System.IO;

public partial class ArrayDeclaration : System.Web.UI.Page
{
   protected void Page_Load(object sender, EventArgs e)
   {
       if (!IsPostBack)
       {

           StringBuilder imageArray = new StringBuilder();
           // The GetImageArray method searches the Images
           // folder and returns a JavaScript array declaration
           // for all files contained in the folder.

           imageArray = GetImageArray("Image");
            // Once we have the array declaration, we simply add it
           // to the page by using the RegisterArrayDeclaration method.
           // The name of the JavaScript array will be Pictures,
           // as specified in the first parameter.

           ClientScript.RegisterArrayDeclaration("Pictures", imageArray.ToString());
           // Wiring the Back button's click event to
           // the processPrevious function. Make sure to
           // return false in order to disable post-back operation.

           BackButton.Attributes.Add("onClick", "processPrevious();return false;");

                //Wiring the Next button's click event to
                // the processNext function. Make sure to
                // return false in order to disable post-back operation.

           NextButton.Attributes.Add("onClick", "processNext();return false;");

       }
   }
    // This function receives a folder name and returns a
    //   JavaScript array declaration containing names of all files
    //  from the folder.

   protected StringBuilder GetImageArray(string folderName)
   {


       string Path;
       DirectoryInfo Folder;

       FileInfo[] Images;
       StringBuilder ImageArray = new StringBuilder();

       Path = Request.PhysicalApplicationPath + folderName;
       Folder = new DirectoryInfo(Path);
       Images = Folder.GetFiles();

       // Looping through all files in the folder and generating
       // a JavaScript array declaration.
       foreach (FileInfo Image in Images)
       {
           ImageArray.AppendFormat("'{0}/{1}',", folderName, Image.Name);
       }

       // Removing the unwanted last comma.
       ImageArray.Remove(ImageArray.Length - 1, 1);

       return ImageArray;
   }


}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgwNjUzMzUyNywtODM1NzcxMTkyLC01NT
I5OTM0MjYsMTU1MzE2MDY4MCw2NjgxOTAwNDksMTIwMzA0Njk0
NiwxNDA3NTE3MzE1LC0zODQxMDUwMTMsLTMxNTY0ODU4OCwtOD
AwNTYxOTMwLC0xNzI0MjMzMzc2LC0xNTY1NzEzOTgzLC0yMDY2
NjU1NDc1LC05Mzg1MTYyMzgsLTMzMjQ1NTM2M119
-->