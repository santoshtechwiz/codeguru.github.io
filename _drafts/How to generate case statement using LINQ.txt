In this post, I will show you how how to generate "Case statement" from LINQ.Let's say that you want to select rows from [Order Details] table in Northwind database something like this:

1.  If the product UnitPrice is >10, then you want to display it as "High."
2.  If the product UnitPrice is <5, then you want to show it as "Low" otherwise "Average."

  

Our query should include the switch case clause. Something like this:

  
```SQL
SELECT  
(  
CASE  
WHEN UnitPrice >10 THEN 'High'  
WHEN UnitPrice <5 THEN 'Low.'
ELSE 'Average'  
END ) AS ProductPrice  
FROM [Order Details]
```


```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;

namespace Linq_Tips
{
    class Program
    {
        static void Main(string[] args)
        {
            NorthwindDataContext dc = new NorthwindDataContext();
            var query = from o in dc.Order_Details
                        select new
                        {
                            //ternary operator of switch case
                            ProductPrice =
                           (
                           o.UnitPrice > 10 ? "High" :
                           o.UnitPrice < 5 ? "Low" :
                           "Average"
                          )
                        };
            Console.WriteLine(query);

        }
    }
}
```

The output of the above code will look something like this.

[![](https://4.bp.blogspot.com/_iY3Ra2OqpkA/THpXl0IgdRI/AAAAAAAACOk/FuCfLdjbqJ0/s640/swith_case.jpg)](http://4.bp.blogspot.com/_iY3Ra2OqpkA/THpXl0IgdRI/AAAAAAAACOk/FuCfLdjbqJ0/s1600/swith_case.jpg)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwMzQ4MDE4ODhdfQ==
-->