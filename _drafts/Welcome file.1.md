
[![](http://4.bp.blogspot.com/_iY3Ra2OqpkA/SdZnA7JopKI/AAAAAAAAB88/3nIAkWoSsnQ/s400/freez.jpg)](https://www.blogger.com/blog/post/edit/6673695286148904603/6963062621936664530#)

In this post i will show how to freeze header of gridview using css.
  

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FreezHeader.aspx.cs" Inherits="FreezHeader" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
  <title>Untitled Page</title>
  <style type="text/css">
      /* Div container to wrap the datagrid */
      div#div-datagrid
      {
          width: 500px;
          height: 200px;
          overflow: auto;
          scrollbar-base-color: #ffeaff;
      }
      /* Locks the left column */
      td.locked, th.locked
      {
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          background-color: navy;
          color: white;
          border-right: 1px solid silver;
          position: relative;
          cursor: default;
          left: expression(document.getElementById("div-datagrid").scrollLeft-2); /*IE5+ only*/
      }
      /* Locks table header */
      th
      {
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          background-color: navy;
          color: white;
          border-right: 1px solid silver;
          position: relative;
          cursor: default;
          top: expression(document.getElementById("div-datagrid").scrollTop-2); /*IE5+ only*/
          z-index: 10;
      }
      /* Keeps the header as the top most item. Important for top left item*/
      th.locked
      {
          z-index: 99;
      }
      /* DataGrid Item and AlternatingItem Style*/
      .GridRow
      {
          font-size: 10pt;
          color: black;
          font-family: Arial;
          background-color: #ffffff;
          height: 35px;
      }
      .GridAltRow
      {
          font-size: 10pt;
          color: black;
          font-family: Arial;
          background-color: #eeeeee;
          height: 35px;
      }
  </style>
</head>
<body>
  <form id="form1" runat="server">
  <div id="div-datagrid">
      <asp:GridView ID="Grd" runat="server" AutoGenerateColumns="false" CssClass="Grid"
          UseAccessibleHeader="true" OnRowDataBound="Grd_RowDataBound" PageSize="10" Height="100px">
          <AlternatingRowStyle CssClass="GridAltRow" Wrap="false" />
          <RowStyle CssClass="GridRow" Wrap="false"></RowStyle>
          <Columns>
              <asp:BoundField DataField="Id" HeaderText="ID" />
              <asp:BoundField DataField="Column2" HeaderText="Column2" />
              <asp:BoundField DataField="Column3" HeaderText="Column3" />
              <asp:BoundField DataField="Column4" HeaderText="Column4" />
              <asp:BoundField DataField="Id" HeaderText="ID" />
              <asp:BoundField DataField="Column2" HeaderText="Column2" />
              <asp:BoundField DataField="Column3" HeaderText="Column3" />
              <asp:BoundField DataField="Column4" HeaderText="Column4" />
              <asp:BoundField DataField="Id" HeaderText="ID" />
              <asp:BoundField DataField="Column2" HeaderText="Column2" />
              <asp:BoundField DataField="Column3" HeaderText="Column3" />
              <asp:BoundField DataField="Column4" HeaderText="Column4" />
              <asp:BoundField DataField="Id" HeaderText="ID" />
              <asp:BoundField DataField="Column2" HeaderText="Column2" />
              <asp:BoundField DataField="Column3" HeaderText="Column3" />
              <asp:BoundField DataField="Column4" HeaderText="Column4" />
              <asp:BoundField DataField="Id" HeaderText="ID" />
              <asp:BoundField DataField="Column2" HeaderText="Column2" />
              <asp:BoundField DataField="Column3" HeaderText="Column3" />
              <asp:BoundField DataField="Column4" HeaderText="Column4" />
          </Columns>
      </asp:GridView>
  </div>
  </form>
</body>
</html>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class FreezHeader : System.Web.UI.Page
{
   protected void Page_Load(object sender, EventArgs e)
   {

       if (!IsPostBack)
       {
           if (Session["s"] != null)
           {
               Grd.DataSource = Session["s"] as DataTable;

               Grd.DataBind();


           }
           else
           {
               Grd.DataSource = GetCustomMadeDataTable();


               Grd.DataBind();
           }
       }

   }
   public DataTable GetCustomMadeDataTable()
   {

       //Create a new DataTable object

       System.Data.DataTable objDataTable = new System.Data.DataTable();

       //Create three columns with string as their type

       objDataTable.Columns.Add("Id", typeof(string));
       objDataTable.Columns.Add("Column2", typeof(string));
       objDataTable.Columns.Add("Column3", typeof(string));
       objDataTable.Columns.Add("Column4", typeof(string));
       objDataTable.Columns.Add("Column5", typeof(string));

       //Adding some data in the rows of this DataTable
       objDataTable.Rows.Add(new string[] { "1", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "2", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "3", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "4", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "5", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "6", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "7", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "8", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "9", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "10", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "11", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "12", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "13", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "14", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "15", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "16", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "17", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "18", "R1C1 ", " Column3", "Test", "Test" });
       objDataTable.Rows.Add(new string[] { "19", "R1C1 ", " Column3", "Test", "Test" });
       DataColumn[] dcPk = new DataColumn[1];
       dcPk[0] = objDataTable.Columns["Id"];
       objDataTable.PrimaryKey = dcPk;
       Session["s"] = objDataTable;
       return objDataTable;
   }
   protected void Grd_RowDataBound(object sender, GridViewRowEventArgs e)
   {
       e.Row.Cells[0].CssClass = "locked";
       e.Row.Cells[1].CssClass = "locked";
   }
}
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTYyNTk5MzMwNSwtMzMyNDU1MzYzXX0=
-->