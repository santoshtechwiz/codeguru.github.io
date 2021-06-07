
[![](http://4.bp.blogspot.com/_iY3Ra2OqpkA/SLfjuQgRo2I/AAAAAAAABT0/p_x7lkfVwyQ/s400/treeview_1.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/5064240701301416640#)

you can see the code that uses the static GeTDrives method of the DriveInfo class to get a list of all installed drives, then iterates through them. For each fixed, formatted, and available (ready) drive, the code creates a new node containing details of the drive. It then sets the ImageUrl to the custom image, specifies that clicking this node will cause a postback that executes the "populate on demand" event handler, and adds the node to the treeView.

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TreeView.aspx.cs" Inherits="TreeView" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title>Untitled Page</title>
</head>
<body>
   <form id="form1" runat="server">
       <div>
           <asp:TreeView ID="treeDir" runat="Server">
           </asp:TreeView>
           <asp:Label ID="lblError" runat="Server"></asp:Label>
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

public partial class TreeView : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        CreateTreeView();

    }
    private void CreateTreeView()
    {
        treeDir.Nodes.Clear();
        TreeNode node = new TreeNode("My Computer", "Root");
        node.SelectAction = TreeNodeSelectAction.None;
        node.Expanded = true;
        treeDir.Nodes.Add(node);
        try
        {
            // get a list of installed drives
            DriveInfo[] allDrives = DriveInfo.GetDrives();
            foreach (DriveInfo d in allDrives)
            {
                // only include fixed drives that are ready
                if (d.DriveType == DriveType.Fixed && d.IsReady)
                {
                    // create text for the TreeView to display
                    StringBuilder sb = new StringBuilder();
                    sb.Append(d.Name.Substring(0, 2));
                    sb.Append(" ");
                    sb.Append(d.VolumeLabel);
                    sb.Append(" (");
                    sb.Append(d.DriveFormat);
                    sb.Append(") ");
                    Double space = d.AvailableFreeSpace / 1024 / 1024;
                    sb.Append(space.ToString("#,###,###,##0"));
                    sb.Append(" MB available");
                    String theName = sb.ToString();
                    String theValue = d.Name;
                    // add a node to the TreeView with "drive" image
                    TreeNode child = new TreeNode(theName, theValue);
                    child.ImageUrl = "images/icon_drive.gif";
                    // specify postback for populating child nodes
                    child.SelectAction = TreeNodeSelectAction.Expand;
                    child.PopulateOnDemand = true;
                    node.ChildNodes.Add(child);
                }
            }
        }
        catch (Exception ex)
        {
            lblError.Text = "ERROR: " + ex.Message + "<p />";
        }
    }

}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgzNTc3MTE5MiwtNTUyOTkzNDI2LDE1NT
MxNjA2ODAsNjY4MTkwMDQ5LDEyMDMwNDY5NDYsMTQwNzUxNzMx
NSwtMzg0MTA1MDEzLC0zMTU2NDg1ODgsLTgwMDU2MTkzMCwtMT
cyNDIzMzM3NiwtMTU2NTcxMzk4MywtMjA2NjY1NTQ3NSwtOTM4
NTE2MjM4LC0zMzI0NTUzNjNdfQ==
-->