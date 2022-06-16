In this post, I will show you how to read the pdf document properties in asp.net.As we know that there is no- such in-built class in .net framework that read the pdf document.So,for this demo,I will used third-party library [iTextSharp](https://www.blogger.com/blog/post/edit/6673695286148904603/2844102927467949345#).  
[![](https://2.bp.blogspot.com/-MQ_nKnANVEc/Tj2mo9GHKlI/AAAAAAAACVY/8Vsj4cCMtTs/s400/pdf.jpg)](https://www.blogger.com/blog/post/edit/6673695286148904603/2844102927467949345#)
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PdfPropertiesReader.aspx.cs"
    Inherits="PdfPropertiesReader" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div id="pdfProperties" runat="server">
        </div>
    </div>
    <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Read Pdf Properties" />
    </form>
</body>
</html>
```
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.Text;

public partial class PdfPropertiesReader : System.Web.UI.Page
{
    private const string FileNmae = @"C:\\temp\\asp.pdf";
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        try
        {
            StringBuilder stringBuilder = new StringBuilder();
            // create a reader (constructor overloaded for path to local file or URL)
            PdfReader reader = new PdfReader(FileNmae);
            // total number of pages
            int n = reader.NumberOfPages;
            // size of the first page
            Rectangle psize = reader.GetPageSize(1);
            float width = psize.Width;
            float height = psize.Height;
            Console.WriteLine("Size of page 1 of {0} => {1} × {2}", n, width, height);
            // file properties
            Hashtable infodict = reader.Info;
            foreach (DictionaryEntry kvp in infodict)
            {
                stringBuilder.Append(kvp.Key + "=>" + kvp.Value + "</br>");
            }

            pdfProperties.InnerHtml = stringBuilder.ToString();
        }
        catch (Exception exception)
        {

            Response.Write(exception.Message);
        }
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc0ODMwMTc2N119
-->