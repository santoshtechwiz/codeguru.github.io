In this post, I will show you how to call python generator in c#. Create a Console Application and then right-click on the project and add a new file fib.py and add the following code

```python
class Fib:

    def __init__(self, num):
        self.a = 0
        self.b = 1
        self.num = num
        self.index = 0

    def __iter__(self):
        return self

    def next(self):
        if self.index > self.num:
            raise StopIteration
        else:
            self.index += 1
            (self.a, self.b) = (self.b, self.a + self.b)
            return self.a
```
>Open Progrm.cs and add following code

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Scripting.Hosting;
namespace IronPython_Tut1
{
        class Program
    {
        static void Main(string[] args)
        {
        //Create runtime
            ScriptRuntime runtime = IronPython.Hosting.Python.CreateRuntime();
        //excute 
            ScriptScope scope = runtime.ExecuteFile(@"Fib.py");
        //get the Fib object
            dynamic Fib = scope.GetVariable("Fib");
        foreach (var item in Fib(10))
            {
                Console.WriteLine(item);
            }
          
        }
    }
}
```