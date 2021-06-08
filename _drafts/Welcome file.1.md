
[![](http://3.bp.blogspot.com/_iY3Ra2OqpkA/SesmGifTHrI/AAAAAAAAB-U/EtWzhBRW4dg/s400/jq.jpg)](https://www.blogger.com/blog/post/edit/6673695286148904603/5648605650764605805#)In this post i will show how to use Jquery in asp.net

1.  Start Microsoft Visual Studio .NET.
2.  On the  **File**  menu, point to  **New**, and then click  **Project**.
3.  In the  **New Project**  dialog box, click  **Visual C# Projects**
4.  Add a new xml file and copy the following xml.

>labels.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<labels>
<label id="1">
<name>Test</name>
<address>
  <street>street1</street>
  <city>City1</city>
  <province>ID</province>
</address>
</label>
<label id='2'>
<name>Name2</name>
<address>
  <street>Street2</street>
  <city>City2</city>
  <province>CT</province>
</address>
</label>

</labels> 
```

5. Add a reference to the [jQuery script](
6. Copy below code in aspx page.
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default2.aspx.cs" Inherits="Default2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>

  <script src="Scripts/jquery-1.3.2.js" type="text/javascript"></script>

  <script type="text/javascript">
   $(function() {
       $('#update-target a').click(function() {
           $.ajax({
               type: "GET",
               url: "labels.xml",
               dataType: "xml",
               success: function(xml) {
                   $(xml).find('label').each(function(){
                       var id_text = $(this).attr('id')
                       var name_text = $(this).find('name').text()

                       $('<li></li>')
                           .html(name_text + ' (' + id_text + ')')
                           .appendTo('#update-target ol');
                   }); //close each(
               }
           }); //close $.ajax(
       }); //close click(
   }); //close $(
  </script>

</head>
<body>
  <form id="form1" runat="server">
  <div>
      <p>
          <div id='update-target'>
              <a href="#">Click here to load addresses</a>
              <ol>
              </ol>
          </div>
      </p>
  </div>
  </form>
</body>
</html>
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTg1NzU1NzEzMywtNDIwMDEzMjg5LC0xNj
c2NDIyMzY0LDE3NTQ5MDEzMzAsMTA5NDMyODM4OSwtMzM1NjIy
ODYwLC0xNzMxMjQ2NjgyLC01NDkyNTQ4MDEsMTk0NTUzNzEyNy
wtMTg5NDE5OTQzMyw1MDIwOTYyMzEsLTgzNTc3MTE5MiwtNTUy
OTkzNDI2LDE1NTMxNjA2ODAsNjY4MTkwMDQ5LDEyMDMwNDY5ND
YsMTQwNzUxNzMxNSwtMzg0MTA1MDEzLC0zMTU2NDg1ODgsLTgw
MDU2MTkzMF19
-->