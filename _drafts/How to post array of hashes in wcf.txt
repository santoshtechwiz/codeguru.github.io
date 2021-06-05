
In this post, I will show you how to post JSON array hashes in WCF rest service. Before going to code snippet let’s discuss some basic terminology.

### What is Array of Hashes

Array of hashes is a data structure in which each record itself contains key/value pairs. Arrays of hashes are used less frequently than the other structures.Below is example of an array of hashes

```json
AoH = (
    {
       husband  => "barney",
       wife     => "betty",
       son      => "bamm bamm",
    },
    {
       husband => "george",
       wife    => "jane",
       son     => "elroy",
    },

    {
       husband => "homer",
       wife    => "marge",
       son     => "bart",
    },
  );

```

#### JSON String

When we enclosed the json data into quote then we called this string is JSON string

```json
var jsonString='[{ "x": 10, "y": 20, "z": 30 }, { "x": 12, "y": 21, "z": 33 }, { "x": 13, "y": 23, "z": 35}]';  

```

#### Object literal

When we don’t enclosed string in quote then we called this as JSON object literals

```javascript
var jsonObject= [{ "x": 10, "y": 20, "z": 30 }, { "x": 12, "y": 21, "z": 33 }, { "x": 13, "y": 23, "z": 35}];  

```

For this demo I am going to use  [JSON.NET](https://www.blogger.com/blog/post/edit/6673695286148904603/7403512027911854135#)  library.First go to nuget package manager and install json lib.After that create a simple REST service shown as below.

![](http://3.bp.blogspot.com/-pxgGPGCnpAE/UfqRQKBLOMI/AAAAAAAACis/VwfcmWb2BWc/s640/newton.png)

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using Newtonsoft.Json;
namespace WcfService2
{

    public class Service1 : IService1
    {
        public string GetData(string value)
        {
            StringBuilder stringBuilder = new StringBuilder();
            dynamic data = JsonConvert.DeserializeObject(value);
            foreach (var item in data)
            {
                stringBuilder.Append(item.x);
            }
            return stringBuilder.ToString();
        }

    }
}

```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace WcfService2
{

    [ServiceContract]
    public interface IService1
    {

        [OperationContract]
        [WebInvoke(Method = "POST")]
        string GetData(string value);

    }

}

```

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WcfService2.WebForm1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jquery-2.0.2.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#id").click(function () {
                var d = '[{ "x": 10, "y": 20, "z": 30 }, { "x": 12, "y": 21, "z": 33 }, { "x": 13, "y": 23, "z": 35}]';
                $.ajax({
                    type: 'POST',
                    url: "http://localhost:1449/Service1.svc/GetData",
                    data: JSON.stringify(d),
                    contentType: "application/json",
                    success: function (data) {
                    },
                    complete: function () {
                    }
                });
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <input type="button" value="S" id="id" />
    </div>
    </form>
</body>
</html>
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTMwMDUwMjQ5MF19
-->