
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Assembly.aspx.cs"
Inherits="Assembly" %>

<%@ Assembly Src="MyAddFunctionClass.cs" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>Untitled Page</title>
</head>
<body>
<form id="form1" runat="server">
    <div>
    <asp:GridView ID="GridView1" runat="server" DataKeyNames="Id" 
AutoGenerateColumns="False"
       OnRowUpdating="GridView1_RowUpdating" OnRowEditing="GridView1_RowEditing"
OnRowCancelingEdit="GridView1_RowCancelingEdit"
        >
        <Columns>
           <asp:BoundField DataField="Id" HeaderText="Id" ReadOnly="True" />
            <asp:BoundField DataField="Column1" HeaderText="Column1" />
             <asp:BoundField DataField="Column2" HeaderText="Column2" />
             <asp:TemplateField>
                <ItemTemplate>
                    <asp:CheckBox ID="CheckBox1" runat="server"
OnCheckedChanged="CheckBox1_CheckedChanged"
                        OnDataBinding="CheckBox1_DataBinding" />
                 </ItemTemplate>
              </asp:TemplateField>
          <asp:CommandField ShowEditButton="True" ShowCancelButton="true"
ButtonType="Link"/>
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

public partial class Assembly : System.Web.UI.Page
{
protected void Page_Load(object sender, EventArgs e)
{
    if (!IsPostBack)
    {
        BindGrid();
    }

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
public DataTable GetCustomMadeDataTable()
{

    //Create a new DataTable object
    System.Data.DataTable objDataTable = new System.Data.DataTable();
    //Create three columns with string as their type
    objDataTable.Columns.Add("Id", typeof(int));
    objDataTable.Columns.Add("Column1", typeof(string));
    objDataTable.Columns.Add("Column2", typeof(string));
    objDataTable.Columns.Add("Column3", typeof(string));
    //Adding some data in the rows of this DataTable
    DataRow dr;
    for (int i = 1; i <= 20; i++)
    {

        dr = objDataTable.NewRow();
        dr[0] = i;
        dr[1] = "Column1Data" + i.ToString();
        dr[2] = "Column2Data" + i.ToString();
        dr[3] = "Column3Data" + i.ToString();
        objDataTable.Rows.Add(dr);


    }
    DataColumn[] dcPk = new DataColumn[1];
    dcPk[0] = objDataTable.Columns["Id"];
    objDataTable.PrimaryKey = dcPk;
    Session["strTemp"] = objDataTable;


    return objDataTable;
}
protected void CheckBox1_CheckedChanged(object sender, EventArgs e)
{
    CheckBox checkbox = (CheckBox)sender;
    if (checkbox.Checked)
    {
        ViewState[checkbox.UniqueID] = true;
    }
    else
    {
        ViewState.Remove(checkbox.UniqueID);
    }
}

protected void CheckBox1_DataBinding(object sender, EventArgs e)
{
    CheckBox checkbox = (CheckBox)sender;
    checkbox.Checked = ViewState[checkbox.UniqueID] != null;
}
protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
{
           
   int productID = (int)((DataKey)GridView1.DataKeys[e.RowIndex]).Value;
   string str1 = ((TextBox)(GridView1.Rows[e.RowIndex].Cells[1].Controls[0])).Text;
   string str2 = ((TextBox)(GridView1.Rows[e.RowIndex].Cells[2].Controls[0])).Text;
    DataTable dt = Session["strTemp"] as DataTable;


    DataRow[] rows = dt.Select("ID = " + productID);
    rows[0]["Column1"] = str1;
    rows[0]["Column2"] = str2;
    GridView1.EditIndex = -1;
    BindGrid();

}
protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
{
    GridView1.EditIndex = e.NewEditIndex;
    BindGrid();

}
protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
{
    GridView1.EditIndex = -1;
    GridView1.DataSource = GetCustomMadeDataTable();
    BindGrid();

}

}
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY4OTgyNzAzMiwtMzg0MTA1MDEzLC0zMT
U2NDg1ODgsLTgwMDU2MTkzMCwtMTcyNDIzMzM3NiwtMTU2NTcx
Mzk4MywtMjA2NjY1NTQ3NSwtOTM4NTE2MjM4LC0zMzI0NTUzNj
NdfQ==
-->