
[![](http://4.bp.blogspot.com/_iY3Ra2OqpkA/SKrLAATvHeI/AAAAAAAABRI/gnLXLjHP7_U/s400/grdpagin.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/4438665327716223071#)

This post shows you how to add a custom DropDownlist pager and pager buttons to the GridView as shown below:
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GridViewPaging.aspx.cs" Inherits="GridViewPaging" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title>Untitled Page</title>
</head>
<body>
   <form id="form1" runat="server">
       <div>
           <asp:GridView ID="GridView1" AllowPaging="true" runat="Server" OnRowCreated="GridView1_RowCreated"
               ShowFooter="True" OnPageIndexChanging="GridView1_PageIndexChanging">
               <PagerTemplate>
                   Goto Page
                   <asp:DropDownList ID="ddlPageSelector" runat="server" AutoPostBack="true">
                   </asp:DropDownList>
                   <asp:Button Text="First" CommandName="Page" CommandArgument="First" runat="server"
                       ID="btnFirst" />
                   <asp:Button Text="Previous" CommandName="Page" CommandArgument="Prev" runat="server"
                       ID="btnPrevious" />
                   <asp:Button Text="Next" CommandName="Page" CommandArgument="Next" runat="server"
                       ID="btnNext" />
                   <asp:Button Text="Last" CommandName="Page" CommandArgument="Last" runat="server"
                       ID="btnLast" />
               </PagerTemplate>
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

public partial class GridViewPaging : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            BindGridViewView();
        }
    }
    private void BindGridViewView()
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
    public DataTable GetCustomMadeDataTable()
    {
        //Create a new DataTable object
        System.Data.DataTable objDataTable = new System.Data.DataTable();
        //Create three columns with string as their type
        objDataTable.Columns.Add("ISBN", typeof(string));
        objDataTable.Columns.Add("Title", typeof(string));
        objDataTable.Columns.Add("Publisher", typeof(string));
        objDataTable.Columns.Add("Year", typeof(string));
        DataColumn[] dcPk = new DataColumn[1];
        dcPk[0] = objDataTable.Columns["ISBN"];
        objDataTable.PrimaryKey = dcPk;
        objDataTable.Columns["ISBN"].AutoIncrement = true;
        objDataTable.Columns["ISBN"].AutoIncrementSeed = 1;
        //Adding some data in the rows of this DataTable
        DataRow dr;
        for (int i = 1; i <= 45; i++)
        {
            dr = objDataTable.NewRow();
            dr[1] = "Title" + i.ToString();
            dr[2] = "Publisher" + i.ToString();
            dr[3] = "200" + i.ToString();
            objDataTable.Rows.Add(dr);
        }
        Session["strTemp"] = objDataTable;
        return objDataTable;
    }
    protected void GridView1_RowCreated(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.Pager)
        {
            SetPagerButtonStates(GridView1, e.Row, this);
        }
    }
    public void SetPagerButtonStates(GridView gridView, GridViewRow gvPagerRow, Page page)
    {

        int pageIndex = gridView.PageIndex;
        int pageCount = gridView.PageCount;
        Button btnFirst = (Button)gvPagerRow.FindControl("btnFirst");
        Button btnPrevious = (Button)gvPagerRow.FindControl("btnPrevious");
        Button btnNext = (Button)gvPagerRow.FindControl("btnNext");
        Button btnLast = (Button)gvPagerRow.FindControl("btnLast");
        btnFirst.Enabled = btnPrevious.Enabled = (pageIndex != 0);
        btnNext.Enabled = btnLast.Enabled = (pageIndex < (pageCount - 1));
        DropDownList ddlPageSelector = (DropDownList)gvPagerRow.FindControl("ddlPageSelector");
        ddlPageSelector.Items.Clear();
        for (int i = 1; i <= gridView.PageCount; i++)
        {
            ddlPageSelector.Items.Add(i.ToString());
        }
        ddlPageSelector.SelectedIndex = pageIndex;
        //Anonymous method (see another way to do this at the bottom)
        ddlPageSelector.SelectedIndexChanged += delegate
        {
            GridView1.PageIndex = ddlPageSelector.SelectedIndex;
            BindGridViewView();
        };
        //for vb.net( VB.net 2.0 does not support anonymous methods)

        //protected void ddlPageSelector_SelectedIndexChanged(object sender, EventArgs e) 
        //{
        //GridView1.PageIndex = ((DropDownList)sender).SelectedIndex;
        //GridView1.DataBind();
        //}
    }

    protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        GridView1.PageIndex = e.NewPageIndex;
        BindGridViewView();
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MTM0MDM4OTcsLTMzMjQ1NTM2M119
-->