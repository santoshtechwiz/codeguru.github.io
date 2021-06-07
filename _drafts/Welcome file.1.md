
## Adapter Pattern
>The Adapter pattern converts the interface of a class into another interface that clients expect.The client makes a request on the adapter by invoking a method from the target interface on it and then adapter translates that request into one or more calls on the adaptee using the adaptee interface. The client receives the results of the call and never knows there is an adapter doing the translation

**Pre-Condition**: You are maintaining an existing system that makes use of a third-party class library from vendor A
**Stimulus**: Vendor A goes belly up and corporate policy does not allow you to make use of an unsupported class library.
**Response**: Vendor B provides a similar class library but its interface is completely different from the interface provided by vendor A
**Assumptions**: You don’t want to change your code, and you can’t change vendor B’s code
**Solution**?: Write new code that adapts vendor B’s interface to the interface expected by your original code

>C# Example

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Adapter
{

    public class VendorA
    {

        public string GetResponse()
        {

            return "<Root><Item><Column1>John</Column1> <Column2>Doe</Column2><Column3>John@email.com</Column3> </Item></Root>";
        }
    }

    public class VendorB
    {
        public string GetResponse()
        {

            return "John,Doe,John@email.com\nsantosh,singh,santosh@gmail.com";
        }


    }
    public interface IRquest
    {
        string Get();

    }
    public class Adapter : IRquest
    {
        private VendorB _vendorb = new VendorB();
        public string Get()
        {
            var lines = _vendorb.GetResponse().Split('\n');


            var xml = new XElement("Root",
               lines.Select(line => new XElement("Item",
                  line.Split(new char[] { ',' })
                      .Select((column, index) => new XElement("Column" + index, column)))));

            return xml.ToString();
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Adapter client = new Adapter();
            var response = client.Get();
            Console.WriteLine(response);
        }
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA5NDMyODM4OSwtMzM1NjIyODYwLC0xNz
MxMjQ2NjgyLC01NDkyNTQ4MDEsMTk0NTUzNzEyNywtMTg5NDE5
OTQzMyw1MDIwOTYyMzEsLTgzNTc3MTE5MiwtNTUyOTkzNDI2LD
E1NTMxNjA2ODAsNjY4MTkwMDQ5LDEyMDMwNDY5NDYsMTQwNzUx
NzMxNSwtMzg0MTA1MDEzLC0zMTU2NDg1ODgsLTgwMDU2MTkzMC
wtMTcyNDIzMzM3NiwtMTU2NTcxMzk4MywtMjA2NjY1NTQ3NSwt
OTM4NTE2MjM4XX0=
-->