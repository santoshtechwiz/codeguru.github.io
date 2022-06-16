
In this post, I will show how to convert a file or FileStream on disk and returns the base64 string representation of the FileStream. You can also use the same technique to convert strings to base64 representations.

## Why Encoding?

We use encoding when you want to store or transfer binary data over media that supports only textual data. There is a lot of encoding available, but base64 encoding/decoding is the most popular.

## Why do we use Base64

Base64 is a text representation of data that consists of only 64 characters which are the alphanumeric characters (lowercase and uppercase), +, / and =. These 64 characters are considered 'safe'; that is, they can not be misinterpreted by legacy computers and programs, unlike characters such as <, > \n and many others.

## When is Base64 useful

I've found base64 very useful when transferring files as text. You get the file's bytes and encode them to base64, transmit the base64 string, and from the receiving side, you do the reverse.
```csharp
public static string ToBase64String(string fileName)
{
	using (FileStream reader = new FileStream(fileName, FileMode.Open))
	{
		byte[] buffer = new byte[reader.Length];
		reader.Read(buffer, 0, (int)reader.Length);
		return Convert.ToBase64String(buffer);
	}
}
public static void ToString(string fileName, string serializedFile)
{
	using (System.IO.FileStream reader = System.IO.File.Create(fileName))
	{
		byte[] buffer = Convert.FromBase64String(serializedFile);
		reader.Write(buffer, 0, buffer.Length);
	}

}

```