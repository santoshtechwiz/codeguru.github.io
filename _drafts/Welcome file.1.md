
[![](http://2.bp.blogspot.com/_iY3Ra2OqpkA/SA9jsySxCKI/AAAAAAAAA1Y/6qO4DWZIA-Q/s400/modal.bmp)](https://www.blogger.com/blog/post/edit/6673695286148904603/8233896566551132262#)  
  

  ```html
<%@ Page Language="C#" AutoEventWireup="true"  
CodeFile="ModalPopuuandValidation.aspx.cs"  
  Inherits="ModalPopupasLoader" %>  
  
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit"  
TagPrefix="ajaxToolkit" %>  
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml">  
<head runat="server">  
  <title>Untitled Page</title>  
  <style type="text/css">  
  
.modalBackground  
{  
  background-color: Gray;  
  filter: alpha(opacity=50);  
  opacity: 0.50;  
  
}  
  
.updateProgress  
{  
  border-width: 1px;  
  border-style: solid;  
  background-color: #FFFFFF;  
  position: absolute;  
  width: 180px;  
  height: 65px;  
}  
  
  </style>  
</head>  
<body>  
  <form id="form1" runat="server">  
      <asp:ScriptManager runat="server" ID="Scriptmanager1">  
          <Scripts>  
              <asp:ScriptReference Assembly="Microsoft.Web.Preview"  
Name="PreviewScript.js" />  
          </Scripts>  
      </asp:ScriptManager>  
  
      <script type="text/javascript">  
function postbackFromJS(sender, e) {  
var postBack = new Sys.Preview.PostBackAction();  
postBack.set_target(sender);  
postBack.set_eventArgument(e);  
postBack.performAction();  
}  
      </script>  
  
      <asp:Button ID="Button3" runat="server" Text="Decline" CausesValidation="false" />  
      <asp:Panel ID="Panel1" runat="server" Style="display: none" CssClass="modalPopup">  
          <fieldset>  
              <asp:Panel ID="Panel3" runat="server" CssClass="modalPanel">  
                  Please comment.  
              </asp:Panel>  
              <br />  
              <asp:TextBox ID="TextBox1" TextMode="MultiLine"  
runat="server" Rows="5" Width="98%" /><br />  
              <asp:RequiredFieldValidator EnableClientScript="true" ID="RequiredFieldValidator3"  
                  runat="server" ValidationGroup="modal" ControlToValidate="TextBox1"  
ErrorMessage="Please enter a reason"  
                  Display="Dynamic" />  
              <div style="text-align: center;">  
                  <br />  
                  <asp:Button ID="OkButton" runat="server" Text="Decline"  
ValidationGroup="modal" CausesValidation="true"  
                      OnClick="OKButton_Click" />  
                  <asp:Button ID="CancelButton" runat="server" CausesValidation="false" Text="Cancel" />  
              </div>  
          </fieldset>  
      </asp:Panel>  
      <ajaxToolkit:ModalPopupExtender ID="ModalPopupExtender" runat="server"  
TargetControlID="Button3"  
          PopupControlID="Panel1" BackgroundCssClass="modalBackground" OkControlID="OkButton"  
          CancelControlID="CancelButton" DropShadow="true" PopupDragHandleControlID="Panel3" />  
  </form>  
</body>  
</html>  
```
  

  ```
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
  
public partial class ModalPopupasLoader : System.Web.UI.Page  
{  
   protected void Page_Load(object sender, EventArgs e)  
   {  
       OkButton.OnClientClick = String.Format("postbackFromJS('{0}', '{1}')",OkButton.UniqueID, "");  
  
   }  
   protected void OKButton_Click(object sender, EventArgs e)  
   {  
       if (IsValid)  
       {  
           //do  
       }  
       else  
       {  
           ModalPopupExtender.Show();  
       }  
   }  
}
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTYxNjIwNDYyLC0xODk0MTk5NDMzLDUwMj
A5NjIzMSwtODM1NzcxMTkyLC01NTI5OTM0MjYsMTU1MzE2MDY4
MCw2NjgxOTAwNDksMTIwMzA0Njk0NiwxNDA3NTE3MzE1LC0zOD
QxMDUwMTMsLTMxNTY0ODU4OCwtODAwNTYxOTMwLC0xNzI0MjMz
Mzc2LC0xNTY1NzEzOTgzLC0yMDY2NjU1NDc1LC05Mzg1MTYyMz
gsLTMzMjQ1NTM2M119
-->