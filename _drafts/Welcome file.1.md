
[![](http://1.bp.blogspot.com/_iY3Ra2OqpkA/SJrb3t_KxfI/AAAAAAAABNk/GDAHARb9vKw/s400/filesystem.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/5235911695691647756#)

A quick and easy way to load files and directories contained in a specified folder into a DataTable.
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FileSystem.aspx.cs" Inherits="FileSystem" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title>Untitled Page</title>
</head>
<body>
   <form id="form1" runat="server">
       <div>
           <asp:GridView ID="GridView1" runat="Server">
           </asp:GridView>
           <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Get Files" /></div>
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
using System.IO;

public partial class FileSystem : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {

        GridView1.DataSource = FileSystemToDataTable(@"C:\");
        GridView1.DataBind();

    }
    /// <summary>
    /// A method that accepts a string that points to a directory,
    /// reads that folders contents and convert that data into a DataTable
    /// </summary>
    /// <param name="directory">the directory to browse</param>
    /// <returns>a DataTable containing the information about the supplied directory</returns>
    public DataTable FileSystemToDataTable(string directory)
    {
        //read the folder
        DirectoryInfo directoryInfo = new DirectoryInfo(directory);

        //create our datatable that would hold the list
        //of folders in the specified directory
        DataTable filesystem = new DataTable();

        /* Add the columns to our datatable
        * You can add as many colums as you like.
        * for this demo, we will just be adding this columns
        * */
        filesystem.Columns.Add(new DataColumn("Name"));
        filesystem.Columns.Add(new DataColumn("FullName"));
        filesystem.Columns.Add(new DataColumn("CreationTime"));
        filesystem.Columns.Add(new DataColumn("LastWriteTime"));

        //loop thru each FileSystemInfo object in the specified directory
        foreach (FileSystemInfo fileSystemInfo in directoryInfo.GetFileSystemInfos())
        {
            //create a new row in ould filesystem table
            DataRow dataRow = filesystem.NewRow();

            //assign the values to our table members
            dataRow["Name"] = fileSystemInfo.Name;
            dataRow["FullName"] = fileSystemInfo.FullName;
            dataRow["CreationTime"] = fileSystemInfo.CreationTime;
            dataRow["LastWriteTime"] = fileSystemInfo.LastWriteTime;

            // add the datarow to our datatable
            filesystem.Rows.Add(dataRow);
        }

        //return our table
        return filesystem;
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMzIyNjI5MDcsLTkzODUxNjIzOCwtMzMyND
U1MzYzXX0=
-->