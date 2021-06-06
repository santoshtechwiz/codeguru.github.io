

In this artilce I will show you how to read embeded resource from the Assembly. In .NET you can embeded the resource like image and xml. In this example I am using XML.

>Place this XML(SouthernStates.xml) file in Data folder {alertInfo}

```xml
<?xml version="1.0" encoding="utf-8" ?>
- <States>
- <State>
  <Name>Mississippi</Name>
  <Abbreviation>MS</Abbreviation>
  </State>
- <State>
  <Name>Tennesse</Name>
  <Abbreviation>TN</Abbreviation>
  </State>
- <State>
  <Name>Arkansas</Name>
  <Abbreviation>AR</Abbreviation>
  </State>
- <State>
  <Name>Louisiana</Name>
  <Abbreviation>LA</Abbreviation>
  </State>
- <State>
  <Name>Georiga</Name>
  <Abbreviation>GA</Abbreviation>
  </State>
- <State>
  <Name>Florida</Name>
  <Abbreviation>FL</Abbreviation>
  </State>
  </States>
  ```
You can read the emebeded resource by using following method


>You can use the Assembly.GetManifestResourceStream Method:{alertInfo}

Create two class named `State.cs` and `StatesCollection` in your project as shown below

>State.cs

```csharp
using System;
using System.Collections.Generic;

using System.Text;

namespace EmbeddedResource.Library
{
   public class State
   {
       private string _name;
       private string abbreviation;

       public string Abbreviation
       {
           get { return abbreviation; }
           set { abbreviation = value; }
       }
 

       public string Name
       {
           get { return _name; }
           set { _name = value; }
       }
 
     
   }
}
```

>StatesCollection.cs

```csharp
using System;
using System.Collections.Generic;

using System.Text;
using System.Xml;
using System.Reflection;
using System.Collections;

namespace EmbeddedResource.Library
{
   public class StatesCollection : System.Collections.Generic.List<State>
   {
       private StatesCollection()
       {

       }

       private static StatesCollection _southernStates = null;
       public static StatesCollection SouthernStates
       {
           get
           {
               if (_southernStates == null)
               {
                   StatesCollection states = new StatesCollection();
                   try
                   {
                       System.Reflection.Assembly asm =
Assembly.GetExecutingAssembly();
                       System.IO.Stream xmlStream =
 asm.GetManifestResourceStream("EmbeededResource.Data.SouthernStates.xml");
                       XmlDocument xmlDoc = new XmlDocument();
                       xmlDoc.Load(xmlStream);
                       XmlNodeList nodes = xmlDoc.SelectNodes("/States/State");
                       StatesCollection coll = new StatesCollection();
                       foreach (XmlNode node in nodes)
                       {
                           State state = new State();
                           state.Abbreviation = node["Abbreviation"].InnerText;
                           state.Name = node["Name"].InnerText;
                           coll.Add(state);
                       }
                       return coll;
                   }
                   catch (Exception ex)
                   {
                       throw new Exception(ex.Message);
                   }
               }
               else
               {
                   return _southernStates;
               }
           }
       }
   }
}
```

## How To Use


```csharp
using System;
using System.Collections.Generic;
using System.Text;
using EmbeddedResource;
using EmbeddedResource.Library;

namespace ReadXml
{
   class Program
   {
       static void Main(string[] args)
       {
           foreach (State state in StatesCollection.SouthernStates)
           {
               Console.WriteLine("Name: " + state.Name + " | Abbr: " + state.Abbreviation);
           }
           Console.ReadLine();
       }
   }
}
```

