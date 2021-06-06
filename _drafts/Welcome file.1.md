
[![](http://2.bp.blogspot.com/_iY3Ra2OqpkA/SdyxQbYGvtI/AAAAAAAAB90/iON-dHUx0v0/s400/ddl_javas.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/6532740153753761806#)

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TestDDL.aspx.cs" Inherits="TestDDL" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManger1" runat="server">
    </asp:ScriptManager>
    <div>
    </div>
    <style>
        .invisibleColumn
        {
            display: none;
            width: 0px;
        }
        body
        {
            font-family: Arial;
            font-size: 12px;
        }
    </style>

    <script type="text/javascript">
        function getValue(obj) {

            document.getElementById('<%=txtFriend.ClientID %>').value = obj;
        }
    </script>

    <asp:UpdatePanel ID="Update1" runat="server">
        <ContentTemplate>
            <cc1:DropDownExtender ID="DropDownExtender1" DropDownControlID="FriendGridView" TargetControlID="txtFriend"
                runat="server">
            </cc1:DropDownExtender>
            <asp:TextBox ID="txtFriend" runat="server" Width="200px"></asp:TextBox>
            <asp:GridView ID="FriendGridView" runat="server" Width="200px" AutoGenerateColumns="false"
                OnRowDataBound="FriendGridView_RowDataBound" OnSelectedIndexChanged="FriendGridView_SelectedIndexChanged">
                <RowStyle BackColor="#DDDDDD" />
                <Columns>
                    <asp:BoundField DataField="ID" HeaderStyle-CssClass="invisibleColumn" ItemStyle-CssClass="invisibleColumn" />
                    <asp:BoundField DataField="Name" HeaderText="Name" />
                    <asp:BoundField DataField="Description" HeaderText="Description" />
                </Columns>
                <HeaderStyle BackColor="Blue" ForeColor="White" />
                <AlternatingRowStyle BackColor="#EEEEEE" />
                <SelectedRowStyle BackColor="#999999" />
            </asp:GridView>
        </ContentTemplate>
    </asp:UpdatePanel>
    </form>
</body>
</html>
```
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class TestDDL : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            FriendGridView.DataSource = GetFriends();
            FriendGridView.DataBind();
        }

    }
    protected void FriendGridView_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            // The value that we want is in column #9...
            string valueText = e.Row.Cells[1].Text;

            string clickHandler = string.Format("alert('Value in column #9 is {0}')", valueText);
            e.Row.Attributes.Add("onclick", "getValue('" + valueText + "')");
        }
    }
    public List<Friend> GetFriends()
    {

        List<Friend> users = new List<Friend>();
        users.Add(new Friend("Xyz", "Coder"));
        users.Add(new Friend("Abc", "Writer"));
        users.Add(new Friend("Charles", "Poet"));
        return users;


    }
    protected void FriendGridView_SelectedIndexChanged(object sender, EventArgs e)
    {
        // assign firstname
        if (FriendGridView.SelectedRow != null)
            txtFriend.Text = Server.HtmlDecode(
              FriendGridView.SelectedRow.Cells[1].Text);
        else
            txtFriend.Text = "";

    }
}
public class Friend
{

    public Friend(string name, string description)
    {

        _name = name;

        _description = description;

        _id = Guid.NewGuid().ToString();

    }



    private string _id;
    public string Id
    {

        get { return _id; }

        set { _id = value; }

    }

    private string _name;
    public string Name
    {

        get { return _name; }

        set { _name = value; }

    }
    private string _description;
    public string Description
    {

        get { return _description; }

        set { _description = value; }

    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTU1MzE2MDY4MCw2NjgxOTAwNDksMTIwMz
A0Njk0NiwxNDA3NTE3MzE1LC0zODQxMDUwMTMsLTMxNTY0ODU4
OCwtODAwNTYxOTMwLC0xNzI0MjMzMzc2LC0xNTY1NzEzOTgzLC
0yMDY2NjU1NDc1LC05Mzg1MTYyMzgsLTMzMjQ1NTM2M119
-->