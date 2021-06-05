Let's say you are working in a reasonably large asp.net application. Now because of the situation (or clients request), you want to change all the textbox or button control to some server control or user control. This can be very very tedious JOB if you are using Asp.net 1.X. But if you are using Asp.net 2.0, there is a straightforward way to get this done using [`tagMapping`](https://www.codeproject.com/Articles/667404/Tag-Mapping-in-ASP-NET-2)  
it's a way to turn all instances of a type into another type at compile time. In human language, it means that it can convert all, e.g. System.Web.UI.WebControls.Textbox (in our example ) instances in the entire website into another control. That is so cool that I had to do a little example. I've created a very simple control that inherits from a TextBox and overrides the Text property so that it HTML encodes the text. I placed it in the App_Code folder and called it SafeTextBox.  
  
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
///
/// Summary description for SafeTextBox
///
public class SafeTextBox : System.Web.UI.WebControls.TextBox
{
    public override string Text
    {
        get
        {
            return base.Text;
        }
        set
        {
            base.Text = System.Web.HttpUtility.HtmlEncode(value);
        }
    }
}
```
  
Then I needed to hook the tag mapping up in the web.config to convert all the text boxes into SafeTextBox instances. It simply converts all TextBox instances on the entire site. Here is what’s needed in the web.config:  
  ```xml
<pages> <tagMapping> <add tagType="System.Web.UI.WebControls.TextBox" mappedTagType="SafeTextBox"/> </tagMapping> </pages>
```
  
After we add the following line of code in the web.config file, all the TextBox control will be mapped to the TextBox.
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTUyOTQ2NzY3XX0=
-->