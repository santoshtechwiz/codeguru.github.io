Now a days Markdown is very popular technology for creating web editor. StackOverflow uses MarkDown editor in there QnA website. There are a lot of online markdown editor aviable like stackedit is very popular.
In this blog post,I will show you how to create a markdown editor in Blazor Application.


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
            return html;
        }
    }

    

}
```

### Live Demo

<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/mQaAQouJ41XMcCnE13?editor=true&result=true&errorList=false"></iframe>

<!--stackedit_data:
eyJoaXN0b3J5IjpbODgyNDQ3MTE1LDE1ODE3NzU4NjYsLTgyMj
Q3NDI3Nl19
-->