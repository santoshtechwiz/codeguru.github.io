
Supoose you have a **gridview** in asp.net that each row in the **gridview** has a dropdown(or textbox).You need to check that at least 1 row of the gridiew has a dropdown selected before submitting.

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GridDropDown.aspx.cs"
Inherits="GridDropDown" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
   <title>Untitled Page</title>

   <script language="javascript" type="text/javascript">
   //var text="firsttext";
   function Submit()
   {
   var  txtNamefirst = "GridView1_ctl";
   var txtNameLast = "_txtNameChk";

    var  chkNamefirst = "GridView1_ctl";
   var chkNameLast = "_dropselect";

  var temptxtobj= document.getElementById(txtNamefirst+"02" + txtNameLast) ;
   var tempchkobj= document.getElementById(chkNamefirst+"02" + chkNameLast) ;
  var i=1;
  var txtFlag=false;
 var drpFlag=false;
 var id;
  while(temptxtobj != null  && tempchkobj!=null )
  {
        if( !txtFlag && temptxtobj.value!="")
           txtFlag=true;
        
        if( !drpFlag && tempchkobj.selectedIndex>=0)
           drpFlag=true;
            i++;
            if (i< 10)
           id="0" + i;
          else
              id= i;
     temptxtobj= document.getElementById(txtNamefirst+ id + txtNameLast) ;
     tempchkobj= document.getElementById(chkNamefirst+ id + chkNameLast) ;
  }
   if (!(txtFlag && drpFlag))
       alert("select");

    return  txtFlag && drpFlag;

   }
   </script>

</head>
<body>
   <form id="form1" runat="server" onsubmit="return Submit();">
       <div>
           <asp:GridView ID="GridView1" runat="server"
AutoGenerateColumns="False" Height="80px"
               Width="224px">
               <Columns>
                   <asp:TemplateField HeaderText="Select Txt">
                       <ItemTemplate>
                           <asp:DropDownList ID="dropselect" runat="server">
                               <asp:ListItem>   </asp:ListItem>
                               <asp:ListItem>aaa</asp:ListItem>
                               <asp:ListItem>bbbb</asp:ListItem>
                               <asp:ListItem></asp:ListItem>
                           </asp:DropDownList>
                       </ItemTemplate>
                   </asp:TemplateField>
                   <asp:TemplateField HeaderText="Enter Text">
                       <ItemTemplate>
                           <asp:TextBox ID="txtNameChk" runat="server">
 </asp:TextBox>
                       </ItemTemplate>
                   </asp:TemplateField>
                   <asp:TemplateField HeaderText="Name">
                       <ItemTemplate>
                           <asp:TextBox ID="txtName" runat="server"
Text='<%# DataBinder.Eval(Container.DataItem, "Name")%>'> </asp:TextBox>
                       </ItemTemplate>
                   </asp:TemplateField>
                   <asp:TemplateField HeaderText="Age">
                       <ItemTemplate>
                           <asp:Label ID="ibiage" runat="server"
Text='<%# DataBinder.Eval(Container.DataItem, "Age")%>'></asp:Label>
                       </ItemTemplate>
                   </asp:TemplateField>
               </Columns>
           </asp:GridView>
           <asp:Button ID="Button1" runat="server" Text="Submit" /></div>
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

public partial class GridDropDown : System.Web.UI.Page
{
    private DataTable Data()
    {

        DataTable dt = new DataTable();
        dt.Columns.Add("Name", typeof(string));
        dt.Columns.Add("Age", typeof(int));

        dt.Rows.Add(new object[] { "aaaa", 1 });
        dt.Rows.Add(new object[] { "bbbb", 2 });
        dt.Rows.Add(new object[] { "cccc", 3 });
        dt.Rows.Add(new object[] { "aaaa", 1 });
        dt.Rows.Add(new object[] { "bbbb", 2 });
        dt.Rows.Add(new object[] { "cccc", 3 });
        dt.Rows.Add(new object[] { "aaaa", 1 });
        dt.Rows.Add(new object[] { "bbbb", 2 });
        dt.Rows.Add(new object[] { "cccc", 3 });
        dt.Rows.Add(new object[] { "aaaa", 1 });
        dt.Rows.Add(new object[] { "bbbb", 2 });
        dt.Rows.Add(new object[] { "cccc", 3 });


        return dt;

    }

    protected void Page_Load(object sender, System.EventArgs e)
    {
        if (!this.IsPostBack)
        {
            this.GridView1.DataSource = Data();
            this.GridView1.DataBind();
        }
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc1NDkwMTMzMCwxMDk0MzI4Mzg5LC0zMz
U2MjI4NjAsLTE3MzEyNDY2ODIsLTU0OTI1NDgwMSwxOTQ1NTM3
MTI3LC0xODk0MTk5NDMzLDUwMjA5NjIzMSwtODM1NzcxMTkyLC
01NTI5OTM0MjYsMTU1MzE2MDY4MCw2NjgxOTAwNDksMTIwMzA0
Njk0NiwxNDA3NTE3MzE1LC0zODQxMDUwMTMsLTMxNTY0ODU4OC
wtODAwNTYxOTMwLC0xNzI0MjMzMzc2LC0xNTY1NzEzOTgzLC0y
MDY2NjU1NDc1XX0=
-->