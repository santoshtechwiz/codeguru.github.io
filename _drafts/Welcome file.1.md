
MS Ajax AutoComplete extender is able to pull its completion list from either a Web Service or a Page Method. All the examples I could find used Web Service, but I wanted to use the Page Method approach.  the advantages of a page method are that  1. The code for the completion list callback is kept with the rest of the code for the page containing the control.  2. I can easily access session state in the callback method.  To get the extender to work with page methods required several modifications to the page.  First, we need to tell the AJAX script manager to allow callbacks page methods.

```html
<asp:ScriptManager ID="a" runat="Server" EnablePageMethods="true">
    </asp:ScriptManager>
```

Second, we need to set up the AutoComplete extender to call a page method.
The main thing here is that there is no ServicePath property.
```html
<cc1:AutoCompleteExtender ServiceMethod="GetCompletionList" MinimumPrefixLength="2"
           CompletionInterval="1000" EnableCaching="true" CompletionSetCount="12" TargetControlID="txt"
           ID="AutoCompleteExtender1" runat="server">
       </cc1:AutoCompleteExtender>
```

Finally, we implement the method that returns the completion list in the code-behind.
```csharp
[System.Web.Script.Services.ScriptMethod]
[System.Web.Services.WebMethod]
public static string[] GetCompletionList(string prefixText, int count)
{
    ArrayList filteredList = new ArrayList();
    string s2 = "\n";
    char[] ch = s2.ToCharArray();
    string[] names ={ "India", "UK", "US", "China", "Nepal" };
    foreach (string name in names)
    {
        if
          (name.ToLower().StartsWith(prefixText.ToLower()))
        {
            filteredList.Add(name);
        }
    } return (string[])
        filteredList.ToArray(typeof(string));
}
```

>Check out this complete code
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<%@ Register Src="WebUserControl.ascx" TagName="WebUserControl" TagPrefix="uc1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>Untitled Page</title>
</head>
<body>
<form id="form1" runat="server">
   <asp:ScriptManager ID="a" runat="Server" EnablePageMethods="true">
   </asp:ScriptManager>
   <div>
       <asp:TextBox ID="txt" runat="Server">

       </asp:TextBox><cc1:AutoCompleteExtender ServiceMethod="GetCompletionList" MinimumPrefixLength="2"
           CompletionInterval="1000" EnableCaching="true" CompletionSetCount="12" TargetControlID="txt"
           ID="AutoCompleteExtender1" runat="server">
       </cc1:AutoCompleteExtender>
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

public partial class _Default : System.Web.UI.Page
{
protected void Page_Load(object sender, EventArgs e)
{

}
[System.Web.Script.Services.ScriptMethod]
[System.Web.Services.WebMethod]
public static string[] GetCompletionList(string prefixText, int count)
{
    ArrayList filteredList = new ArrayList();
    string s2 = "\n";
    char[] ch = s2.ToCharArray();
    string[] names ={ "India", "UK", "US", "China", "Nepal" };
    foreach (string name in names)
    {
        if
          (name.ToLower().StartsWith(prefixText.ToLower()))
        {
            filteredList.Add(name);
        }
    } return (string[])
        filteredList.ToArray(typeof(string));
}
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1NDkwNDI2MTMsNjY4MTkwMDQ5LDEyMD
MwNDY5NDYsMTQwNzUxNzMxNSwtMzg0MTA1MDEzLC0zMTU2NDg1
ODgsLTgwMDU2MTkzMCwtMTcyNDIzMzM3NiwtMTU2NTcxMzk4My
wtMjA2NjY1NTQ3NSwtOTM4NTE2MjM4LC0zMzI0NTUzNjNdfQ==

-->