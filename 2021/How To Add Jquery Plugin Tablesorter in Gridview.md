In this article, I will show you how to use JQuery `tablesorter` plugin in asp.net and make gridview sortable. Checkout the following code snippet.
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <script src="Scripts/jquery-1.3.2.js" type="text/javascript"></script>

    <script src="Scripts/Jquery.tablesorter.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function() {
            $("#grdStudent").tablesorter();
        }
        ); 
    
    </script>

</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:GridView ID="grdStudent" runat="server" UseAccessibleHeader="true">
        </asp:GridView>
    </div>
    </form>
</body>
</html>
```
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            grdStudent.DataSource = new Student().GetAll();
            grdStudent.DataBind();
            MakeAccessible(grdStudent);
        }

    }

    private void MakeAccessible(GridView grid)
    {
        if (grid.Rows.Count > 0)
        {
            //This replaces <td> with <th> and adds the scope attribute
            grid.UseAccessibleHeader = true;

            //This will add the <thead> and <tbody> elements
            grid.HeaderRow.TableSection = TableRowSection.TableHeader;

            //This adds the <tfoot> element. Remove if you don't have a footer row
            grid.FooterRow.TableSection = TableRowSection.TableFooter;
        }
    }
}
public class Student
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public List<Student> GetAll()
    {
        List<Student> list = new List<Student>()
        {
            new Student{FirstName="S001",LastName="L01",Age=21},
            new Student{FirstName="S002",LastName="L21",Age=31},
            new Student{FirstName="S003",LastName="L341",Age=51},
            new Student{FirstName="S004",LastName="L021",Age=51},
            new Student{FirstName="S005",LastName="L0231",Age=45},
            new Student{FirstName="S006",LastName="L0231",Age=26},
            new Student{FirstName="S007",LastName="L021",Age=14},
            new Student{FirstName="S008",LastName="L5401",Age=21},
            new Student{FirstName="S009",LastName="L231",Age=21},
            new Student{FirstName="S009",LastName="L0231",Age=21},
            new Student{FirstName="S011",LastName="L0231",Age=21},

        };

        return list;
    }

}

```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTM0MzUzNDgxMF19
-->