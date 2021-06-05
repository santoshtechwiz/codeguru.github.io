Pdf is a very popular file format for sharing the documents.
It's platform-independent because it's packed all the information inside it like font, images and other information for rendering the file on the host machine.
[![](https://4.bp.blogspot.com/_iY3Ra2OqpkA/SIcZfxj_IaI/AAAAAAAABJg/Lx2HDKyh4kI/s400/a_grid.JPG)](http://4.bp.blogspot.com/_iY3Ra2OqpkA/SIcZfxj_IaI/AAAAAAAABJg/Lx2HDKyh4kI/s1600-h/a_grid.JPG)

[![](https://1.bp.blogspot.com/_iY3Ra2OqpkA/SIcZZH6_cpI/AAAAAAAABJY/TEyBcQTHOCc/s400/b_grid.JPG)](http://1.bp.blogspot.com/_iY3Ra2OqpkA/SIcZZH6_cpI/AAAAAAAABJY/TEyBcQTHOCc/s1600-h/b_grid.JPG)

    
```csharp
 
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Pdf.aspx.cs" Inherits="Pdf" %>  
  
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml">  
<head runat="server">  
<title>Untitled Page</title>  
</head>  
<body>  
<form id="form1" runat="server">  
  <div>  
      <asp:GridView ID="GridView1" runat="server">  
      </asp:GridView>  
      <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Pdf" /></div>  
</form>  
</body>  
</html>  
  ```
### Code Behind
  
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
using iTextSharp.text;  
using iTextSharp.text.pdf;  
using System.IO;  
using iTextSharp.text.html;  
  
public partial class Pdf : MyPage  
{  
protected void Page_Load(object sender, EventArgs e)  
{  
    if (!IsPostBack)  
    {  
        GridView1.DataSource = GetData();  
        GridView1.DataBind();  
    }  
  
}  
protected void Button1_Click(object sender, EventArgs e)  
{  
    MyPage tmpPage = new MyPage();  
    HtmlForm form = new HtmlForm();  
    form.Controls.Add(GridView1);  
    tmpPage.Controls.Add(form);  
    StringWriter sw = new StringWriter();  
    HtmlTextWriter htmlWriter = new HtmlTextWriter(sw);  
    form.Controls[0].RenderControl(htmlWriter);  
    string htmlContent = sw.ToString();  
    Document document = new Document();  
    // step 2:  
    // we create a writer that listens to the document  
    // and directs a PDF-stream to a file  
    PdfWriter.GetInstance(document, new FileStream("c:\\Chap0101.pdf", FileMode.Create));  
  
    // step 3: we open the document  
    document.Open();  
  
    // step 4: we add a paragraph to the document  
    //document.Add(new Paragraph(htmlContent.ToString()));  
  
    System.Xml.XmlTextReader _xmlr = new System.Xml.XmlTextReader(new StringReader(htmlContent));  
  
    HtmlParser.Parse(document, _xmlr);  
  
    // step 5: we close the document  
    document.Close();  
  
    ShowPdf("c:\\Chap0101.pdf");  
  
}  
  
private void ShowPdf(string s)  
{  
    Response.ClearContent();  
    Response.ClearHeaders();  
    Response.AddHeader("Content-Disposition", "inline;filename=" + s);  
    Response.ContentType = "application/pdf";  
    Response.WriteFile(s);  
    Response.Flush();  
    Response.Clear();  
}  
public DataSet GetData()  
{  
    DataSet ds = new DataSet();  
    DataTable dt = new DataTable("Product");  
    DataRow dr;  
    dt.Columns.Add(new DataColumn("Price", typeof(Int32)));  
    dt.Columns.Add(new DataColumn("DisCount", typeof(Int32)));  
    dt.Columns.Add(new DataColumn("SellPrice", typeof(Int32)));  
    for (int i = 1; i <= 10; i++)  
    {  
        dr = dt.NewRow();  
        dr[0] = i;  
        dr[1] = i * 2;  
        dr[2] = 1 * 3;  
        dt.Rows.Add(dr);  
    }  
    ds.Tables.Add(dt);  
    Session["dt"] = dt;  
    return ds;  
}  
}  
```
  
  
**Create a new class Mypage.cs in app_code folder.  **

  ```csharp
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
/// Summary description for MyPage  
/// </summary>  
public class MyPage : Page  
{  
 public override void VerifyRenderingInServerForm(Control control)  
 {  
     GridView grid = control as GridView;  
     if (grid != null && grid.ID == "GridView1")  
         return;  
     else  
         base.VerifyRenderingInServerForm(control);  
  
 }  
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTg1MDM4NTQ1XX0=
-->