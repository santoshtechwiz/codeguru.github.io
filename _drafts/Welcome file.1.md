
[![](http://4.bp.blogspot.com/_iY3Ra2OqpkA/R_u2y5uTE0I/AAAAAAAAAzU/7jsxKx8rIyU/s400/search.bmp)](https://www.blogger.com/blog/post/edit/6673695286148904603/47245049969282190#)  
  

  ```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GridViewSearchHeighlight.aspx.cs"  
  Inherits="GridViewSearchHeighlight" %>  
  
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml">  
<head runat="server">  
  <title>Untitled Page</title>  
  <style type="text/css">  
.highlight{  
background-color: red;  
}  
</style>  
</head>  
<body>  
  <form id="form1" runat="server">  
      <asp:ScriptManager ID="s" runat="server">  
      </asp:ScriptManager>  
      <div>  
          <asp:UpdatePanel ID="UpdatePanel1" runat="server"  
UpdateMode="Conditional">  
              <ContentTemplate>  
                  <div>  
                      Filter selected column:  
                      <asp:TextBox ID="FilterText" runat="server"  
OnTextChanged="FilterText_TextChanged" />  
                  </div>  
                  <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="false"   
AllowPaging="True"  
                      AllowSorting="True" OnRowDataBound="GridView1_RowDataBound"  
OnPageIndexChanged="GridView1_PageIndexChanged"  
                      OnSorted="GridView1_Sorted">  
                      <Columns>  
                          <asp:BoundField DataField="Id" HeaderText="Id"  
SortExpression="Id" />  
                          <asp:BoundField DataField="Address" HeaderText="Address"  
SortExpression="Address" />  
                          <asp:BoundField DataField="City" HeaderText="Address"  
SortExpression="City" />  
                      </Columns>  
                  </asp:GridView>  
              </ContentTemplate>  
          </asp:UpdatePanel>  
      </div>  
  </form>  
  
  <script type="text/javascript">  
      Sys.Application.add_load(page_load);  
      Sys.Application.add_unload(page_unload);  
      function page_load(){  
                  $addHandler($get('FilterText'), 'keydown', onFilterTextChanged);  
                          }  
     function page_unload(){  
          $removeHandler($get('FilterText'), 'keydown',  
          onFilterTextChanged);  
          }  
      var timeoutID = 0;  
      function onFilterTextChanged(e){  
      if (timeoutID){  
          window.clearTimeout(timeoutID);  
      }  
      timeoutID = window.setTimeout(updateFilterText, 1000);  
  }  
      function updateFilterText(){  
      __doPostBack('FilterText', '');  
      }  
  </script>  
  
</body>  
</html>  

  

  
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
using System.Text;  
  
public partial class GridViewSearchHeighlight : System.Web.UI.Page  
{  
   protected void Page_Load(object sender, EventArgs e)  
   {  
  
  
       if (!IsPostBack)  
       {  
  
           BindGrid();  
       }  
   }  
   public DataTable GetCustomMadeDataTable()  
   {  
  
       //Create a new DataTable object  
       System.Data.DataTable objDataTable = new System.Data.DataTable();  
       //Create three columns with string as their type  
       objDataTable.Columns.Add("Id", typeof(int));  
       objDataTable.Columns.Add("Address", typeof(string));  
       objDataTable.Columns.Add("City", typeof(string));  
       objDataTable.Columns.Add("Postalcode", typeof(string));  
       //Adding some data in the rows of this DataTable  
       DataRow dr;  
       int intIndex = 900;  
       for (int i = 1; i <10; i++)  
       {  
  
           dr = objDataTable.NewRow();  
           dr[0] = i;  
           dr[1] = "Address" + i.ToString();  
           dr[2] = "City" + i.ToString();  
           dr[3] = "Postalcode" + intIndex.ToString();  
           objDataTable.Rows.Add(dr);  
           intIndex++;  
  
       }  
       for (int i = 10; i < 20; i++)  
       {  
  
           dr = objDataTable.NewRow();  
           dr[0] = i;  
           dr[1] = "bbb" + i.ToString();  
           dr[2] = "City" + i.ToString();  
           dr[3] = "Postalcode" + intIndex.ToString();  
           objDataTable.Rows.Add(dr);  
           intIndex++;  
  
       }  
       for (int i = 20; i <30; i++)  
       {  
  
           dr = objDataTable.NewRow();  
           dr[0] = i;  
           dr[1] = "cde" + i.ToString();  
           dr[2] = "City" + i.ToString();  
           dr[3] = "Postalcode" + intIndex.ToString();  
           objDataTable.Rows.Add(dr);  
           intIndex++;  
  
       }  
  
       DataColumn[] dcPk = new DataColumn[1];  
       dcPk[0] = objDataTable.Columns["Id"];  
       objDataTable.PrimaryKey = dcPk;  
       Session["strTemp"] = objDataTable;  
  
  
       return objDataTable;  
   }  
  
   public void BindGrid()  
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
  
   protected void GridView1_Sorted(object sender, EventArgs e)  
   {  
       UpdateFilter();  
   }  
   protected void GridView1_PageIndexChanged(object sender, EventArgs e)  
   {  
       UpdateFilter();  
   }  
   protected void Filter_Click(object sender, EventArgs e)  
   {  
       UpdateFilter();  
   }  
   protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)  
   {  
       if (e.Row.RowType != DataControlRowType.DataRow)  
  
           return;  
       int colIndex = GetColumnIndex("Address");  
       TableCell cell = e.Row.Cells[colIndex];  
  
       string cellText = cell.Text;  
       int leftIndex = cellText.IndexOf(FilterText.Text,  
       StringComparison.OrdinalIgnoreCase);  
       int rightIndex = leftIndex + FilterText.Text.Length;  
       StringBuilder builder = new StringBuilder();  
       builder.Append(cellText, 0, leftIndex);  
       builder.Append("<span class=\"highlight\">");  
       builder.Append(cellText, leftIndex, rightIndex - leftIndex);  
       builder.Append("</span>");  
       builder.Append(cellText, rightIndex,  
       cellText.Length - rightIndex);  
       cell.Text = builder.ToString();  
  
  
   }  
   protected void FilterText_TextChanged(object sender, EventArgs e)  
   {  
       UpdateFilter();  
   }  
   private void UpdateFilter()  
   {  
       DataTable dt = Session["strTemp"] as DataTable;  
       DataView dv = new DataView(dt);  
  
       string filterExpression = null;  
       if (!String.IsNullOrEmpty(FilterText.Text))  
           filterExpression = string.Format("{0}  '%{1}%'",  
           GridView1.SortExpression, FilterText.Text);  
  
       dv.RowFilter = "Address like" + filterExpression;  
       GridView1.DataSource = dv;  
       GridView1.DataBind();  
       //SqlDataSource1.FilterExpression = filterExpression;  
   }  
   private int GetColumnIndex(string columnName)  
   {  
       for (int i = 0; i < GridView1.Columns.Count; i++)  
       {  
           BoundField field = GridView1.Columns[i] as BoundField;  
           if (field != null && field.DataField == columnName)  
               return i;  
       }  
       return -1;  
   }  
}
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTM5ODM3NzE3LC0xODk0MTk5NDMzLDUwMj
A5NjIzMSwtODM1NzcxMTkyLC01NTI5OTM0MjYsMTU1MzE2MDY4
MCw2NjgxOTAwNDksMTIwMzA0Njk0NiwxNDA3NTE3MzE1LC0zOD
QxMDUwMTMsLTMxNTY0ODU4OCwtODAwNTYxOTMwLC0xNzI0MjMz
Mzc2LC0xNTY1NzEzOTgzLC0yMDY2NjU1NDc1LC05Mzg1MTYyMz
gsLTMzMjQ1NTM2M119
-->