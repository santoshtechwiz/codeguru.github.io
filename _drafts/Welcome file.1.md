
[![](http://3.bp.blogspot.com/_iY3Ra2OqpkA/Sbz5yEykQ2I/AAAAAAAAB68/clBVFPy99cs/s400/gd_paging.jpg)](https://www.blogger.com/blog/post/edit/6673695286148904603/7378798856969379009#)

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default4.aspx.cs" Inherits="Default4" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title>Untitled Page</title>
</head>
<body>
   <form id="form1" runat="server">
       <div>
           <asp:GridView ID="GridView1" runat="server" AllowPaging="True" AllowSorting="True"
               AutoGenerateColumns="true"  OnDataBound="GridView1_DataBound"
               OnPageIndexChanging="GridView1_PageIndexChanging" OnSorting="GridView1_Sorting">
               <PagerTemplate>
                   <asp:Button ID="btnFirst" runat="server" Text="<< First" CommandArgument="First"
                       CommandName="Page" />
                   <asp:Button ID="btnPrev" runat="server" Text="< Previous" CommandArgument="Prev"
                       CommandName="Page" />
                   Page
                   <asp:DropDownList ID="ddlPages" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlPages_SelectedIndexChanged">
                   </asp:DropDownList>
                   of
                   <asp:Label ID="lblPageCount" runat="server"></asp:Label>
                   <asp:Button ID="btnNext" runat="server" Text="Next >" CommandArgument="Next" CommandName="Page" />
                   <asp:Button ID="btnLast" runat="server" Text="Last >>" CommandArgument="Last" CommandName="Page" />
               </PagerTemplate>
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

public partial class Default4 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            BindGrid();
        } 

    }

    private void BindGrid()
    {
       
        GridView1.DataSource = GetDataSet();
        GridView1.DataBind();
    }
    protected void GridView1_DataBound(Object sender, EventArgs e)
    {
        GridViewRow gvrPager = GridView1.BottomPagerRow;

        if (gvrPager == null) return;

        // get your controls from the gridview
        DropDownList ddlPages =
        (DropDownList)gvrPager.Cells[0].FindControl("ddlPages");
        Label lblPageCount =
        (Label)gvrPager.Cells[0].FindControl("lblPageCount");

        if (ddlPages != null)
        {
            // populate pager
            for (int i = 0; i < GridView1.PageCount; i++)
            {

                int intPageNumber = i + 1;
                ListItem lstItem =
                new ListItem(intPageNumber.ToString());

                if (i == GridView1.PageIndex)
                    lstItem.Selected = true;

                ddlPages.Items.Add(lstItem);
            }
        }

        int itemCount = 0;

        // populate page count
        if (lblPageCount != null)
        {

            //pull the datasource
            DataSet ds = GridView1.DataSource as DataSet;
            if (ds != null)
                itemCount = ds.Tables[0].Rows.Count;

            string pageCount = "<b>" + GridView1.PageCount.ToString() + "</b> (" + itemCount.ToString() + " Items)";
            lblPageCount.Text = pageCount;

        }

        Button btnPrev = (Button)gvrPager.Cells[0].FindControl("btnPrev");
        Button btnNext = (Button)gvrPager.Cells[0].FindControl("btnNext");
        Button btnFirst = (Button)gvrPager.Cells[0].FindControl("btnFirst");
        Button btnLast = (Button)gvrPager.Cells[0].FindControl("btnLast");

        //now figure out what page we're on
        if (GridView1.PageIndex == 0)
        {
            btnPrev.Enabled = false;
            btnFirst.Enabled = false;
        }
        else if (GridView1.PageIndex + 1 == GridView1.PageCount)
        {
            btnLast.Enabled = false;
            btnNext.Enabled = false;
        }
        else
        {
            btnLast.Enabled = true;
            btnNext.Enabled = true;
            btnPrev.Enabled = true;
            btnFirst.Enabled = true;
        }

    }
    protected void ddlPages_SelectedIndexChanged(Object sender, EventArgs e)
    {
        GridViewRow gvrPager = GridView1.BottomPagerRow;
        DropDownList ddlPages = (DropDownList)gvrPager.Cells[0].FindControl("ddlPages");

        GridView1.PageIndex = ddlPages.SelectedIndex;

        // a method to populate your grid
        BindGrid();
    }
    public DataSet GetDataSet()
    {

        DataTable dt = new DataTable("Company");
        DataRow dr;
        dt.Columns.Add(new DataColumn("accountNo", typeof(Int32)));
        dt.Columns.Add(new DataColumn("CompanyName", typeof(string)));
        dt.Columns.Add(new DataColumn("Address", typeof(Int32)));
        for (int i = 0; i <= 10; i++)
        {
            dr = dt.NewRow();
            dr[0] = i;
            dr[1] = "Company" + i + Environment.NewLine + "Title" + i;
            dr[2] = i;
            dt.Rows.Add(dr);
        }

        DataSet ds = new DataSet();
        ds.Tables.Add(dt);
        return ds;
    }
    protected void GridView1_Sorting(object sender, GridViewSortEventArgs e)
    {
        DataSet ds = GetDataSet();

        if (ds != null)
        {


            DataView dataView = new DataView(ds.Tables[0]);
            dataView.Sort = e.SortExpression + " " + GetSortDirection(e.SortExpression);

            GridView1.DataSource = dataView;
            GridView1.DataBind();
        }

    }

    private DataSet GetMyDataSet()
    {
        throw new Exception("The method or operation is not implemented.");
    }

    string GetSortDirection(string sortBy)
    {

        string sortDir = " ASC";
        if (ViewState["sortBy"] != null)
        {
            string sortedBy = ViewState["sortBy"].ToString();

            if (sortedBy == sortBy)
            {
                //the direction should be desc
                sortDir = " DESC";

                //reset the sorter to null
                ViewState["sortBy"] = null;
            }
            else
            {
                //this is the first sort for this row
                //put it to the ViewState
                ViewState["sortBy"] = sortBy;

            }
        }
        else
        {
            //it's null, so this is the first sort
            ViewState["sortBy"] = sortBy;
        }
        return sortDir;

    }
    protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        GridView1.PageIndex = e.NewPageIndex;
        //rebind using your bind routine
        BindGrid();
    }
}
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQwNTMyNjQsLTE3MjQyMzMzNzYsLTE1Nj
U3MTM5ODMsLTIwNjY2NTU0NzUsLTkzODUxNjIzOCwtMzMyNDU1
MzYzXX0=
-->