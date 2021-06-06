In this article I will show you how to hide the ASP.NET GridView column from JavaScript. 

```html
<%@ Page Language="C#" AutoEventWireup="true"
CodeFile="HideColumnGridview.aspx.cs"
 Inherits="HideColumnGridview" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">

 <script language="JavaScript">
function hideColumn()
{
col_num = document.getElementById("column_numbder").value;
rows = document.getElementById("GridView1").rows;
for(i=0;i <rows.length;i++)
{
 rows[i].cells[col_num].style.display="none";
}
}
 </script>

 <title>Untitled Page</title>
</head>
<body>
 <form id="form1" runat="server">
     <div>
         <asp:GridView ID="GridView1" runat="server">
         </asp:GridView>
     </div>
     <input id="column_numbder" type="text">
     <input type="button" value="Hide" onclick="hideColumn()">
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

public partial class HideColumnGridview : System.Web.UI.Page
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
     } DataColumn[] dcPk = new DataColumn[1];
     dcPk[0] = objDataTable.Columns["Id"];
     objDataTable.PrimaryKey = dcPk;
     Session["strTemp"] = objDataTable;
     return objDataTable;
 }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTkwODM3NzI4LC0zMzI0NTUzNjNdfQ==
-->