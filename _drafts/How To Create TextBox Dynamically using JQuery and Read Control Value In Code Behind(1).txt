`jQuery` is a lightweight, "write less, do more", JavaScript library. The purpose of jQuery is to make it much easier to use JavaScript on your website.
In this article, I will show you how to create HTML control dynamically and read there values in server side. 


```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <script src="Scripts/jquery-1.3.2.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function() {
            $("#btnOfficial").click(function() {
                var hdValue = $("#theValue");
                var num = ($("#theValue").val() - 1) + 2;
                hdValue.val(num);
                var newDiv = $(document.createElement('div')).attr("id", 'my' + num + 'Div');
                newDiv.after().html('<input type="text"  name="TextBox' + num + '" value="TextBox' + num + '" >');
                newDiv.appendTo("#Div1");

            });
        });
    </script>

</head>
<body>
    <form id="form1" runat="server">
    <div id="Div1">
    </div>
    <asp:GridView ID="GridView1" runat="server">
    </asp:GridView>
    <input type="button" id="btnOfficial" value="Add Another TextBox" />
    <input type="hidden" value="1" id="theValue" runat="server" />
    <asp:Button ID="btnSave" runat="server" Text="Read" OnClick="btnSave_Click" />
    </form>
</body>
</html>
```
`Code Behind`
```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {


    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        List<string> alForm = new List<string>();
        //Textbox id is started
        // with 2 like(TextBox2,TextBox3.....
        for (int i = 2; i < Request.Form.Count - 2; i++)
        {
            string strId = "TextBox" + i.ToString();
            string strValue = Request.Form[strId].ToString();
            alForm.Add(strValue);
            strValue = "";


        }
        //Uncomment this line and test.
        //foreach (string x in Request.Form)
        //{

        //   string strValue = Request.Form[x].ToString();
        //  alForm.Add(strValue);

        //}
        GridView1.DataSource = alForm;
        GridView1.DataBind();
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI3MDYzMDQ0MSwxMTIyNTc4MDU2XX0=
-->