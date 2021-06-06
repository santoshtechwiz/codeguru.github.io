
[![](http://3.bp.blogspot.com/_iY3Ra2OqpkA/SBesvCSxC5I/AAAAAAAAA_U/N7qKQzraazI/s400/ClassDiagram1.png)](https://www.blogger.com/blog/post/edit/6673695286148904603/2628405464949013845#)  
  

  
```csharp
using System;
using System.Collections.Generic;
using System.Text;

namespace SampleFactoryClass
{
	public interface IApparel    // Interface representing product  
	{

		string ShowMe();
		// Property to indicate if Knit  
		bool Knit { get; }


	}

	public class SportsShirt : IApparel
	{

		public string ShowMe()
		{

			return ("Sports Shirt");

		}

		public bool Knit

		{ get { return true; } }

	}

	public class DressShirt : IApparel
	{

		public string ShowMe()
		{

			return ("Dress Shirt");

		}

		public bool Knit

		{ get { return false; } }

	}

	// Factory to return instances of apparel classes  

	public class ApparelFactory
	{

		public IApparel CreateApparel(string apptype)
		{

			switch (apptype)
			{

				case "MDRSHIRT":

					return new DressShirt();

				case "MSPSHIRT":

					return new SportsShirt();

			}

			return null;

		}
		public static void Main()
		{

			ApparelFactory factory = new ApparelFactory();

			IApparel ob1 = factory.CreateApparel("MDRSHIRT");

			IApparel ob2 = factory.CreateApparel("MSPSHIRT");

			string shirtType = ob1.ShowMe(); // Returns "Dress Shirt"  
			Console.WriteLine(shirtType);
			Console.Read();

		}

	}

}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTMxNTY0ODU4OCwtODAwNTYxOTMwLC0xNz
I0MjMzMzc2LC0xNTY1NzEzOTgzLC0yMDY2NjU1NDc1LC05Mzg1
MTYyMzgsLTMzMjQ1NTM2M119
-->