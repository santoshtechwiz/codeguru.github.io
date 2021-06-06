In this article I will show you how to add client side validation in control 
[![](http://2.bp.blogspot.com/_iY3Ra2OqpkA/SAy6R-aITCI/AAAAAAAAA1I/GoAQkQUi6-4/s400/gd.bmp)](https://www.blogger.com/blog/post/edit/6673695286148904603/9000027923423660310#)  
  

  ```html
<%@ Page Language="C#" AutoEventWireup="true"  
="GridViewClientSide.aspx.cs"  
 Inherits="GridViewClientSide" %>  
  
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml">  
<head runat="server">  
 <title>Untitled Page</title>  
</head>  
  <script type="text/javascript">  
function ValidateCheckBox()  
{   validateTextBox();  
//get target base & child control.  
var TargetBaseControl = document.getElementById('<%=this.GridView1.ClientID%>');  
var TargetChildControl = "chkBxSelect";  
  
//get all the control of the type INPUT in the base control.  
var Inputs = TargetBaseControl.getElementsByTagName("input");  
  
for(var n = 0; n < Inputs.length; ++n)  
   if(Inputs[n].type == 'checkbox' && Inputs[n].id.indexOf(TargetChildControl,0) >= 0)  
      if(Inputs[n].checked) return true;  
  
 alert('Select at least one checkbox!');  
 return false;  
}  
  
function validateTextBox()  
{  
//get target base & child control.  
var TargetBaseControl = document.getElementById('<%=this.GridView1.ClientID%>');  
var TargetChildControl1 = "txtInput";  
  
//get all the control of the type INPUT in the base control.  
var Inputs = TargetBaseControl.getElementsByTagName("input");  
  
for(var n = 0; n < Inputs.length; ++n)  
   if(Inputs[n].type == 'text' && Inputs[n].id.indexOf(TargetChildControl1,0) >= 0)  
      if(Inputs[n].value!="") return true;  
  
 alert('Enter some value in textbox!');  
 return false;  
}  
</script>  
  
<body>  
 <form id="form1" runat="server">  
     <div>  
         <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False">  
             <Columns>  
                 <asp:BoundField HeaderText="n" DataField="accountno">  
                     <HeaderStyle HorizontalAlign="Center"  
VerticalAlign="Middle" Width="50px" />  
                     <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" />  
                 </asp:BoundField>  
                 <asp:TemplateField HeaderText="Select">  
                     <ItemTemplate>  
                         <asp:CheckBox ID="chkBxSelect" runat="server" />  
                     </ItemTemplate>  
                     <HeaderStyle HorizontalAlign="Center" VerticalAlign="Middle" />  
                     <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" />  
                 </asp:TemplateField>  
                 <asp:TemplateField HeaderText="Name">  
                     <ItemTemplate>  
                         <asp:TextBox ID="txtInput" runat="server"></asp:TextBox>  
                     </ItemTemplate>  
                 </asp:TemplateField>  
             </Columns>  
         </asp:GridView>  
         <asp:Button ID="btnPost" runat="server" Text="Post"  
OnClientClick="javascript:return ValidateCheckBox();"  
             OnClick="btnPost_Click" />  
         <asp:Label ID="lblMsg" runat="server"></asp:Label>  
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
  
public partial class GridViewClientSide : System.Web.UI.Page  
{  
  protected void Page_Load(object sender, EventArgs e)  
  {  
      if (!IsPostBack)  
      {  
          GridView1.DataSource = c();  
          GridView1.DataBind();  
      }  
  }  
  public DataSet c()  
  {  
      DataSet ds = new DataSet();  
      DataTable dt = new DataTable("Company");  
      DataRow dr;  
      dt.Columns.Add(new DataColumn("accountNo", typeof(Int32)));  
      dt.Columns.Add(new DataColumn("CompanyName", typeof(string)));  
      dt.Columns.Add(new DataColumn("Address", typeof(string)));  
      for (int i = 0; i <= 10; i++)  
      {  
          dr = dt.NewRow();  
          dr[0] = i;  
          dr[1] = "Company" + i + Environment.NewLine + "Title" + i;  
          dr[2] = "Address" + i + Environment.NewLine + "Title" + i;  
          dt.Rows.Add(dr);  
      }  
      ds.Tables.Add(dt);  
      return ds;  
  }  
  protected void btnPost_Click(object sender, EventArgs e)  
  {  
      lblMsg.Text = "Form is posted!";  
  }  
  
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbODk3MjI0OTk5LC0xNDI5OTYyMTk0LDY0Nz
k3NTYxNiwtMTUwMjI4NTI4Nl19
-->