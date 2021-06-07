
<%@ Page Language="C#" AutoEventWireup="true"
CodeFile="HireUsingCodeBhindGrid.aspx.cs"
   Inherits="HireUsingCodeBhindGrid" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title>Untitled Page</title>
</head>
<body>
   <form id="form1" runat="server">
       <div>
           <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" OnRowDataBound="GridView1_RowDataBound">
               <Columns>
                   <asp:BoundField DataField="CompanyName" HeaderText="CompanyName" />
                   <asp:TemplateField>
                       <ItemTemplate>
                           <asp:GridView ID="GridView2" runat="server" AutoGenerateColumns="False">
                               <Columns>
                                   <asp:BoundField DataField="Dept" HeaderText="Department" />
                                   <asp:BoundField DataField="name" HeaderText="Name" />
                               </Columns>
                           </asp:GridView>
                       </ItemTemplate>
                   </asp:TemplateField>
               </Columns>
           </asp:GridView>
       </div>
   </form>
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

public partial class HireUsingCodeBhindGrid : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            GridView1.DataSource = CreateDS().Tables["Company"];
            GridView1.DataBind();
        }

    }
    private DataSet CreateDS()
    {
        DataSet ds;
        if (Session["DataList_ParentChild"] == null)
        {
            ds = new DataSet();
            DataTable dt = new DataTable("Company");
            DataRow dr;
            dt.Columns.Add(new DataColumn("ID", typeof(Int32)));
            dt.Columns.Add(new DataColumn("CompanyName", typeof(string)));
            dt.Columns.Add(new DataColumn("Address", typeof(string)));
            dt.Columns.Add(new DataColumn("Name", typeof(string)));
            dt.Columns.Add(new DataColumn("Dept", typeof(string)));
            for (int i = 1; i < 10; i++)
            {
                dr = dt.NewRow();
                dr[0] = i;
                dr[1] = "Company " + i;
                dr[2] = "Address " + i;
                dr[3] = "Manager name";
                dr[4] = "Adminstration";
                dt.Rows.Add(dr);
            }
            ds.Tables.Add(dt);
            DataColumn[] Parent_PKColumns = new DataColumn[1];
            Parent_PKColumns[0] = dt.Columns["ID"];
            dt.PrimaryKey = Parent_PKColumns;

            dt = new DataTable("Employees");
            dt.Columns.Add(new DataColumn("ID", typeof(Int32)));
            dt.Columns.Add(new DataColumn("CompanyID", typeof(Int32)));
            dt.Columns.Add(new DataColumn("Name", typeof(string)));
            dt.Columns.Add(new DataColumn("Dept", typeof(string)));
            for (int i = 1; i < 10; i++)
            {
                int imax = 0;
                if (i % 2 == 0) imax = 5;
                else imax = 4;
                for (int y = 2; y < imax; y++)    //3 emplyees for each company
                {
                    dr = dt.NewRow();
                    dr[0] = y + i * 5;
                    dr[1] = i;
                    dr[2] = "Employee # " + dr[0];
                    dr[3] = "Dept # " + (y + i);
                    dt.Rows.Add(dr);
                }
            }
            DataColumn[] Child_PKColumns = new DataColumn[1];
            Child_PKColumns[0] = dt.Columns["ID"];
            dt.PrimaryKey = Child_PKColumns;
            ds.Tables.Add(dt);
            DataColumn[] Child_FKColumns = new DataColumn[1];
            Child_FKColumns[0] = dt.Columns["CompanyID"];

            ds.Relations.Add("ParentChild", Parent_PKColumns, Child_FKColumns);
            Session["DataList_ParentChild"] = ds;
        }
        else
        {
            ds = (DataSet)Session["DataList_ParentChild"];
        }
        return ds;

    }
    protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            //Just cast the current DataItem to a DataRowView and then
            //use the method CreateChildView to get a view of the related
            //rows

            ((GridView)e.Row.FindControl("GridView2")).DataSource
                = ((DataRowView)e.Row.DataItem).CreateChildView("ParentChild");
            ((GridView)e.Row.FindControl("GridView2")).DataBind();


        }
    }
}
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MzIwMDU0OTksLTE3MzEyNDY2ODIsLT
U0OTI1NDgwMSwxOTQ1NTM3MTI3LC0xODk0MTk5NDMzLDUwMjA5
NjIzMSwtODM1NzcxMTkyLC01NTI5OTM0MjYsMTU1MzE2MDY4MC
w2NjgxOTAwNDksMTIwMzA0Njk0NiwxNDA3NTE3MzE1LC0zODQx
MDUwMTMsLTMxNTY0ODU4OCwtODAwNTYxOTMwLC0xNzI0MjMzMz
c2LC0xNTY1NzEzOTgzLC0yMDY2NjU1NDc1LC05Mzg1MTYyMzgs
LTMzMjQ1NTM2M119
-->