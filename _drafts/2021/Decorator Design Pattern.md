# Waht is Design Pattern
Design pattern is the solution to recurring problem

## What is Decorator design pattern

Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to sub classing for extending functionality (also known as Wrapper)

## Class Diagram  

[![](https://1.bp.blogspot.com/-7E8h2bLinus/VChEl4dKU5I/AAAAAAAAC_0/iJHmaor7DHQ/s1600/decorator.gif)](http://1.bp.blogspot.com/-7E8h2bLinus/VChEl4dKU5I/AAAAAAAAC_0/iJHmaor7DHQ/s1600/decorator.gif)

## Real world example


## Example

```csharp
  
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DecoratorPattern
{

    public class UpperStream : Stream
    {
        private Stream _stream;
        public UpperStream(Stream stream)
        {
            this._stream = stream;

        }
        public override long Length
        {
            get { return _stream.Length; }
        }
        public override int Read(byte[] buffer, int offset, int count)
        {

            var numberOfBytesRead = _stream.Read(buffer, offset, count);
            for (int i = 0; i < numberOfBytesRead; i++)
            {
                buffer[i] = (byte)char.ToUpper((char)((int)buffer[i]));
            }


            return numberOfBytesRead;
        }
        public override bool CanRead
        {
            get { return true; }
        }
        public override bool CanSeek
        {
            get { throw new NotImplementedException(); }
        }
        public override bool CanWrite
        {
            get { throw new NotImplementedException(); }
        }
        public override void Flush()
        {
            throw new NotImplementedException();
        }
        public override long Position
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }
        public override long Seek(long offset, SeekOrigin origin)
        {
            throw new NotImplementedException();
        }
        public override void SetLength(long value)
        {
            throw new NotImplementedException();
        }
        public override void Write(byte[] buffer, int offset, int count)
        {
            throw new NotImplementedException();
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            string message = "Hello Decorator";
            MemoryStream ms=new MemoryStream(Encoding.UTF8.GetBytes(message));
            UpperStream stream = new UpperStream(ms);
            StreamReader reader = new StreamReader(stream);
            Console.WriteLine(reader.ReadToEnd());
        }
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExNDc1NDExODddfQ==
-->