
Some image files contain metadata that you can read to determine the features of the image. For example, a digital photograph might contain metadata that you can read to determine the image's Author, Title, and Keywords. With Microsoft Developer Support OLE File Property Reader, you can read existing metadata and write new metadata to image files.
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImageMetaData.aspx.cs" Inherits="ImageMetaData" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title>Untitled Page</title>
</head>
<body>
  <form id="form1" runat="server">
      <div>
          <asp:FileUpload ID="FileUpload1" runat="server" />
          <asp:Button ID="Button1" runat="server" Text="Read" OnClick="Button1_Click" /><br />
          <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label><br />
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
using DSOFile;

public partial class ImageMetaData : System.Web.UI.Page
{
   OleDocumentPropertiesClass oDocument;
   string strImgName = string.Empty;
   string strImgPath = string.Empty;
   string strImgTitle = string.Empty;
   string strImgAuthor = string.Empty;
   string strImgSubject = string.Empty;
   string strImgCompany = string.Empty;
   string strImgComments = string.Empty;
   string strImgApplication = string.Empty;
   string strImgVersion = string.Empty;
   string strImgCategory = string.Empty;
   string strImgKeywords = string.Empty;
   string strImgManager = string.Empty;
   string strImgLastSavedBy = string.Empty;
   string strImgByteCount = string.Empty;
   string strImgDateCreated = string.Empty;
   string strImgRevisionnum = string.Empty;
   string strImgHeight = string.Empty;
   string strImgWidth = string.Empty;
   string strImgHResolution = string.Empty;
   string strImgVResolution = string.Empty;
   protected void Page_Load(object sender, EventArgs e)
   {

   }
   protected void Button1_Click(object sender, EventArgs e)
   {

       System.Text.StringBuilder sb = new System.Text.StringBuilder();
       OpenDocumentProperties(FileUpload1.PostedFile.FileName.ToString());
       sb.Append("<table><tr><th>Author</th><th>Subject</th><th>Title</th></tr>");
       sb.Append("<tr><td>");
       sb.Append(strImgAuthor);
       sb.Append("</td>");
       sb.Append("<td>");
       sb.Append(strImgSubject);
       sb.Append("</td>");
       sb.Append("<td>");
       sb.Append(strImgTitle);
       sb.Append("</td>");
       sb.Append("</table>");

       Label1.Text = sb.ToString();



   }

   protected void OpenDocumentProperties(string strFile)
   {
       try
       {
           DSOFile.SummaryProperties oSummProps;
           string strTmp = string.Empty;
           oDocument = new DSOFile.OleDocumentPropertiesClass();
           oDocument.Open(strFile, false, DSOFile.dsoFileOpenOptions.dsoOptionOpenReadOnlyIfNoWriteAccess);
           oSummProps = oDocument.SummaryProperties;
           strImgName = oDocument.Name;
           strImgPath = oDocument.Path;
           if (oSummProps.Author == "" || oSummProps.Comments == "" || oSummProps.Title == "" || oSummProps.Keywords == "")
           {
               strImgTitle = "All";


           }
           else
           {


               strImgTitle = oSummProps.Title;

           }
           if (oSummProps.Author == "")
           {
               strImgAuthor = "Unknown";
           }
           else
           {
               strImgAuthor = oSummProps.Author;
           }
           strImgSubject = oSummProps.Subject;
           strImgCompany = oSummProps.Company;
           strImgComments = oSummProps.Comments;
           strImgApplication = oSummProps.ApplicationName;
           strImgVersion = oSummProps.Version;
           strImgCategory = oSummProps.Category;
           strImgKeywords = "," + oSummProps.Keywords.ToString() + ",";
           strImgManager = oSummProps.Manager;
           strImgLastSavedBy = oSummProps.LastSavedBy;
           strImgByteCount = oSummProps.ByteCount.ToString();
           if (oSummProps.DateCreated != null)
           {
               strImgDateCreated = oSummProps.DateCreated.ToString();
           }
           else
           {
               strImgDateCreated = "";
           }

           strImgRevisionnum = oSummProps.RevisionNumber;
       }
       catch (Exception ex)
       {
           Response.Write(ex.Message);
       }
       finally
       {

       }

   }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyMjEyMDUwMjIsLTU1Mjk5MzQyNiwxNT
UzMTYwNjgwLDY2ODE5MDA0OSwxMjAzMDQ2OTQ2LDE0MDc1MTcz
MTUsLTM4NDEwNTAxMywtMzE1NjQ4NTg4LC04MDA1NjE5MzAsLT
E3MjQyMzMzNzYsLTE1NjU3MTM5ODMsLTIwNjY2NTU0NzUsLTkz
ODUxNjIzOCwtMzMyNDU1MzYzXX0=
-->