
[![](http://1.bp.blogspot.com/_iY3Ra2OqpkA/SLeTjxFkAwI/AAAAAAAABTs/_VBei4hZ_5A/s400/user_template.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/8477637839794232054#)

Another feature that is often ignored with user controls, but that can be handy, is the template. Templates are often associated with server controls and are an important part of both the DataList and the Repeater controls. However, their usefulness is not limited to server controls. Templates, however, allow us to provide a means for the page designer to supply HTML content that will be rendered within our control. Templates allow our user controls to be more flexible because they are used across pages within our application.

1. In the .ascx file, add an ASP.NET  PlaceHolder  control where you want the template to appear.

2. In the user control's code, implement a property of type  ITemplate.

3. Define a server control class that implements the  INamingContainer  interface as a container to create an instance of the template. This is called the template's naming container.

4. Apply the  [TemplateContainerAttribute](https://www.blogger.com/blog/post/edit/6673695286148904603/8477637839794232054#)  to the property that implements  [ITemplate](https://www.blogger.com/blog/post/edit/6673695286148904603/8477637839794232054#)  and pass the type of the template's naming container as the argument to the attribute's constructor.

5. In the control's  [Init](https://www.blogger.com/blog/post/edit/6673695286148904603/8477637839794232054#)  method, repeat the following steps one or more times:

- Create an instance of the naming container class.
- Create an instance of the template in the naming container.
- Add the naming container instance to the  [Controls](https://www.blogger.com/blog/post/edit/6673695286148904603/8477637839794232054#)  property of the  [PlaceHolder](https://www.blogger.com/blog/post/edit/6673695286148904603/8477637839794232054#)  server control.

>SupportTemplates.ascx
```html
<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SupportTemplates.ascx.cs"
Inherits="SupportTemplates" %>
<table>
<tr>
   <td>
       <asp:PlaceHolder ID="headerContainer" runat="server"></asp:PlaceHolder>
   </td>
</tr>
<tr>
   <td>
       <i>This is the static content that always appears on the control</i><br />
       <asp:PlaceHolder ID="PlaceHolder1" runat="server"></asp:PlaceHolder>
   </td>
</tr>
<tr>
   <td>
       <asp:PlaceHolder ID="footerContainer" runat="server"></asp:PlaceHolder>
   </td>
</tr>
</table>
```
>SupportTemplates.ascx.cs
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
using System.ComponentModel;
public partial class SupportTemplates : System.Web.UI.UserControl
{
private ITemplate messageTemplate = null;

[TemplateContainer(typeof(MessageContainer))]
[PersistenceMode(PersistenceMode.InnerProperty)]
public ITemplate MessageTemplate
{
    get
    {
        return messageTemplate;
    }
    set
    {
        messageTemplate = value;
    }
}
protected ITemplate _footerTemplate;
protected ITemplate _headerTemplate;
[TemplateContainer(typeof(MessageContainer))]
[PersistenceMode(PersistenceMode.InnerProperty)]
public ITemplate FooterTemplate
{
    get { return _footerTemplate; }
    set { _footerTemplate = value; }
}
[TemplateContainer(typeof(MessageContainer))]
[PersistenceMode(PersistenceMode.InnerProperty)]
public ITemplate HeaderTemplate
{
    get { return _headerTemplate; }
    set { _headerTemplate = value; }
}

private void Page_PreRender(object sender, System.EventArgs e)
{
    if (_headerTemplate != null)
        _headerTemplate.InstantiateIn(headerContainer);
    if (_footerTemplate != null)
        _footerTemplate.InstantiateIn(footerContainer);
}

void Page_Init()
{
    if (messageTemplate != null)
    {
        String[] fruits = { "apple", "orange", "banana", "pineapple" };
        for (int i = 0; i < 4; i++)
        {
            MessageContainer container = new MessageContainer(i, fruits[i]);
            messageTemplate.InstantiateIn(container);
            PlaceHolder1.Controls.Add(container);
        }
    }
}
```
```csharp
public class MessageContainer : Control, INamingContainer
{
    private int m_index;
    private String m_message;
    internal MessageContainer(int index, String message)
    {
        m_index = index;
        m_message = message;
    }
    public int Index
    {
        get
        {
            return m_index;
        }
    }
    public String Message
    {
        get
        {
            return m_message;
        }
    }
}


}
```

## How To Use

>TemplateDemo.aspx

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TemplateDemo.aspx.cs" Inherits="Template" %>

<%@ Register Src="SupportTemplates.ascx" TagName="SupportTemplates" TagPrefix="uc2" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
 <title>Untitled Page</title>
</head>
<body>
 <form id="form1" runat="server">
     <div>
         <uc2:SupportTemplates ID="SupportTemplates1" runat="server">
             <HeaderTemplate>
                 <b>This is Header</b>
             </HeaderTemplate>
             <MessageTemplate>
                 Index:
                 <asp:Label runat="server" ID="Label1" Text='<%# Container.Index %>' />
                 <br />
                 Message:
                 <asp:Label runat="server" ID="Label2" Text='<%# Container.Message %>' />
                 <hr />
             </MessageTemplate>
             <FooterTemplate>
                 <b>This Is Footer</b>
             </FooterTemplate>
         </uc2:SupportTemplates>
     </div>
 </form>
</body>
</html>
```

>TemplateDemo.aspx.cs
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

public partial class Template : System.Web.UI.Page
{
  protected void Page_Load(object sender, EventArgs e)
  {
      this.DataBind();
  }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1NjU3MTM5ODMsLTIwNjY2NTU0NzUsLT
kzODUxNjIzOCwtMzMyNDU1MzYzXX0=
-->