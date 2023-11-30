In this article, I will show you how to create a simple CSV parser using C#. Let's consider you have following CSV data.

```csv
ID,FullName,Age
1,John Doe,21
2,Bill Gates,45
```
and you want to read the CSV data in C# and want to map to poco class. Checkout the following code snippet which is very easy to understand.



```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Collections;
using System.Reflection;

namespace CSVProvider
{
    class Program
    {
        static void Main(string[] args)
        {
            CSVProvider csv = new CSVProvider(@"C:\Student.txt");
            foreach (var item in csv.OfType())
            {
                Console.WriteLine(item.ToString());
            }
            Console.ReadLine();
        }
    }

    public class Student
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public int Age { get; set; }
        public override string ToString()
        {
            return string.Format(@"ID={0}  FullNam={1} Age={2}", ID, FullName, Age);
        }

    }
    public class CSVProvider : IDisposable, IEnumerable, IEnumerator
    {
        private string fileName = default(string);
        FileStream fsObject = null;
        StreamReader readerObject = null;
        private string currentLine = default(string);
        public CSVProvider(string fileName)
        {
            this.fileName = fileName;
            fsObject = new FileStream(fileName, FileMode.Open, FileAccess.Read);
            readerObject = new StreamReader(fsObject);
            //To skip header line
            readerObject.ReadLine();
        }

        public void Dispose()
        {
            if (readerObject != null)
                readerObject.Close();
            if (fsObject != null)
                fsObject.Close();
        }

        public IEnumerator GetEnumerator()
        {
            return this;
        }
        public object Current
        {
            get
            {
                string[] split = currentLine.Split(',');
                return new Student
                {
                    ID = int.Parse(split[0]),
                    FullName = split[1],
                    Age = int.Parse(split[2])


                };

            }
        }

        public bool MoveNext()
        {
            currentLine = readerObject.ReadLine();
            return currentLine != null;
        }

        public void Reset()
        {
            this.currentLine = default(string);
        }

    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwOTEzODczMjVdfQ==
-->