
[![](http://1.bp.blogspot.com/_iY3Ra2OqpkA/SLT-4XkZ9eI/AAAAAAAABSs/gI1noE7kC-s/s400/cascade_dropdown.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/8006761619418300614#)

Many a times there are circumstances where by we need to use dropdown list inside a Gridview and also handle the index changed event of the dropdown list. The easy example of this kind of requirement would be when we nee to fill another dropdown list in the same row from the value selected in the first dropdown list. We all know that the dropdown list does not support command name property so you cannot handle the event in the row command event.

A simple solution to the problem is to use the namingcontainer in the selectedindexchanged event and get the reference of the parent row view. After that we can do what we want from the row view. Here is an example in the code.
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GridViewDropDown.aspx.cs"
   Inherits="GridViewDropDown" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title>Untitled Page</title>
</head>
<body>
   <form id="form1" runat="server">
       <div>
           <asp:GridView ID="GridView1" runat="Server" AutoGenerateColumns="False">
               <Columns>
                   <asp:TemplateField HeaderText="Publisher">
                       <ItemTemplate>
                           <asp:DropDownList ID="ddlPub" runat="Server" AutoPostBack="true" OnSelectedIndexChanged="ddlPub_SelectedIndexChanged"
                               DataSource='<%#GetCustomMadeDataTable()%>' DataTextField="Publisher">
                           </asp:DropDownList>
                       </ItemTemplate>
                   </asp:TemplateField>
                   <asp:TemplateField HeaderText="Title">
                       <ItemTemplate>
                           <asp:DropDownList ID="ddlTitle" runat="Server">
                           </asp:DropDownList>
                       </ItemTemplate>
                   </asp:TemplateField>
               </Columns>
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

public partial class GridViewDropDown : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            BindGridViewView();
            this.DataBind();
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
        objDataTable.Columns.Add("ISBN", typeof(int));
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
        for (int i = 1; i <= 5; i++)
        {
            dr = objDataTable.NewRow();
            dr[1] = "Title" + i.ToString();
            dr[2] = "Publisher" + i.ToString();
            dr[3] = "200" + i.ToString();
            objDataTable.Rows.Add(dr);
        }
        for (int i = 6; i <= 8; i++)
        {
            dr = objDataTable.NewRow();
            dr[1] = "Computer" + i.ToString();
            dr[2] = "TMH" + i.ToString();
            dr[3] = "200" + i.ToString();
            objDataTable.Rows.Add(dr);
        }
        Session["strTemp"] = objDataTable;
        return objDataTable;
    }

    protected ArrayList RelatedData(string s)
    {
        ArrayList ar = new ArrayList();
        if (s == "Publisher1")
        {

            ar.Add("Book1");
            ar.Add("Book2");


        }
        if (s == "Publisher2")
        {

            ar.Add("Computer");
            ar.Add("C#");

        }
        return ar;
    }
    protected void ddlPub_SelectedIndexChanged(object sender, EventArgs e)
    {
        // get reference to the row
        GridViewRow gvr = (GridViewRow)(((Control)sender).NamingContainer);

        // Get the reference of this DropDownlist
        DropDownList dropdownlist1 = (DropDownList)gvr.FindControl("ddlPub");

        // Get the reference of other DropDownlist in the same row.
        DropDownList ddlParagraph = (DropDownList)gvr.FindControl("ddlTitle");

        string strValue = dropdownlist1.SelectedItem.Text;
        ddlParagraph.DataSource = RelatedData(strValue);
        ddlParagraph.DataBind();
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTkzODUxNjIzOCwtMzMyNDU1MzYzXX0=
-->