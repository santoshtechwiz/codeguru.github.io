
In this article we will see that how we can populate a DropDownList control with XML file as a source.Our XML file looks something like below which simply contains the name of the clients.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<names>
 <name>
   <client>hank</client>
 </name>
 <name>
   <client>corry</client>
 </name>
 <name>
   <client>david</client>
 </name>
 <name>
   <client>james</client>
 </name>
</names>
```
Filling a DropDownList with XML file: Now we want to fill the DropDownList with the contents contained in the XML file. Don't forget to include the namespace System.XML.
```csharp
private void FillDropDownList()
    {
        XmlDocument doc = new XmlDocument();
        doc.Load(Server.MapPath("Menu.xml"));
        XmlNodeList nodeList = doc.SelectNodes("names/name");
        foreach (XmlNode node in nodeList)
            DropdownList1.Items.Add(new ListItem(node.SelectSingleNode("client").InnerText));
    }
 ```

All we are doing is making an object of the XmlDocument class. Than we read the XML file, dig down in the nodes and selects the nodes that we want. And finally add those node's inner text to the DropDownList items.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2NzY0MjIzNjQsMTc1NDkwMTMzMCwxMD
k0MzI4Mzg5LC0zMzU2MjI4NjAsLTE3MzEyNDY2ODIsLTU0OTI1
NDgwMSwxOTQ1NTM3MTI3LC0xODk0MTk5NDMzLDUwMjA5NjIzMS
wtODM1NzcxMTkyLC01NTI5OTM0MjYsMTU1MzE2MDY4MCw2Njgx
OTAwNDksMTIwMzA0Njk0NiwxNDA3NTE3MzE1LC0zODQxMDUwMT
MsLTMxNTY0ODU4OCwtODAwNTYxOTMwLC0xNzI0MjMzMzc2LC0x
NTY1NzEzOTgzXX0=
-->