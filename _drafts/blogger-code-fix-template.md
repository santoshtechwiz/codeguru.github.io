Suppose you have a massive list of data and you want to show it on a web page. In that case, you must provide Paging functionality to improve the page's performance and good user experience. ASP.NET out of the box offers a paging feature, but we will see how to implement alphabet paging in this article. In this example, I am using ASP.NET GridView control for paging. Still, you are free to choose other controls like ASP.NET DataList, Repeater or FormView control. Check out the following code snippet written in C#.

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AlphabetPaging.aspx.cs" Inherits="AlphabetPaging" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title>Untitled Page</title>
</head>
<body>
  <form id="form1" runat="server">
      <div>
          <asp:GridView ID="GridView1" runat="server" ShowFooter="True" OnRowCreated="GridView1_RowCreated"
               OnRowCommand="GridView1_RowCommand">
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
using System.Web.Script.Serialization;

public partial class AlphabetPaging : System.Web.UI.Page
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
       for (int i = 65; i <= (65 + 25); i++)
       {

           dr = objDataTable.NewRow();
           dr[0] = i.ToString();
           dr[1] = Char.ConvertFromUtf32(i)+"Column1Data" + i.ToString();
           dr[2] = Char.ConvertFromUtf32(i+1)+"Column2Data" + i.ToString();
           dr[3] = Char.ConvertFromUtf32(i+2)+"Column3Data" + i.ToString();
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
       if (e.Row.RowType == DataControlRowType.Footer)
       {

           TableCell cell = e.Row.Cells[0];
           cell.ColumnSpan = 2;

           for (int i = 65; i <= (65 + 25); i++)
           {
               LinkButton lb = new LinkButton();

               lb.Text = Char.ConvertFromUtf32(i) + " ";
              
               lb.CommandArgument = "%" + Char.ConvertFromUtf32(i) + "%";
               lb.CommandName = "AlphaPaging";

               cell.Controls.Add(lb);

           }
       }
   }
   protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
   {
       //At first I check that if the CommandName is “AlphaPaging”
       if (e.CommandName.Equals("AlphaPaging"))
       {
       
           GridView1.DataSource = GetById(e.CommandArgument.ToString());
           GridView1.DataBind();
       }
   }

   public DataView GetById(string id)
   {

       //Fetch record from database using like operator.
       DataTable dt = new DataTable();
       dt = Session["strTemp"] as DataTable;
       DataView dv = dt.DefaultView;

       dv.RowFilter = "Column1 LIKE '" + id + "'";
       return dv;


   }
}
```