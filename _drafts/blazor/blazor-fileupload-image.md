

In this blog post, I will show you how to upload and preview the image in Blazor Web Application. 
Blazor out of the box provides a component `InputFile` that wraps the HTML file input element and supplies a [Stream for each file's contents.

Let's understand this with an example. I have a razor page, `Upload.razor,` in which I have added two tags, as shown below.


```html
<InputFile OnChange="LoadImage" />

<img src="@ImageUri" />

```

Then in the C# code, I have created a method `LoadImage` that accepts the argument `InputFileChangeEventArgs.` When the user selects the image, this method triggers and provides the information about the file.
In the below code, you can see that I am reading the file as `Stream` and then converting it to a base64 string so we can show it in the `img` tag.

```csharp
 public async Task LoadImage(InputFileChangeEventArgs inputFileChangeEventArgs)
    {
        var image = await inputFileChangeEventArgs.File.RequestImageFileAsync("image/png", 600, 600);

        using Stream imageStream = image.OpenReadStream(1024 * 1024 * 10);
        
        using MemoryStream ms = new();
        //copy imageStream to Memory stream
        await imageStream.CopyToAsync(ms);

        //convert stream to base64
        ImageUri = $"data:image/png;base64,{Convert.ToBase64String(ms.ToArray())}";
        StateHasChanged();

    }
```


## Demo
<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/cwkAnuvO46GBBXBk45?editor=true&result=true&errorList=false"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0MjA1ODA2MjgsLTg2MzQ0NzgyNiwtNj
EzMTEwMDE3XX0=
-->