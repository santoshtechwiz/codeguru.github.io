
Selecting a row in the GridView causes a postback. In order to highlight a row in the GridView, you have to set the ‘SelectedRowStyle’ property which takes effect when the postback occurs. In this article, we will see how to highlight a row without causing a postback. We will be using the RowCreated event of the GridView. A GridViewRow object is created for each row in the control before the GridView is rendered. Whenever a row in the GridView gets created, the RowCreated event is fired. Using this event, we can customize the behavior of the GridView. For e.g.: adding client script to the row or customizing the content of the row. Let us see an example where we will be adding some client script to the GridView. I assume that you have some experience of creating data sources and binding controls to it.
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GridViewSelect.aspx.cs"
Inherits="GridViewSelect" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
  <title>Untitled Page</title>
</head>
<body>
  <form id="form1" runat="server">
  <div>
      <asp:GridView ID="GridView1" runat="server"
OnRowCreated="GridView1_RowCreated">
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

public partial class GridViewSelect : System.Web.UI.Page
{
  protected void Page_Load(object sender, EventArgs e)
  {
      if (!IsPostBack)
      {
          if (Session["dtTemp"] != null)
          {
              GridView1.DataSource = Session["dtTemp"] as DataTable;

              GridView1.DataBind();
              this.DataBind();

          }
          else
          {
              GridView1.DataSource = GetCustomMadeDataTable();
              GridView1.DataSource = GetCustomMadeDataTable();
              this.DataBind();

          }
      }

  }
  protected void GridView1_RowCreated(object sender, GridViewRowEventArgs e)
  {
      e.Row.Attributes.Add("onMouseOver", "this.style.background='#eeff00'");
      e.Row.Attributes.Add("onMouseOut", "this.style.background='#ffffff'");   
  }

  public DataTable GetCustomMadeDataTable()
  {

      //Create a new DataTable object

      System.Data.DataTable objDataTable = new System.Data.DataTable();

      //Create three columns with string as their type

      objDataTable.Columns.Add("Id", typeof(string));
      objDataTable.Columns.Add("FirstName", typeof(string));
      objDataTable.Columns.Add("LastName", typeof(string));
      objDataTable.Columns.Add("Address", typeof(string));
      objDataTable.Columns.Add("Email", typeof(string));
      DataRow dr;
      //Adding some data in the rows of this DataTable
      for (int i = 0; i <= 50; i++)
      {
          dr = objDataTable.NewRow();
          dr[0] = i.ToString();
          dr[1] = "FirstName" + i.ToString();
          dr[2] = "LastName" + i.ToString();
          dr[3] = "Address" + i.ToString();
          dr[4] = "Email" + i.ToString();
          objDataTable.Rows.Add(dr);





      }

      DataColumn[] dcPk = new DataColumn[1];
      dcPk[0] = objDataTable.Columns["Id"];
      objDataTable.PrimaryKey = dcPk;
      Session["dtTemp"] = objDataTable;
      return objDataTable;
  }
}
```

As you are already aware that the GridView is rendered as a HTML table and each row as . In the code shown above, we are using the Attributes property of the AttributeCollection to add extra properties to the element. The onMouseOver and the onMouseOut events are added that enable the row to change its color whenever the mouse is over a particular row. Run the application and see the color of the rows changing, that too without a postback!! Well that was a quick overview of the RowCreated event. You can also use the same event to find the index of the row clicked. Just use e.Row.DataItemIndex.ToString() to retrieve the selected row index information.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTY3MTY3OTIwOSwtODM1NzcxMTkyLC01NT
I5OTM0MjYsMTU1MzE2MDY4MCw2NjgxOTAwNDksMTIwMzA0Njk0
NiwxNDA3NTE3MzE1LC0zODQxMDUwMTMsLTMxNTY0ODU4OCwtOD
AwNTYxOTMwLC0xNzI0MjMzMzc2LC0xNTY1NzEzOTgzLC0yMDY2
NjU1NDc1LC05Mzg1MTYyMzgsLTMzMjQ1NTM2M119
-->