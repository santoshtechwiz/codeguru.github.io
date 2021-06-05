In this post, I will share you a straightforward way to convert [`XmlTextWriter`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmltextwriter?view=netcore-3.1) to string in C#. Check out the following code snippet its self-explanatory
 
```csharp
public string CreateXML(string strAuth, string strTran, string strDL, string strCode, string strMsgCode, string strMessage)
{
	string xmlString;
	StringWriter sw = new StringWriter();
	XmlTextWriter writer = new XmlTextWriter(sw);
	// start writing!
	writer.WriteStartDocument();
	writer.WriteStartElement("Result");
	writer.WriteElementString("Authentication", strAuth);
	writer.WriteElementString("Transaction", strTran);
	writer.WriteElementString("DL", strDL);
	writer.WriteElementString("Code", strCode);
	writer.WriteElementString("MsgCode", strMsgCode);
	writer.WriteElementString("Msg", strMessage);
	writer.WriteEndElement();
	//Write XML, and then flush the writer...

	writer.Flush();
	//Return text from string writer...

	xmlString = sw.ToString();
	//close the Objects
	writer.Close();
	sw.Close();
	return xmlString;



}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc3MjU3NDYzNl19
-->