
[![](http://1.bp.blogspot.com/_iY3Ra2OqpkA/SAztLuaITDI/AAAAAAAAA1Q/x9sL2YnuMLQ/s400/map.bmp)](https://www.blogger.com/blog/post/edit/6673695286148904603/766441807258524850#)  
  

  ```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GoogleMap2.aspx.cs"  
Inherits="GoogleMap2" %>  
  
<%@ Register TagPrefix="ajaxToolkit" Assembly="AjaxControlToolkit"  
Namespace="AjaxControlToolkit" %>  
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"   
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml">  
<head runat="server">  
<title>Untitled Page</title>  
  
<script type="text/javascript">  
    function showDialog()  
    {  
        var modalPopupBehaviorCtrl = $find('<%= mpeMap.ClientID %>');  
        modalPopupBehaviorCtrl.show();  
        document.getElementById('divMap').innerHTML  
= '<iframe runat="server" id="mm" width="600" height="450" frameborder="0"  
scrolling="no" marginheight="0" marginwidth="0"  
src="DisplayGoogleMap.aspx?lat=39.86887222271858&long=-75.35767078399658&desc=just%26a%26sample"><  
/iframe><br />';  
    }  
</script>  
  
</head>  
<body>  
<form id="Form1" runat="server" action="">  
    <asp:ScriptManager ID="ScriptManager1" runat="server" />  
    <a id="showModalPopupClientButton" href="#" runat="server" onclick="showDialog();">Click  
        Me</a><br />  
    <br />  
    <br />  
    <asp:LinkButton ID="LinkButton1" runat="server">LinkButton</asp:LinkButton>  
    <asp:Panel runat="server" ID="Panel1" Style="display: none; width: 600px; height: 475px;"  
        CssClass="modalPopup">  
        <div id="divMap">  
        </div>  
        <asp:Button runat="server" ID="cmdClose" Text="Close" />  
    </asp:Panel>  
    <iframe width="600" height="450" frameborder="0" scrolling="no" marginheight="0"  
        marginwidth="0"  
src="DisplayGoogleMap.aspx?lat=39.86887222271858&long=-75.35767078399658&desc=just%26a%26sample">  
    </iframe>  
    <br />  
    <ajaxToolkit:ModalPopupExtender ID="mpeMap" runat="server" TargetControlID="LinkButton1"  
        PopupControlID="Panel1" BackgroundCssClass="modalBackground" DropShadow="true"  
        CancelControlID="cmdClose" OkControlID="cmdClose" />  
</form>  
</body>  
</html> 
``` 

>DisplayGoogleMap.aspx  
  
  
  
```html  
<%@ Page Language="C#" AutoEventWireup="true"  
CodeFile="DisplayGoogleMap.aspx.cs" Inherits="minimap2" %>  
  
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml">  
<head id="Head1" runat="server">  
  <title>Untitled Document</title>  
  
  <script src="http://maps.google.com/maps?file=api&v=2&key=ABQIAAAA6TRHbwQ  
EdJQJYJodaur9XhTJQa0g3IQ9GZqIMmInSLzwtGDKaBQN9ma6JnCY1kf4R6Q-HCj5397ddA"  
      type="text/javascript"></script>  
  
  <script type="text/javascript">  
          var map;  
          var icon0;  
          var newpoints = new Array();  
         
          function addLoadEvent(func) {  
              var oldonload = window.onload;  
              if (typeof window.onload != 'function'){  
                  window.onload = func  
              } else {  
                  window.onload = function() {  
                      oldonload();  
                      func();  
                  }  
              }  
          }  
          
          addLoadEvent(loadMap);  
          addLoadEvent(addPoints);  
          
          function loadMap()  
          {  
              var dLat        = Number(document.getElementById('<%= hdLat.ClientID %>').value);  
              var dLong       = Number(document.getElementById('<%= hdLong.ClientID %>').value);  
              var sCaption    = document.getElementById('<%= hdCaption.ClientID %>').value;  
             
              map = new GMap2(document.getElementById("map"));  
              map.addControl(new GLargeMapControl());  
              map.addControl(new GMapTypeControl());  
              map.setCenter(new GLatLng( dLat, dLong), 13);  
               map.setMapType(G_MAP_TYPE);  
           //G_MAP_TYPE, G_SATELLITE_TYPE, or G_HYBRID_TYPE  
              icon0 = new GIcon();  
              icon0.image = "http://www.google.com/mapfiles/marker.png";  
              icon0.shadow = "http://www.google.com/mapfiles/shadow50.png";  
              icon0.iconSize = new GSize(20, 34);  
              icon0.shadowSize = new GSize(37, 34);  
              icon0.iconAnchor = new GPoint(9, 34);  
              icon0.infoWindowAnchor = new GPoint(9, 2);  
              icon0.infoShadowAnchor = new GPoint(18, 25);  
          }  
          
          function addPoints()  
          {  
             
              var dLat        = Number(document.getElementById('<%= hdLat.ClientID %>').value);  
              var dLong       = Number(document.getElementById('<%= hdLong.ClientID %>').value);  
              var sCaption    = document.getElementById('<%= hdCaption.ClientID %>').value;  
            
              newpoints[0] = new Array(dLat, dLong, icon0, 'Picture', sCaption);  
          
              for(var i = 0; i < newpoints.length; i++) {  
                  var point = new GPoint(newpoints[i][1],newpoints[i][0]);  
                  var popuphtml = newpoints[i][4] ;  
                  var marker = createMarker(point,newpoints[i][2],popuphtml);  
                  map.addOverlay(marker);  
              }  
          }  
          
          function createMarker(point, icon, popuphtml)  
          {  
              var popuphtml = "<div id=\"popup\">" + popuphtml + "<\/div>";  
              var marker = new GMarker(point, icon);  
              GEvent.addListener(marker, "click", function() {  
                  marker.openInfoWindowHtml(popuphtml);  
              });  
              return marker;  
          }  
  </script>  
  
  <style type="text/css">  
          div#popup  
          {  
              background:#EFEFEF;  
              border:1px solid #999999;  
              margin:0px;  
              padding:7px;  
              width:270px;  
          }  
      </style>  
</head>  
<body>  
  <form id="form1" runat="server">  
      <asp:HiddenField runat="server" Value="39.869053382069" ID="hdLat" />  
      <asp:HiddenField runat="server" Value="-75.35773515701294" ID="hdLong" />  
      <asp:HiddenField runat="server" Value="Test" ID="hdCaption" />  
      <div id="map" style="width: 600px; height: 450px">  
      </div>  
  </form>  
</body>  
</html>
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA4MDgxMzAzOSwtODM1NzcxMTkyLC01NT
I5OTM0MjYsMTU1MzE2MDY4MCw2NjgxOTAwNDksMTIwMzA0Njk0
NiwxNDA3NTE3MzE1LC0zODQxMDUwMTMsLTMxNTY0ODU4OCwtOD
AwNTYxOTMwLC0xNzI0MjMzMzc2LC0xNTY1NzEzOTgzLC0yMDY2
NjU1NDc1LC05Mzg1MTYyMzgsLTMzMjQ1NTM2M119
-->