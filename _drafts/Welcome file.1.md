
[![](http://1.bp.blogspot.com/_iY3Ra2OqpkA/SKwYu98H7aI/AAAAAAAABRo/C0kbscpfVRk/s400/Hover_menu.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/7211338139921405787#)

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HoverMenu.aspx.cs" Inherits="Default2" %>

<%@ Register TagPrefix="ccl" Namespace="AjaxControlToolkit" Assembly="AjaxControlToolkit" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title>Untitled Page</title>
   <style type="text/css">
   .popupMenu
{
   position: absolute;
   visibility: hidden;
   background-color: #E3F2F7;
   opacity: .9;
   filter: alpha(opacity=90);
}

.popupHover
{
   background-image: url(images/header-opened.png);
   background-repeat: repeat-x;
   background-position: left top;
   background-color: #DEB887;
}

     h1 {


font: 1.2em Arial, Helvetica, sans-serif;

}
input.txt {
color: #00008B;
background-color: #E3F2F7;
border: 1px inset #00008B;
width: 200px;
}
input.btn {
color: #00008B;
background-color: #ADD8E6;
border: 1px outset #00008B;
}
form div {
clear: left;
margin: 0;
padding: 0;
padding-top: 5px;
}
form div label {
float: left;
width: 40%;
font: bold 0.9em Arial, Helvetica, sans-serif;
}
fieldset {
border: 1px dotted #61B5CF;
margin-top: 1.4em;
padding: 0.6em;
}
legend {
font: bold 0.8em Arial, Helvetica, sans-serif;
color: #00008B;
background-color: #FFFFFF;
}
   </style>
</head>
<body>
   <form id="form1" runat="server">
       <asp:ScriptManager ID="ScriptManager1" runat="server" />
       <div>
           <ccl:HoverMenuExtender ID="HoverMenuExtender1" runat="Server" TargetControlID="QuickLinkLinkButton"
               PopupControlID="PanelPopUp" PopupPosition="Bottom" OffsetX="6" PopDelay="500"
               HoverCssClass="popupHover">
           </ccl:HoverMenuExtender>
           <asp:Panel ID="PanelPopUp" runat="server" Height="50px" Width="125px" CssClass="popupMenu"
               BorderColor="Transparent">
               <div style="width: 600px">
                   <fieldset>
                       <legend>Personal Information</legend>
                       <div>
                           <label for="fullname">
                               Name:</label>
                           <input type="text" name="fullname" id="fullname" class="txt" runat="server" />
                       </div>
                       <div>
                           <label for="email">
                               Email Address:</label>
                           <input type="text" name="email" id="email" class="txt" runat="server" />
                       </div>
                       <div>
                           <label for="password1">
                               Password:</label>
                           <input type="password" name="password1" id="password1" class="txt" runat="server" />
                       </div>
                       <div>
                           <label for="password2">
                               Confirm Password:</label>
                           <input type="password" name="password2" id="password2" class="txt" runat="server" />
                       </div>
                   </fieldset>
                   <fieldset>
                       <legend>Address Details</legend>
                       <div>
                           <label for="address1">
                               Address line one:</label>
                           <input type="text" name="address1" id="address1" class="txt" runat="server" />
                       </div>
                       <div>
                           <label for="address2">
                               Address line two:</label>
                           <input type="text" name="address2" id="address2" class="txt" runat="server" />
                       </div>
                       <div>
                           <label for="city">
                               Town / City:</label>
                           <input type="text" name="city" id="city" class="txt" runat="server" />
                       </div>
                       <div>
                           <label for="zip">
                               Zip / Post code:</label>
                           <input type="text" name="zip" id="zip" class="txt" runat="server" />
                       </div>
                   </fieldset>
                   <div>
                       <input type="submit" name="btnSubmit" id="btnSubmit" value="Sign Up!" class="btn"
                           onserverclick="btnSubmit_ServerClick" runat="server" />
                   </div>
               </div>
           </asp:Panel>
           <asp:LinkButton ID="QuickLinkLinkButton" runat="server">Quick Link</asp:LinkButton>
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

public partial class Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnSubmit_ServerClick(object sender, EventArgs e)
    {
        System.Text.StringBuilder sb = new System.Text.StringBuilder();
        sb.Append("Full Name:" + fullname.Value+"\n");
        sb.Append("Email:" + email.Value + "\n");
        sb.Append("Address1:" + address1.Value + "\n");
        sb.Append("Address2:" + address2.Value + "\n");
        Response.Write(sb.ToString());
    }
}
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTE3NTE1NDUyLC0zODQxMDUwMTMsLTMxNT
Y0ODU4OCwtODAwNTYxOTMwLC0xNzI0MjMzMzc2LC0xNTY1NzEz
OTgzLC0yMDY2NjU1NDc1LC05Mzg1MTYyMzgsLTMzMjQ1NTM2M1
19
-->