Asp.net `Gridview` control is a feature-rich control used to display and edit the record on the web page. Gridview supports to edit, delete and update features out of the box. 
In this article, I will show you how to read the cell value of Gridview using jquery.
The code is self-explanatory.



![Photobucket](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2Fi951.photobucket.com%2Falbums%2Fad355%2Fexcusemedoiknowu%2Fcell_grid.gif&container=blogger&gadget=a&rewriteMime=image%2F*)

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <script src="Scripts/jquery-1.3.2.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function() {
            var list = "";
            $("#btnGet").click(function() {
                $("#<%=GridView1.ClientID %> tr").each(function() {
                    //Skip first(header) row
                    if (!this.rowIndex) return;
                    var age = $(this).find("td:last").html();
                    list += age + "</br>";

                });
                $("#listAge").html(list)
            });

        });
    </script>

</head>
<body>
    <form id="form1" runat="server">
    <div>
    </div>
    <asp:GridView ID="GridView1" runat="server">
    </asp:GridView>
    <input type="button" id="btnGet" value="Get Cell Value" />
    <div id="listAge">
    </div>
    </form>
</body>
</html>
```
> code behind
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
       //Create Object of person class
        Person personObject = new Person();
        //Assign Person list to GridView
        GridView1.DataSource = personObject.GetPersonList();
        //Call Bindmethod of GridView
        GridView1.DataBind();

    }
}
public class Person
{
    public int ID { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public List<Person> GetPersonList()
    {
        //Retrun List of Person
        List<Person> list = new List<Person>()
        {
            new Person{ID=1,Name="Person1",Age=32},
            new Person{ID=2,Name="Person2",Age=45},
            new Person{ID=3,Name="Person3",Age=43},
            new Person{ID=4,Name="Person4",Age=21},
            new Person{ID=5,Name="Person5",Age=76},
            new Person{ID=6,Name="Person6",Age=54},

        };

        return list;

    }

}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzc1NjcwNzY4XX0=
-->