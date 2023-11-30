
# What is Design Pattern?

>A design pattern is a general recurring solution to a commonly occurring problem in software design.

In this article, I will explain to you what is the adapter design pattern and when to use. Before discussing the problem, let's create a simple application in .NET.
>The Adapter pattern lets you adapt one interface to another

Let's consider the following code.

```csharp
void Main()
{

	var result = new ThirdParyAPI().GetCustomer();
	Console.WriteLine(result.ToString());

}

public class Customer
{
	public string Name { get; set; }
	public string City { get; set; }
	public string Address { get; set; }
}
public static class CustomerDataProvider
{
	public static List<Customer> GetData() =>
	   new List<Customer>
	   {
			new Customer { City = "Italy", Name = "Alfa Romeo", Address = "Address1" },
			new Customer { City = "UK", Name = "Aston Martin", Address = "Address1"  },
			new Customer { City = "USA", Name = "Dodge", Address = "Address1"  },
			new Customer { City = "Japan", Name = "Subaru", Address = "Address1"  },
			new Customer { City = "Germany", Name = "BMW", Address = "Address1"  }
	   };
}

public class ThirdParyAPI
{
	
	public string GetCustomer()
	{
		return JsonConvert.SerializeObject(CustomerDataProvider.GetData());
	}
}
```

> You are consuming one third party API  in your application. Currently, the API is sending the response in JSON format now the company decided to change the response from JSON to XML.

NEW API
```csharp
public class ThirdParyAPI
{
	public XDocument GetXML()
	{
		var xDocument = new XDocument();
		var xElement = new XElement("Customers");
		var xAttributes = CustomerDataProvider.GetData()
			.Select(m => new XElement("Customer",
								new XAttribute("City", m.City),
								new XAttribute("Name", m.Name),
								new XAttribute("Address", m.Address)));

		xElement.Add(xAttributes);
		xDocument.Add(xElement);
		return xDocument;
	}
}
```
<p><a href="https://commons.wikimedia.org/wiki/File:W3sDesign_Adapter_Design_Pattern_UML.jpg#/media/File:W3sDesign_Adapter_Design_Pattern_UML.jpg"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/W3sDesign_Adapter_Design_Pattern_UML.jpg" alt="W3sDesign Adapter Design Pattern UML.jpg"></a><br>By <a href="//commons.wikimedia.org/wiki/User:Vanderjoe" title="User:Vanderjoe">Vanderjoe</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=61992934">Link</a></p>

#### There are two ways to handle the above problem
1. Make changes in your exiting application
2.  Add an Adapter between your application and third party API so that there are no changes required in your app. As shown in the below figure.
## Adapter Pattern
As per the Wikipedia
>The adapter pattern is a software design pattern (also known as Wrapper, an alternative naming shared with the decorator pattern) that allows the interface of an existing class to be used as another interface


![](https://1.bp.blogspot.com/-i7cbyNPAk80/XqlN_cVMIVI/AAAAAAAAMSw/k9swfsx7j9oqH2T5hDnU7gIxPXGBvTwGQCLcBGAsYHQ/s320/codeguru_adapter.png)

## Solution
To handle the above scenario, we can use the `Adapter` design pattern.

Let's code the solution
## STEP 1
create a interface named `IConvertor` (you can named according to your application)
```csharp
public interface IConvertor
{
	string ConvertXmlToJson();
} 
```
## STEP 2
Create a class named `XmlToJsonAdapter` and Inject the dependecy

```csharp
public class XmlToJsonAdapter : IConvertor
{
	private readonly ThirdParyAPI _xmlConverter;

	public XmlToJsonAdapter(ThirdParyAPI xmlConverter)
	{
		_xmlConverter = xmlConverter;
	}

	public string ConvertXmlToJson()
	{
		
		string jsonText = JsonConvert.SerializeXNode(_xmlConverter.GetXML());
		return jsonText;
	}
}
```
Now change your application as show below

```csharp
void Main()
{
	// BEFORE CHANGES
	// var result=new ThirdParyAPI().GetJSON();
	// Console.WriteLine(result.ToString());

	// AFTER CHANGES
	var adapterResult = new XmlToJsonAdapter(new ThirdParyAPI()).ConvertXmlToJson();
	Console.WriteLine(adapterResult.ToString());

}
```

## When to Use Adapter

We should use the Adapter class whenever we want to work with the existing class, but its interface is not compatible with the rest of our code. The Adapter pattern is a middle-layer which serves as a translator between the system implemented in our project and some third party class or any other class with a different interface.

### Design Patterns You're Already Using in the .NET Framework
Runtime Callable Wrapper (RCW)

![](https://docs.microsoft.com/en-us/dotnet/standard/native-interop/media/runtime-callable-wrapper/runtime-callable-wrapper-interfaces.gif)
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjc1MzE2OTIxLC0yMTQzOTM4ODE1LC05ND
IxNDgyMDhdfQ==
-->