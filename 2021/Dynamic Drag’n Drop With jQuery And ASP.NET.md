
JQuery is a very popular javascript library for accessing and manuipulating the DOM element. JQuery haves thousand of the plugin which makes developer life  [easier. In](https://www.blogger.com/blog/post/edit/6673695286148904603/1319034251156637110#)  thi post I will show how to  implement  **drag’n drop & saving the new positions to the database.**  Here is, how it is done by using  [**jQuery**](https://www.blogger.com/blog/post/edit/6673695286148904603/1319034251156637110#) & &  [**jQuery UI**](https://www.blogger.com/blog/post/edit/6673695286148904603/1319034251156637110#):  
[![Photobucket](http://i951.photobucket.com/albums/ad355/excusemedoiknowu/Untitled.gif)](https://www.blogger.com/blog/post/edit/6673695286148904603/1319034251156637110#)  

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Default2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title></title>

   <script src="Scripts/jquery-1.3.2.js" type="text/javascript"></script>

   <script type="text/javascript" src="Scripts/jquery-ui-1.7.2.custom.min.js"></script>

   <script type="text/javascript">
       $(document).ready(function() {
           $("#contentLeft ul").sortable({ opacity: 0.6, cursor: 'move', update: function() {
               var order = $(this).sortable("toArray");
               $.ajax(
                   {
                       type: "POST",
                       url: "Default.aspx/Update",
                       data: "{'NewOrder': '" + order + "'}",
                       dataType: "json",
                       contentType: "application/json"

                   });
           }

           });

       });   
   </script>

   <style type="text/css">
       .itemStyle
       {
           background-color: #c0c0c0;
           font-family: Verdana;
           list-style: none;
       }
       .alter
       {
           background-color: #000fff;
           font-family: Verdana;
           list-style: none;
       }
       .contentLeft
       {
           height: 100%;
           width: 300px;
           overflow: auto;
       }
   </style>
</head>
<body>
   <form id="form1" runat="server">
   <div id="contentLeft" class="contentLeft">
       <asp:Repeater ID="rptLan" runat="server">
           <HeaderTemplate>
               <ul>
           </HeaderTemplate>
           <ItemTemplate>
               <li id="<%#Eval("ID")%>" class="itemStyle">
                   <%#Eval("Name")%></li>
           </ItemTemplate>
           <AlternatingItemTemplate>
               <li id="<%#Eval("ID")%>" class="alter">
                   <%#Eval("Name")%></li>
           </AlternatingItemTemplate>
           <FooterTemplate>
               </ul>
           </FooterTemplate>
       </asp:Repeater>
   </div>
   <div id="divRight">
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
using System.Collections.Specialized;

public partial class Default2 : System.Web.UI.Page
{
   protected void Page_Load(object sender, EventArgs e)
   {
       DemoDataContext db = new DemoDataContext();
       var query = from c in db.demos
                   orderby c.Order
                   select c;
       rptLan.DataSource = query;
       rptLan.DataBind();

   }
   /// <summary>
   /// Page Method for updating order
   /// </summary>
   /// <param name="NewOrder"></param>
   [System.Web.Services.WebMethod]
   public static void Update(string NewOrder)
   {
       DemoDataContext db = new DemoDataContext();
       int listingCounter = 1;
       foreach (var item in NewOrder.Split(','))
       {
           demo demo = db.demos.Single(x => x.ID == int.Parse(item.ToString()));
           demo.Order = listingCounter;
           db.SubmitChanges();
           listingCounter++;

       }
   }
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbODg1NzMyOTUwLDE4MTI2MjA3NzNdfQ==
-->