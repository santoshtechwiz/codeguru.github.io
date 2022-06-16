In this article, I am going to discuss how to implement autocomplete using jquery and Trie data structure.

Before going into code implementations, let's understand what a trie is.

### What is a trie
A trie, also called digital tree and sometimes radix tree or prefix tree (as prefixes can search them), is a kind of search tree—an ordered tree data structure that is used for pattern matching.
The `trie` has the following features

- Each node but the root is labelled with a character.
- Nodes are alphabetically ordered from left to right
- The path from child to root yields the string
  

![](https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Trie_example.svg/400px-Trie_example.svg.png)

   




  

>Open visual studio and create empty website project and add following code into App_Code

  **AutoComplete.cs**
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Trie
/// </summary>
public class Autocomplete
{

    // Trie node class
    public class Node
    {
        public string Prefix { get; set; }
        public Dictionary<char, Node> Children { get; set; }

        // Does this node represent the last character in a word?
        public bool IsWord;

        public Node(String prefix)
        {
            this.Prefix = prefix;
            this.Children = new Dictionary<char, Node>();
        }
    }

    // The trie
    private Node trie;

    // Construct the trie from the dictionary
    public Autocomplete(String[] dict)
    {
        trie = new Node("");
        foreach (String s in dict)
            InsertWord(s);
    }

    // Insert a word into the trie
    private void InsertWord(String s)
    {
        // Iterate through each character in the string. If the character is not
        // already in the trie then add it
        Node curr = trie;
        for (int i = 0; i < s.Length; i++)
        {
            if (!curr.Children.ContainsKey(s[i]))
            {

                curr.Children.Add(s[i], new Node(s.Substring(0, i + 1)));
            }
            curr = curr.Children[s[i]];
            if (i == s.Length - 1)
                curr.IsWord = true;
        }
    }

    // Find all words in trie that start with prefix
    public List<String> GetWordsForPrefix(String pre)
    {
        List<String> results = new List<String>();

        // Iterate to the end of the prefix
        Node curr = trie;
        foreach (char c in pre.ToCharArray())
        {
            if (curr.Children.ContainsKey(c))
            {
                curr = curr.Children[c];
            }
            else
            {
                return results;
            }
        }

        // At the end of the prefix, find all child words
        FindAllChildWords(curr, results);
        return results;
    }

    // Recursively find every child word
    private void FindAllChildWords(Node n, List<String> results)
    {
        if (n.IsWord)
            results.Add(n.Prefix);
        foreach (var c in n.Children.Keys)
        {
            FindAllChildWords(n.Children[c], results);
        }
    }
}
```
> Open the default.aspx and pate the following code. The code is self-explanotory.

**Default.aspx**
```html

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jquery-1.12.4.js"></script>
    <script src="Scripts/jquery-ui-1.12.1.js"></script>
    <link href="Content/themes/base/jquery-ui.css" rel="stylesheet" />
    <script type="text/javascript">
            $(document).ready(function() {
                SearchText();
            });
            function SearchText() {
                $(".autosuggest").autocomplete({
                    source: function(request, response) {
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "WebService.asmx/GetData",
                            data: "{'username':'" + document.getElementById('txtSearch').value + "'}",
                            dataType: "json",
                            success: function (data) {
                                if (data != null) {

                                    response(data.d);
                                }
                            },
                            error: function(result) {
                                alert("Error");
                            }
                        });
                    }
                });
            }
        </script>
</head>
<body>
    <form id="form1" runat="server">
          <div class="demo">
           <div class="ui-widget">
            <label for="tbAuto">Enter UserName: </label>
       <input type="text" id="txtSearch" class="autosuggest" />
    </div>
        </form>
</body>
</html>
```
>Edit the web.config as per the below

**Web.Config**

```xml
<?xml version="1.0"?>

<!--
 For more information on how to configure your ASP.NET application, please visit
 http://go.microsoft.com/fwlink/?LinkId=169433
 -->

<configuration>

    <system.web>
      <compilation debug="true" targetFramework="4.5.2" />
      <httpRuntime targetFramework="4.5.2" />
      <webServices>
        <protocols>
          <add name="HttpPost"/>
        </protocols>
      </webServices>
    </system.web>

</configuration>
```

**WebService.asmx**
```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{

    public WebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<string> GetData(string username)
    {
        Autocomplete a = new Autocomplete(new String[] { "india", "ireland", "usa", "poland", "uk", "germany", "guana", "uae" });

        return a.GetWordsForPrefix(username);
    }

}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0NzQ4NzM5MzFdfQ==
-->