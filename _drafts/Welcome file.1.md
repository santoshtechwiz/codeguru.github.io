
[![](http://4.bp.blogspot.com/_iY3Ra2OqpkA/SAZ76n-Jn_I/AAAAAAAAA0U/xTQmZDjEBg0/s400/webjava.bmp)](https://www.blogger.com/blog/post/edit/6673695286148904603/4070751644824528356#)  

Suppose that you have to read the records of DataTable in the DataSet that was sent as a response value from an Ajaxed Web Service using javascript.  

```html
<%@ Page Language="C#" %>  
  
<%@ Import Namespace="System.Data" %>  
  
<script runat="server">  
[System.Web.Services.WebMethod]  
  
[System.Web.Script.Services.ScriptMethod]  
public static System.Data.DataTable MyMethod(int value)  
{  
    return GetDataSet(value);  
}  
  
public static System.Data.DataTable GetDataSet(int value)  
{  
  
    DataTable dt = new DataTable("Author");  
    DataRow dr;  
    dt.Columns.Add(new DataColumn("Id", typeof(Int32)));  
    dt.Columns.Add(new DataColumn("Author", typeof(string)));  
  
    for (int i = 0; i <= 10; i++)  
    {  
        dr = dt.NewRow();  
        dr[0] = i;  
        dr[1] = "Author" + i.ToString();  
        dt.Rows.Add(dr);  
    }  
    for (int i = 20; i <= 40; i++)  
    {  
        dr = dt.NewRow();  
        dr[0] = i;  
        dr[1] = "Author" + i.ToString();  
        dt.Rows.Add(dr);  
    }  
  
  
    DataView dv = new DataView(dt);  
    dv.RowFilter = "Id='" + value + "'";  
  
  
  
    return dv.Table;  
}  
  
  
  
</script>  
  
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml">  
<head id="Head1" runat="server">  
<title>Untitled Page</title>  
  
<script language="javascript" type="text/javascript">  
    function CallMyWebService()  
    {  
        WebService.MyMethod(1,OnRequestComplete);  
    }  
    function OnRequestComplete(result)  
    {  
        var str="";  
      for(var i = 0; i < result.rows.length; i++)  
     
        {  
         str+=result.rows[i].Author +"<br>";  
   
        }  
      document.getElementById('result').innerHTML=str;  
    }  
</script>  
  
</head>  
<body>  
<form id="form1" runat="server">  
    <div>  
        <asp:ScriptManager ID="scriptManger1" runat="server"  
EnablePageMethods="true">  
            <Services>  
                <asp:ServiceReference Path="~/WebService.asmx" />  
            </Services>  
        </asp:ScriptManager>  
        <div id="result">  
        </div>  
        <input type="button" onclick="CallMyWebService();" id="myButton"  
value="Call MyWebService" />  
    </div>  
</form>  
</body>  
</html>  
```

>if you tried, you likely received some sort of circular reference serialization error to take advantage of this, you will need to add the following to your web.config:  
  
  ```xml
 <system.web.extensions>  
 <scripting>  
   <webServices>  
     <jsonSerialization>  
       <converters>  
         <add name="DataSetConverter"  
type="Microsoft.Web.Preview.Script.Serialization.Converters.DataSetConverter,  
 Microsoft.Web.Preview"/>  
         <add name="DataRowConverter"  
type="Microsoft.Web.Preview.Script.Serialization.Converters.DataRowConverter,  
 Microsoft.Web.Preview"/>  
         <add name="DataTableConverter"  
type="Microsoft.Web.Preview.Script.Serialization.Converters.DataTableConverter,  
Microsoft.Web.Preview"/>  
       </converters>  
     </jsonSerialization>  
   </webServices>  
 </scripting>  
</system.web.extensions>
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTAyMDk2MjMxLC04MzU3NzExOTIsLTU1Mj
k5MzQyNiwxNTUzMTYwNjgwLDY2ODE5MDA0OSwxMjAzMDQ2OTQ2
LDE0MDc1MTczMTUsLTM4NDEwNTAxMywtMzE1NjQ4NTg4LC04MD
A1NjE5MzAsLTE3MjQyMzMzNzYsLTE1NjU3MTM5ODMsLTIwNjY2
NTU0NzUsLTkzODUxNjIzOCwtMzMyNDU1MzYzXX0=
-->