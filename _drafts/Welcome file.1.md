
[![](http://1.bp.blogspot.com/_iY3Ra2OqpkA/SJwEaTU5toI/AAAAAAAABOM/1wZNauFqvYc/s400/exclusive.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/3651813876830606022#)

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MutuallyexGrid.aspx.cs" Inherits="MutuallyexGrid" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title>Untitled Page</title>
   <script type="text/javascript" language="javascript">
   function uncheckOthers(id)
   {      
       var elm = document.getElementsByTagName('input');      
       for(var i = 0; i < elm.length; i++)
       {                          
           if(elm.item(i).id.substring(id.id.lastIndexOf('_')) == id.id.substring(id.id.lastIndexOf('_')))
           {
               if( elm.item(i).type == "checkbox" && elm.item(i)!=id)
                   elm.item(i).checked = false;
           }
       }
   }      
   </script>
</head>
<body>
   <form id="form1" runat="server">
       <div>
           <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" OnRowDataBound="GridView1_RowDataBound"
               CellPadding="4" ForeColor="#333333" GridLines="None">
               <Columns>
                   <asp:TemplateField HeaderText="Select">
                       <ItemTemplate>
                           <asp:CheckBox ID="CheckBox1" runat="server" />
                       </ItemTemplate>
                   </asp:TemplateField>
                   <asp:BoundField DataField="Contact Name" HeaderText="Name" />
               </Columns>
               <FooterStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
               <RowStyle BackColor="#F7F6F3" ForeColor="#333333" />
               <PagerStyle BackColor="#284775" ForeColor="White" HorizontalAlign="Center" />
               <SelectedRowStyle BackColor="#E2DED6" Font-Bold="True" ForeColor="#333333" />
               <HeaderStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
               <EditRowStyle BackColor="#999999" />
               <AlternatingRowStyle BackColor="White" ForeColor="#284775" />
           </asp:GridView>
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

public partial class MutuallyexGrid : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            GridView1.DataSource = _sampleData;
            GridView1.DataBind();
        }

    }
    public DataTable _sampleData
    {
        get
        {
            DataTable dt = (DataTable)Session["DataTable"];
            if (dt == null)
            {
                dt = new DataTable();
                dt.Columns.Add(new DataColumn("Contact Name", typeof(string)));
                dt.Columns.Add(new DataColumn("Company Name", typeof(string)));
                dt.Columns.Add(new DataColumn("City", typeof(string)));
                dt.Columns.Add(new DataColumn("Country", typeof(string)));

                dt.Rows.Add(new object[] { "Maria Anders", "Alfreds Futterkiste", "Berlin", "Germany" });
                dt.Rows.Add(new object[] { "Ana Trujillo", "Emparedados y helados ", "México D.F.", "Mexico" });
                dt.Rows.Add(new object[] { "Antonio Moreno", "Antonio Moreno Taquería", "México D.F.", "Mexico" });
                Session["DataTable"] = dt;
            }
            return dt;
        }
        set
        {
            Session["DataTable"] = value;
        }
    }
    protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                string strScript = "uncheckOthers(" + ((CheckBox)e.Row.Cells[0].FindControl("CheckBox1")).ClientID + ");";
                ((CheckBox)e.Row.Cells[0].FindControl("CheckBox1")).Attributes.Add("onclick", strScript);
            }
        }
        catch (Exception Ex)
        {
            //report error
        }
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQyMDAxMzI4OSwtMTY3NjQyMjM2NCwxNz
U0OTAxMzMwLDEwOTQzMjgzODksLTMzNTYyMjg2MCwtMTczMTI0
NjY4MiwtNTQ5MjU0ODAxLDE5NDU1MzcxMjcsLTE4OTQxOTk0Mz
MsNTAyMDk2MjMxLC04MzU3NzExOTIsLTU1Mjk5MzQyNiwxNTUz
MTYwNjgwLDY2ODE5MDA0OSwxMjAzMDQ2OTQ2LDE0MDc1MTczMT
UsLTM4NDEwNTAxMywtMzE1NjQ4NTg4LC04MDA1NjE5MzAsLTE3
MjQyMzMzNzZdfQ==
-->