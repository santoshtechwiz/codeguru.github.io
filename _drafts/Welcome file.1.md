
We have a web based **gridview** displaying data from a database. All cells are template columns containing textboxes. When users alter the text in a textbox you want an event to fire. (the functionality could be compared to that of the table editor in enterprise manger, in that once a user edits a cell and leaves that cell, its updated immediately).

<%@ Page Language="C#" AutoEventWireup="false" CodeFile="TextBoxChange.aspx.cs" Inherits="TextBoxChange" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server" />
        <div>
            <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False">
                <Columns>
                    <asp:TemplateField HeaderText="templateColumn">
                        <ItemTemplate>
                            </asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
    </form>
</body> 

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
using System.Collections.Generic;

public partial class TextBoxChange : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
       

        List<Freight> testList = new List<Freight>();
        Freight f1 = new Freight(1, "USA", 0);
        Freight f2 = new Freight(2, "NZ", 2);
        Freight f3 = new Freight(3, "Aus", 3);
        testList.Add(f1);
        testList.Add(f2);
        testList.Add(f3);

        this.GridView1.DataSource = testList;
        this.GridView1.DataBind();

        // Control ctrl = this.GridView1.FindControl("TextBox1");
        ((TextBox)this.GridView1.Rows[1].Cells[0].Controls[1]).TextChanged += new System.EventHandler(this.TextBox1_TextChanged);

    }
    protected void TextBox1_TextChanged(object sender, EventArgs e)
    {
        string bob;
        bob = "qa";
        bob = "qb";
    }

}



using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

/// <summary>
/// Summary description for Class2
/// </summary>
public class Freight
{
    public Freight()
    { }

    public Freight(int pFreightID, string pName, int pSequence)
    {
        FreightID = pFreightID;
        Name = pName;
        Sequence = pSequence;
    }

   
    int _freightID;
    string _name;
    int _sequence;

    public int FreightID
    {
        get { return _freightID; }
        set { _freightID = value; }
    }
    public string Name
    {
        get { return _name; }
        set { _name = value; }
    }
    public int Sequence
    {
        get { return _sequence; }
        set { _sequence = value; }
    }

}
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU3MjYxODgyNywtOTM4NTE2MjM4LC0zMz
I0NTUzNjNdfQ==
-->