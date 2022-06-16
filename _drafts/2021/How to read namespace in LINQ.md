In this post,I will show you how to read xml with namespace.For this demo,I will use following xml structure
```xml
<?xml version="1.0" encoding="utf-8" ?>
<accounts xmlns="urn:account">
  <account>1001</account>
  <account>1002</account>
</accounts> 
```
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;

namespace XLinq
{
    class Program {
        static void Main(string[] args)
        {
            var doc = XDocument.Load("accounts.xml");
            var query = from x in doc.Descendants("{urn:account}account")
                        select x;
            foreach (var item in query)
            {
                Console.WriteLine(item);
            }
        }
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc3MDczMzc3Ml19
-->