Imagine you have a s`tring("ABCDE99F-J74-12-89A")`, and you want to extract the only number from the string. This snippet will show how to extract number from string.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Linq_Tips
{
    class Program
    {
        static void Main(string[] args)
        {
            string aString = "ABCDE99F-J74-12-89A";
            // Select only those characters that are numbers 
            IEnumerable<char> stringQuery = from ch in aString
                                            where Char.IsDigit(ch)
                                            select ch;
            // Execute the query 
            foreach (char c in stringQuery)
                Console.Write(c + " ");

        }
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1MjM1MTYwODBdfQ==
-->