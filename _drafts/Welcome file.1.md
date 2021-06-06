
    

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TimeDisplay.aspx.cs" Inherits="TimeDisplay" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
   <title>Untitled Page</title>
</head>
<body>
   <form id="form1" runat="server">
       <div>
           <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False">
               <Columns>
                   <asp:BoundField DataField="Id" HeaderText="Id" />
                   <asp:TemplateField HeaderText="LastActivityDate" SortExpression="LastActivityDate">
                       <ItemTemplate>
                           <asp:Label ID="lblDate" runat="Server" Text='<%#formatDate(Eval("DateTime").ToString()) %>'></asp:Label>
                       </ItemTemplate>
                   </asp:TemplateField>
               </Columns>
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

public partial class TimeDisplay : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["dtTemp"] != null)
            {
                GridView1.DataSource = Session["dtTemp"] as DataTable;
                GridView1.DataBind();

            }
            else
            {
                GridView1.DataSource = GetCustomMadeDataTable();
                this.DataBind();
            }
        }

    }
    public DataTable GetCustomMadeDataTable()
    {
        //Create a new DataTable object
        System.Data.DataTable objDataTable = new System.Data.DataTable();
        //Create three columns with string as their type
        objDataTable.Columns.Add("Id", typeof(string));
        objDataTable.Columns.Add("DateTime", typeof(DateTime));
        DataRow dr;
        //Adding some data in the rows of this DataTable
        for (int i = 0; i <= 10; i++)
        {
            dr = objDataTable.NewRow();
            dr[0] = i.ToString();
            dr[1] = DateTime.Now.ToShortDateString();
            objDataTable.Rows.Add(dr);
        }
        DataColumn[] dcPk = new DataColumn[1];
        dcPk[0] = objDataTable.Columns["Id"];
        objDataTable.PrimaryKey = dcPk;
        Session["dtTemp"] = objDataTable;
        return objDataTable;
    }
    public object formatDate(object dt1)
    {
        DateTime dt = Convert.ToDateTime(dt1); string fdate = "";
        Int32 days = DateTime.Now.Day - dt.Day; Int32 hours = DateTime.Now.Hour - dt.Hour; if (days == 0)
        {
            if (hours == 1)
            {
                fdate = hours + " hour ago.";
            }
            else
            {
                fdate = hours + " hours ago.";
            }
        }
        else if (days == 1)
        {
            if (hours == 1)
            {
                fdate = days + " day, " + hours + " hour ago.";
            }
            else
            {
                fdate = days + " day, " + hours + " hours ago.";
            }
        }
        else if (days > 1)
        {
            if (hours == 1)
            {
                fdate = days + " days, " + hours + " hour ago.";
            }
            else
            {
                fdate = days + " days, " + hours + " hours ago.";
            }
        }

        return fdate;
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjY4MTkwMDQ5LDEyMDMwNDY5NDYsMTQwNz
UxNzMxNSwtMzg0MTA1MDEzLC0zMTU2NDg1ODgsLTgwMDU2MTkz
MCwtMTcyNDIzMzM3NiwtMTU2NTcxMzk4MywtMjA2NjY1NTQ3NS
wtOTM4NTE2MjM4LC0zMzI0NTUzNjNdfQ==
-->