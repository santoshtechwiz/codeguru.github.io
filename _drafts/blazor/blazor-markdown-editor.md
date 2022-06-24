
Nowadays, Markdown is an intelligent technology for creating web editors. StackOverflow uses MarkDown editor on their QnA website. There is a lot of online markdown editor available, like stackedit is very popular.
This blog post will show you how to create a markdown editor in the Blazor Application.

Let's start with some basic HTML structure.I have created a bootstrap row and two column first column is input

```csharp
<div class="row">
    <div class="col-6">
        <textarea class="form-control"></textarea>
    </div>
    <div class="col-6">
       ==Preview==
    </div>
</div>
```

# Bind your inputs to something

Now we're ready to take the next step; we need to take whatever is entered into the  `textarea`  and store it in our component's state.

For this, we can use properties and Blazor’s binding syntax. We just need to declare a couple of attributes:

```csharp
<div class="row">
    <div class="col-6">
        <textarea class="form-control" @bind="Body" 
       @bind:event="oninput" ></textarea>
    </div>
    <div class="col-6">
        @(StringToMarkdown)
    </div>
</div>
@code {
    public string Body { get; set; } = string.Empty;
    private string html="";
    public string StringToMarkdown;
 
}
```

# From markup to HTML

Happily, we don't need to expend much effort to get HTML from this markup, and we can employ the excellent Markdig .NET Markdown processor to do it for us.

Bring in the NuGet package.

"`PowerShell
Install-Package Markdig
```

Let's add a new `StringToMarkdown` property to our component, which will invoke Markdig every time we request its value.

```csharp
@using Markdig
<div class="row">
    <div class="col-6">
        <textarea class="form-control" @bind="Body" 
       @bind:event="oninput" ></textarea>
    </div>
    <div class="col-6">
        @((MarkupString)StringToMarkdown)
    </div>
</div>
@code {
    public string Body { get; set; } = string.Empty;
    private string html="";
    public string StringToMarkdown{

        get{
            try{

                html=Markdown.ToHtml(Body);
            }
            catch{

            }
            return HTML;
        }
    }

    

}
```

### Live Demo

<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/mQaAQouJ41XMcCnE13?editor=true&result=true&errorList=false"></iframe>

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTkxMTk0NjQxLDc1MTk3MTQxNywxNTgxNz
c1ODY2LC04MjI0NzQyNzZdfQ==
-->