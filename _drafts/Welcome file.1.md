
When you add a Label control to your page you can associate the label to a control, for example to a TextBox or CheckBox etc. If you use the AssociatedControlID and associate a control to the label, the runtime will automatically render the “for” attribute to the label element (The “for” attribute is use to specify which control the label is associated to).

For example:
```html
<asp:Label ID="Label1" runat="server" Text="Label" AssociatedControlID="TextBox1">></asp:Label>
           <asp:TextBox ID="TextBox1" runat="server">
```
The control above will be genereated to the following code at runtime:

```html
 <label for="TextBox1" id="Label2">
                Label</label>
            <input name="TextBox1" type="text" id="Text1" />
```

If the “for” attribute is added to a label element, you can click the mouse button on the label and the associated control (in the above example the TextBox) will be selected. If you associate a checkbox to a label, the checbox will be selected or deslected if you click on the label assocated for the checkbox.
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="LabelClik.aspx.cs" Inherits="LabelClik" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title>Untitled Page</title>
</head>
<body>
  <form id="form1" runat="server">
      <div>
          <asp:Label ID="Label1" runat="server" Text="Label" AssociatedControlID="TextBox1">></asp:Label>
          <asp:TextBox ID="TextBox1" runat="server">
      </div>
  </form>
</body>
</html>
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU1Mjk5MzQyNiwxNTUzMTYwNjgwLDY2OD
E5MDA0OSwxMjAzMDQ2OTQ2LDE0MDc1MTczMTUsLTM4NDEwNTAx
MywtMzE1NjQ4NTg4LC04MDA1NjE5MzAsLTE3MjQyMzMzNzYsLT
E1NjU3MTM5ODMsLTIwNjY2NTU0NzUsLTkzODUxNjIzOCwtMzMy
NDU1MzYzXX0=
-->