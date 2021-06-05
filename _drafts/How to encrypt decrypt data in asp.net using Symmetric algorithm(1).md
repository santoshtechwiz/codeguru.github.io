In this post I am going to show you how to encrypt and decrypt data in asp.net using Symmetric algorithm.Before going to implementation details let discuss some security related terms before.  
### What is Hashing
   Hashing is one-way algorithm, means once the data is hashed you can’t recovered it latter.  
Hashing is a cryptographic function that is used to provide a secure fingerprint of data. A common usage you may have encountered is to check a file you have downloaded.  

---
### What is Encryption
If you want to secure your data, and latter you want to retrieve the original data. We used encryption because encryption is two-way processes. For encryption we requires following things  
  
**Key:** _Key is a piece of information that is used as an input parameter in encryption. The output of encryption is determined by the key._  

---
**Types of Encryption**  
are two main types of encryption and decryption algorithms, symmetric and asymmetric.  

----

### Symmetric
In symmetric encryption we used same key for encryption and decryption( As the diagram shows the same key is used for encrypting and decrypting the message).DES, Triple DES, RC2 and AES or Rijndael are examples of symmetric algorithms  

[![](https://2.bp.blogspot.com/-spJTxEb6OUk/Th7BtT36sQI/AAAAAAAACUg/B_9PhDbPBj8/s400/Sym.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/7678098128704613682#)

  
  
### Asymmetric Encryption
Asymmetric algorithms use a related key-pair to encrypt and decrypt data. One of the keys in the pair is typically called a public key while the other is called a private key. Data encrypted with a public key can only be decrypted with the private key, and vice-versa. PKI (public key infrastructure) is built based on asymmetric algorithm. RSA is a popular asymmetric algorithm.  

[![](https://4.bp.blogspot.com/-XlgLvaNfe9Y/Th7CU6YNpqI/AAAAAAAACUk/NLhn4RcnJ04/s400/ASym.JPG)](https://www.blogger.com/blog/post/edit/6673695286148904603/7678098128704613682#)

#### What are the steps required for Encryption ?
*Follow these steps to encrypt data symmetrically:*  

1.  Choose an algorithm.
2.  Create or retrieve a key.
3.  Generate the IV.
4.  Convert the clear text data to an array of bytes.
5.  Encrypt the clear text byte array.
6.  Store the encrypted data and the IV.

  
#### What are the steps required for Decryption?
Following are the steps required for decrypting the data.  
  
1.  Choose the same algorithm that was used to encrypt the data.
2.  Retrieve the key that was used.
3.  Retrieve the IV that was used.
4.  Retrieve the encrypted data.
5.  Decrypt the data.
6.  Convert the decrypted data back to its original format.

#### Implementation
I am going to choose `Triple DES `algorithm for this demo.(Step#1)  
  
*Let's first generate IV (initialization vector) and Key (Step #2).For this,create a separate console application and paste following code inside Main method*  
  
  
  
```csharp
static void Main(string[] args)

{
	DESCryptoServiceProvider des = new DESCryptoServiceProvider();
	des.GenerateIV();

	des.GenerateKey();
	Console.WriteLine("Key={0}", String.Join(",", des.Key));

	Console.WriteLine("IV={0}", String.Join(",", des.IV));
}
  ```
  
Run the application and note down the value of IV and Key.  
[![](https://1.bp.blogspot.com/-J4vPAN9CUMQ/Th7ITEz916I/AAAAAAAACUo/9PBo5S0S2Cc/s640/key.bmp)](https://www.blogger.com/blog/post/edit/6673695286148904603/7678098128704613682#)
 
*Create a new class named EncryptionManager and add following code*  
     
```csharp
public class EncryptionManager
{
private byte[] Key = {89,83,45,236,140,228,180,79,209,164,231,131,28,7,110,73,140,235,118,52,225,46,202,118
    };
private byte[] IV = { 161, 200, 187, 207, 22, 92, 119, 227 };
public string Encrypt(string inputString)
    {
//Step #4
byte[] buffer = Encoding.ASCII.GetBytes(inputString);
        TripleDESCryptoServiceProvider tripleDes = new TripleDESCryptoServiceProvider()
        {
            Key = Key,
            IV = IV
        };
//Step #4,5,6
        ICryptoTransform ITransform = tripleDes.CreateEncryptor();
return Convert.ToBase64String(ITransform.TransformFinalBlock(buffer, 0, buffer.Length));
    }
public string Decrypt(string inputString)
    {
byte[] buffer = Convert.FromBase64String(inputString);
        TripleDESCryptoServiceProvider tripleDes = new TripleDESCryptoServiceProvider()
        {
            Key = Key,
            IV = IV
        };
        ICryptoTransform ITransform = tripleDes.CreateDecryptor();
return Encoding.ASCII.GetString(ITransform.TransformFinalBlock(buffer, 0, buffer.Length));
    }
}
```
#### How to use

Create a new webpage and add following code inside it
 
```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EncryptDecrypt.aspx.cs" Inherits="EncryptDecrypt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title></title>
</head>
<body>
<form id="form1" runat="server">
<table border="0" cellpadding="0" cellspacing="0">
<tr>
<td>
<asp:TextBox ID="txtData" runat="server" TextMode="MultiLine"></asp:TextBox>
</td>
<td>
<asp:TextBox runat="server" ID="txtEncrypt" TextMode="MultiLine"></asp:TextBox>
</td>
<td>
<asp:TextBox runat="server" ID="txtDecrypt" TextMode="MultiLine"></asp:TextBox>
</td>
</tr>
<tr>
<td>
<asp:Button ID="btnEncrypt" runat="server" OnClick="btnEncrypt_Click" Text="Encrypt" />
<asp:Button ID="btnDecrypt" runat="server" Text="Decrypt" OnClick="btnDecrypt_Click" />
</td>
</tr>
</table>
</form>
</body>
</html>
```
  
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Cryptography;
using System.Text;
using System.IO;
public partial class EncryptDecrypt : System.Web.UI.Page
{
    EncryptionManager manager = new EncryptionManager();
protected void Page_Load(object sender, EventArgs e)
    {
    }
protected void btnEncrypt_Click(object sender, EventArgs e)
    {
        txtEncrypt.Text = manager.Encrypt(txtData.Text);
    }
protected void btnDecrypt_Click(object sender, EventArgs e)
    {
        txtDecrypt.Text = manager.Decrypt(txtEncrypt.Text);
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQxMDQyNzddfQ==
-->