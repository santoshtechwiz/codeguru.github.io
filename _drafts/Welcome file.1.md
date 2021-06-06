
This example shows how to select **Top N** nodes of the specific name from an XML document. To [select nodes from XML](https://www.blogger.com/blog/post/edit/6673695286148904603/799493882455910969#) use method [XmlNode.Selec­tNodes](https://www.blogger.com/blog/post/edit/6673695286148904603/799493882455910969#). Pass **XPath** expression as a parameter and the method returns a list of selected nodes. Suppose we have this XML file.
```xml
<Names>
    <Name>James</Name>
    <Name>John</Name>
    <Name>Robert</Name>
    <Name>Michael</Name>
    <Name>William</Name>
    <Name>David</Name>
    <Name>Richard</Name>
</Names>
```
```csharp
XmlDocument xml = new XmlDocument();
xml.LoadXml(str);  // suppose that str string contains "<Names>...</Names>"

XmlNodeList xnList = xml.SelectNodes("/Names/Name[position() <= 5]");
foreach (XmlNode xn in xnList)
{
  Console.WriteLine(xn.InnerText);
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTE2MjY2OTE5LC0zMzI0NTUzNjNdfQ==
-->