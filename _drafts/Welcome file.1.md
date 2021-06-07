
[![](http://3.bp.blogspot.com/_iY3Ra2OqpkA/SKkQbCUn2qI/AAAAAAAABP8/AxrrhO_moAk/s400/imagemeta_2.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/5948804696753250327#)[![](http://4.bp.blogspot.com/_iY3Ra2OqpkA/SKkQQzvFLQI/AAAAAAAABP0/0rQAq4YipzM/s400/metadata.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/5948804696753250327#)
Some image files contain metadata that you can read to determine features of the image. For example, a digital photograph might contain metadata that you can read to determine the Author,Title and Keywords of the image. [With Microsoft Developer Support OLE File Property Reader](https://www.blogger.com/blog/post/edit/6673695286148904603/5948804696753250327#) you can read existing metadata, and you can also write new metadata to image files.

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
<!--stackedit_data:
eyJoaXN0b3J5IjpbODAzMTI3ODI4LC01NTI5OTM0MjYsMTU1Mz
E2MDY4MCw2NjgxOTAwNDksMTIwMzA0Njk0NiwxNDA3NTE3MzE1
LC0zODQxMDUwMTMsLTMxNTY0ODU4OCwtODAwNTYxOTMwLC0xNz
I0MjMzMzc2LC0xNTY1NzEzOTgzLC0yMDY2NjU1NDc1LC05Mzg1
MTYyMzgsLTMzMjQ1NTM2M119
-->