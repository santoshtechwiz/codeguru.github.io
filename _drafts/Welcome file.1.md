

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AllColors.aspx.cs"
 Inherits="AllColors" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title>Untitled Page</title>
</head>
<body>
  <form id="form1" runat="server">
      <div>
          <asp:DropDownList ID="ddlColor" runat="Server">
          </asp:DropDownList>
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
using System.Drawing;

public partial class AllColors : System.Web.UI.Page
{
   protected void Page_Load(object sender, EventArgs e)
   {
       ArrayList arrlist = new ArrayList();
       KnownColor enumColor = new KnownColor();
       Array Colors = Enum.GetValues(enumColor.GetType());
       foreach (object clr in Colors)
       {
           if (!Color.FromKnownColor((KnownColor)clr).IsSystemColor)
               arrlist.Add(clr.ToString());
       }
       ddlColor.DataSource = arrlist;
       ddlColor.DataBind();
   }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgwMDU2MTkzMCwtMTcyNDIzMzM3NiwtMT
U2NTcxMzk4MywtMjA2NjY1NTQ3NSwtOTM4NTE2MjM4LC0zMzI0
NTUzNjNdfQ==
-->