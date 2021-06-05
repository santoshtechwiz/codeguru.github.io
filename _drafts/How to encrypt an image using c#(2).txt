
Encryption is critical while transmitting the data over the network or you are sharing some secure information with others.  
In this post, I will show you how to encrypt the bitmap image ( Just for fun) in C#. The technique is straightforward. First, we extract header from the Image and then encrypt the rest data and then combined the header with this encrypted data.

> NOTE -> I don't want to encrypt the whole Image because if you encrypt the entire Image, then you will be not able to open the file in any image editor

If you want to encrypt any image then first you have to understand the header of the image which contains the details of the Image. When you click the Image, the image software read the information from the header. Below is the header information of bitmap image which first 54 byte is the header information.

[![](https://1.bp.blogspot.com/-SdD0xVBUejk/XrTfzM5nuII/AAAAAAAAMhg/tUDVgpLGUUoTlAqSSfg3DzgRIjRYisT8QCK4BGAsYHg/d/bitmap.jpg)](https://www.blogger.com/blog/post/edit/6673695286148904603/3716715385352154017#)

```csharp
private  string strIV = "abcdefghijklmnmo"; //The initialization vector.
private  string strKey = "abcdefghijklmnmoabcdefghijklmnmo"; //The key
void Main()
{
	string inputFileName = @"kl_tower.bmp";
	
	Encrypt(inputFileName, @"d:\\enc1.bmp");
	Decrypt("d:\\enc1.bmp", "D:\\demo.bmp");
}

void Encrypt(string inFile, string outFile)
{
	AesCryptoServiceProvider aesProvider = new AesCryptoServiceProvider();
	
	aesProvider.BlockSize = 128;
	aesProvider.KeySize = 256;
	aesProvider.Key = System.Text.Encoding.ASCII.GetBytes(strKey);
	aesProvider.IV = System.Text.Encoding.ASCII.GetBytes(strIV);
	aesProvider.Padding = PaddingMode.None;
	aesProvider.Mode = CipherMode.CBC;
	//Read
	FileStream fileStream = new FileStream(inFile, FileMode.Open, FileAccess.Read);
	MemoryStream ms = new MemoryStream();
	fileStream.CopyTo(ms);
	//Store header in byte array (we will used this after encryption)
	var header = ms.ToArray().Take(54).ToArray();
	//Take rest from stream
	var imageArray = ms.ToArray().Skip(54).ToArray();
	//Create encryptor
	fileStream.Close();
	var enc = aesProvider.CreateEncryptor();
	//Encrypt image
	var encimg = enc.TransformFinalBlock(imageArray, 0, imageArray.Length);
	//Combine header and encrypted image
	var image = Combine(header, encimg);
	//Write encrypted image to disk
	File.WriteAllBytes(outFile, image);
	aesProvider.Clear();



}
public byte[] Combine(byte[] first, byte[] second)
{
	byte[] ret = new byte[first.Length + second.Length];
	Buffer.BlockCopy(first, 0, ret, 0, first.Length);
	Buffer.BlockCopy(second, 0, ret, first.Length, second.Length);
	return ret;
}
public void Decrypt(string inFile, string outFile)
{
	AesCryptoServiceProvider aesProvider = new AesCryptoServiceProvider();
	aesProvider.BlockSize = 128;
	aesProvider.KeySize = 256;
	aesProvider.Padding = PaddingMode.None;
	aesProvider.Mode = CipherMode.CBC;
	aesProvider.Key = System.Text.Encoding.ASCII.GetBytes(strKey);
	aesProvider.IV = System.Text.Encoding.ASCII.GetBytes(strIV);

	
	//Read
	FileStream fileStream = new FileStream(inFile, FileMode.Open, FileAccess.Read);
	MemoryStream ms = new MemoryStream();
	fileStream.CopyTo(ms);
	//Store header in byte array (we will used this after encryption)
	var header = ms.ToArray().Take(54).ToArray();
	//Take rest from stream
	var imageArray = ms.ToArray().Skip(54).ToArray();
	//Create encryptor
	var enc = aesProvider.CreateDecryptor();
	//Encrypt image
	var encimg = enc.TransformFinalBlock(imageArray, 0, imageArray.Length);
	//Combine header and encrypted image
	var image = Combine(header, encimg);
	//Write encrypted image to disk
	File.WriteAllBytes(outFile, image);
}

```

> Original Image

[![](https://1.bp.blogspot.com/-UXz6on85ewc/XrTxFxNLiYI/AAAAAAAAMiI/1r06howY1roR7-osOa0jt7hZzUPXACnIwCK4BGAsYHg/d/demo.bmp)](https://1.bp.blogspot.com/-UXz6on85ewc/XrTxFxNLiYI/AAAAAAAAMiI/1r06howY1roR7-osOa0jt7hZzUPXACnIwCK4BGAsYHg/demo.bmp)
 

> ENCRYPTED IMAGE  

[![](https://1.bp.blogspot.com/-2mW60M9qhNM/XrTw-QF5X4I/AAAAAAAAMh8/Njps5Dn3KNEpyrGhP9eEvKkLxOvG0sJNQCK4BGAsYHg/d/enc1.bmp)](https://1.bp.blogspot.com/-2mW60M9qhNM/XrTw-QF5X4I/AAAAAAAAMh8/Njps5Dn3KNEpyrGhP9eEvKkLxOvG0sJNQCK4BGAsYHg/enc1.bmp)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk1MDY2NDcwNyw0MTE5MjYzODldfQ==
-->