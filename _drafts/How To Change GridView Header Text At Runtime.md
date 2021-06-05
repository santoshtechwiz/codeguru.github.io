As per the Wikipedia,
>ASP.NET is an open-source server-side web application framework designed for web development to produce dynamic web pages developed by Microsoft to allow programmers to build dynamic web sites, applications and services

ASP.NET provides a lot of out of the box control for developing web application; one of them is GrdiView which is used for displaying tabular data. Grandview provides a lot of customization features. In this article, I will show you how to change the GridView header text at runtime.

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ChangeHeaderAtRuntime.aspx.cs"
Inherits="ChangeHeaderAtRuntime" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0
Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
   <title>Untitled Page</title>
</head>
<body>
   <form id="form1" runat="server">
   <div>
    <div>
  <asp:GridView ID="GridView1"  runat="server"
OnRowCreated="GridView1_RowCreated"></asp:GridView>
 
   </div>
 
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

public partial class ChangeHeaderAtRuntime : System.Web.UI.Page
{
   protected void Page_Load(object sender, EventArgs e)
   {
       if (!IsPostBack)
       {
           if (Session["strTemp"] != null)
           {

               GridView1.DataSource = Session["strTemp"] as DataTable;

               GridView1.DataBind();


           }
           else
           {
               GridView1.DataSource = GetCustomMadeDataTable();


               GridView1.DataBind();
           }
       }

   }
   public DataTable GetCustomMadeDataTable()
   {

       //Create a new DataTable object

       System.Data.DataTable objDataTable = new System.Data.DataTable();

       //Create three columns with string as their type

       objDataTable.Columns.Add("Id", typeof(string));
       objDataTable.Columns.Add("Column1", typeof(string));
       objDataTable.Columns.Add("Column2", typeof(string));
       objDataTable.Columns.Add("Column3", typeof(string));


       //Adding some data in the rows of this DataTable
       DataRow dr;
       for (int i = 0; i <= 20; i++)
       {

           dr = objDataTable.NewRow();
           dr[0] = i.ToString();
           dr[1] = "Column1Data" + i.ToString();
           dr[2] = "Column2Data" + i.ToString();
           dr[3] = "Column3Data" + i.ToString();
           objDataTable.Rows.Add(dr);


       }
       DataColumn[] dcPk = new DataColumn[1];
       dcPk[0] = objDataTable.Columns["Id"];
       objDataTable.PrimaryKey = dcPk;
       Session["strTemp"] = objDataTable;


       return objDataTable;
   }
   protected void GridView1_RowCreated(object sender, GridViewRowEventArgs e)
   {
       if (e.Row.RowType == DataControlRowType.Header)
       {
           Int32 idx = 0;
           foreach (TableCell cell in e.Row.Cells)
           {
               cell.Text = String.Format("{0}_{1}", cell.Text, (++idx));
               if (idx % 2 == 0)
               {
                   cell.HorizontalAlign = HorizontalAlign.Right;
               }
               else
               {
                   cell.BackColor = System.Drawing.Color.Blue;
                   cell.ForeColor = System.Drawing.Color.White;
               }
           }
       }

   }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjkxNjI5Nzg4XX0=
-->