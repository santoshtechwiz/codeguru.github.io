PDF is a very popular document format; the advantage of PDF is that end-user doesn't have any dependencies with the host operating system.
In this article I will show you how to fill the PDF form field using very popular open source pdf library iTextSharp. The code is very simple and self-explonatory.
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    </div>
    <asp:Button ID="Button1" runat="server" Text="Fill Pdf" OnClick="Button1_Click" />
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
using iTextSharp.text.pdf;
using System.IO;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    private void fillForm()
    {
        string formFile = Server.MapPath(@"Old\e.pdf");
        string newFile = Server.MapPath(@"New\e.pdf");
        PdfReader reader = new PdfReader(formFile);
        PdfStamper stamper = new PdfStamper(reader, new FileStream(
                    newFile, FileMode.Create));
        AcroFields fields = stamper.AcroFields;

        PdfContentByte d = new PdfContentByte(stamper.Writer);

        // set form fields
        fields.SetField("name", "[NAME_TEXT]");
        fields.SetField("msg", "[YOUR_MESSAGE]");
        stamper.FormFlattening = false;
        stamper.Close();
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        fillForm();
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTc4MjY5MDM4Ml19
-->