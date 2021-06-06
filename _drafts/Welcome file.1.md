
create a textbox and default all colors to white (or whatever you need to hide it) create a event for OnSelectionChange on the calendar control.

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ValidateCalControl.aspx.cs"
Inherits="ValidateCalControl" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
   <title>Untitled Page</title>
</head>
<body>
   <form id="form1" runat="server">
   <div>
   <asp:Calendar ID="Cal1" runat="server"
 OnSelectionChanged="Cal1_SelectionChanged"></asp:Calendar>
  <asp:TextBox ID="txtCal" runat="server" BackColor="White" BorderColor="white"
ForeColor="white"></asp:TextBox>
  <asp:RequiredFieldValidator ID="Req1" runat="server"
ControlToValidate="txtCal" ErrorMessage="Select Date"></asp:RequiredFieldValidator>
  <asp:Button ID="btnTest" runat="server" Text="Test" />
   </div>
   </form>
</body>
</html>

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

public partial class ValidateCalControl : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Cal1_SelectionChanged(object sender, EventArgs e)
    {
        txtCal.Text = Cal1.SelectedDate.ToShortDateString();
        Req1.Validate();

    }
}
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgwMTQxNTIwNSwtOTM4NTE2MjM4LC0zMz
I0NTUzNjNdfQ==
-->