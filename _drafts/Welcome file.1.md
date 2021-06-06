
[![](http://3.bp.blogspot.com/_iY3Ra2OqpkA/SBI0XSSxCPI/AAAAAAAAA2A/6hAgJX2317A/s400/su.bmp)](https://www.blogger.com/blog/post/edit/6673695286148904603/306381001595575064#)  
  

  
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DisplayColumnSummery.aspx.cs"  
  Inherits="DisplayColumnSummery" %>  
  
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml">  
<head runat="server">  
  <title>Untitled Page</title>  
</head>  
<body>  
  <form id="form1" runat="server">  
      <div>  
          <asp:GridView ID="grdMovies" OnRowDataBound="grdMovies_RowDataBound" AutoGenerateColumns="false"  
              ShowFooter="true" runat="server">  
              <Columns>  
                  <asp:BoundField DataField="Name" HeaderText="Name" />  
                  <asp:TemplateField HeaderText="Box Office Totals">  
                      <ItemTemplate>  
                          <%# Eval("SellPrice", "{0:c}")%>  
                      </ItemTemplate>  
                      <FooterTemplate>  
                          <asp:Label ID="lblSummary" runat="server" />  
                      </FooterTemplate>  
                  </asp:TemplateField>  
              </Columns>  
          </asp:GridView>  
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
  
public partial class DisplayColumnSummery : System.Web.UI.Page  
{  
    protected void Page_Load(object sender, EventArgs e)  
    {  
        grdMovies.DataSource = GetData();  
        grdMovies.DataBind();  
  
    }  
    public DataSet GetData()  
    {  
        DataSet ds = new DataSet();  
        DataTable dt = new DataTable("Movie");  
        DataRow dr;  
        dt.Columns.Add(new DataColumn("Id", typeof(Int32)));  
        dt.Columns.Add(new DataColumn("Name", typeof(string)));  
        dt.Columns.Add(new DataColumn("SellPrice", typeof(Int32)));  
        for (int i = 1; i <= 10; i++)  
        {  
            dr = dt.NewRow();  
            dr[0] = i;  
            dr[1] = "Name" + i.ToString();  
            dr[2] = 1 * 3;  
            dt.Rows.Add(dr);  
        }  
        ds.Tables.Add(dt);  
        Session["dt"] = dt;  
        return ds;  
    }  
    int _boxOfficeTotalsTotal = 0;  
    protected void grdMovies_RowDataBound(object sender, GridViewRowEventArgs e)  
    {  
          
        if(e.Row.RowType==DataControlRowType.DataRow)  
        {  
  
            int boxOfficeTotals = int.Parse(DataBinder.Eval(e.Row.DataItem, "SellPrice").ToString());  
            _boxOfficeTotalsTotal += boxOfficeTotals;  
  
  
  
        }  
        {  
            if (e.Row.RowType == DataControlRowType.Footer)  
            {  
                Label lblSummary = (Label)e.Row.FindControl("lblSummary");  
                lblSummary.Text = string.Format("Total: {0:c}", _boxOfficeTotalsTotal);  
            }  
        }  
  
  
    }  
}
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE3OTU4NDIwMywtMzE1NjQ4NTg4LC04MD
A1NjE5MzAsLTE3MjQyMzMzNzYsLTE1NjU3MTM5ODMsLTIwNjY2
NTU0NzUsLTkzODUxNjIzOCwtMzMyNDU1MzYzXX0=
-->