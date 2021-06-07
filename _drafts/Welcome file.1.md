
[![](http://4.bp.blogspot.com/_iY3Ra2OqpkA/SKvqvF1uRlI/AAAAAAAABRg/7ZGVzYGiVaU/s400/master.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/6977712855333608807#)

To access the Master Page's methods or properties from a content page, reference the Master Page through the  `Page.Master`  property. This property returns an object of type  `MasterPage`, so you'll need to explicitly cast it to the appropriate type before calling its methods or referencing its properties. Alternatively, you can set the  [`@MasterType`  directive](https://www.blogger.com/blog/post/edit/6673695286148904603/6977712855333608807#), which adds a property to the auto-generated ASP.NET code-behind class code named  `Master`  that is a strongly-typed reference to the specified Master Page.

The following markup in the  `.aspx`  file for the content page spells out the Master Page type:

```html
<%@ MasterType VirtualPath="~/MasterPage.master" %>
```

To illustrate this, imagine that we had a DropDownList in the Master Page. When its selected index changes, we want to notify the content page of the change so that it can update its display accordingly. Start by creating a DropDownList named Color in the Master Page that lists various colors(red, green, etc.) and then create an event handler for this DropDownList's  `SelectedIndexChanged`  event. Next, we need to define an event for the Master Page, specifying the event handler signature. The event handler signature specifies what input parameters are passed to the event handler. For this example, let's pass the selected DropDownList item's  `Text`  and  `Value`  property values. Therefore, we can use the  [`CommandEventHandler`  delegate](https://www.blogger.com/blog/post/edit/6673695286148904603/6977712855333608807#), which passes a  [`CommandEventArgs`  object](https://www.blogger.com/blog/post/edit/6673695286148904603/6977712855333608807#)  to the event handler, which includes  `CommandName`  and  `CommandArgument`  properties that we can use to hold the selected  `ListItem`'s  `Text`  and  `Value`  property values.

To define an event named  `MoodChanged`  for the Master Page that uses the  `CommandEventHandler`  delegate, use the following syntax:

>[Masterpage.aspx]

```html
<%@ Master Language="C#" AutoEventWireup="true" CodeFile="MasterPage.master.cs" Inherits="MasterPage" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>Untitled Page</title>
</head>
<body>
<form id="form1" runat="server">
    <div>
        <asp:DropDownList ID="Color" runat="server" OnSelectedIndexChanged="Color_SelectedIndexChanged"
            AutoPostBack="True">
            <asp:ListItem>Red</asp:ListItem>
            <asp:ListItem Value="Green">Green</asp:ListItem>
            <asp:ListItem Value="Blue">Blue</asp:ListItem>
            <asp:ListItem Value="Yellow">Yellow</asp:ListItem>
        </asp:DropDownList>
        <asp:Panel ID="Panel1" runat="Server">
            <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
            <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
            <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Login" />
        </asp:Panel>
        <asp:ContentPlaceHolder ID="ContentPlaceHolder1" runat="server">
        </asp:ContentPlaceHolder>
    </div>
</form>
</body>
</html>
```

>[Master Page Code-Behind]

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

public partial class MasterPage : System.Web.UI.MasterPage
{
 public event CommandEventHandler ColorChanged;
 public event CommandEventHandler MoodChanged;
 protected void Page_Load(object sender, EventArgs e)
 {

 }

 protected void Color_SelectedIndexChanged(object sender, EventArgs e)
 {
     if (Color.SelectedIndex != 0 && ColorChanged != null)
         ColorChanged(this, new CommandEventArgs(Color.SelectedItem.Text, Color.SelectedValue));
 }
 protected void Button1_Click(object sender, EventArgs e)
 {
     if (TextBox1.Text != "" && MoodChanged != null)
         MoodChanged(this, new CommandEventArgs(TextBox1.Text, TextBox2.Text));


 }
}
```

>[Content Page] [Default.aspx]

```html
<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true"
  CodeFile="Default.aspx.cs" Inherits="_Default" Title="Untitled Page" %>

<%@ MasterType VirtualPath="~/MasterPage.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
  <asp:Label ID="ColorChnage" runat="Server"></asp:Label><br />
  <asp:Label ID="Label1" runat="Server"></asp:Label>
</asp:Content>
```
>[Code-Behind]
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

public partial class _Default : System.Web.UI.Page
{
   protected void Page_Load(object sender, EventArgs e)
   {

   }
   protected void Page_Init(object sender, EventArgs e)
   {
       // Wire up the event (MoodChanged) to the event handler (MoodChangedFromMasterPage)
       Master.ColorChanged += new CommandEventHandler(ColorChangedFromMasterPage);
       Master.MoodChanged += new CommandEventHandler(MoodChangedFromMasterPage);
   }

   private void ColorChangedFromMasterPage(object sender, CommandEventArgs e)
   {
       string moodText = e.CommandName;
       string moodValue = e.CommandArgument.ToString();

       ColorChnage.Text = String.Format("You have selected color {0}, which has a value of {1}...", moodText, moodValue);
       Label1.Visible = false;
       ColorChnage.Visible = true;
   }

   private void MoodChangedFromMasterPage(object sender, CommandEventArgs e)
   {
       string moodText = e.CommandName;
       string moodValue = e.CommandArgument.ToString();

       Label1.Text = String.Format("You have enterd user name {0}, which has a password of {1}...", moodText, moodValue);
       ((Panel)Master.FindControl("Panel1")).Visible = false;
       Label1.Visible = true;
       ColorChnage.Visible = false;
   }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTk0NTUzNzEyNywtMTg5NDE5OTQzMyw1MD
IwOTYyMzEsLTgzNTc3MTE5MiwtNTUyOTkzNDI2LDE1NTMxNjA2
ODAsNjY4MTkwMDQ5LDEyMDMwNDY5NDYsMTQwNzUxNzMxNSwtMz
g0MTA1MDEzLC0zMTU2NDg1ODgsLTgwMDU2MTkzMCwtMTcyNDIz
MzM3NiwtMTU2NTcxMzk4MywtMjA2NjY1NTQ3NSwtOTM4NTE2Mj
M4LC0zMzI0NTUzNjNdfQ==
-->