


In this blog post, I will show you how to upload and preview the image in Blazor Web Application. 
Blazor out of the box provides a component `InputFile` that wraps the HTML file input element and supplies a [Stream for each file's contents.

Let's understand this with an example. I have a razor page, `Upload.razor,` in which I have added two tags, as shown below.

![](https://blogger.googleusercontent.com/img/a/AVvXsEi9uN49iMKrXQCU1jjPe532IwlXwGxWDkAyMSdxRa79Wgg3sZoYiUs609VGk-oQiY27rxvybMKokDFTvkBr3hvMbb5kv2X-XZZH84fe1ujUA-yzhjmfpdq2Zos-DO-QY8aeDyUV9j2nph_Msi4FxD815VCaddzg0whv0DWdsbhvmBIt6igLHsJFYrXyKA=w400-h176)


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
##  Things to remember

- `RequestImageFileAsync("image/png", 600, 600)` 
 convert the current image file to a new one of the specified file type and maximum file dimensions in our case it is 600x600. 
 - However, this method does not ensure the file's conversion, either before or after the conversion process. Because the modification is requested in the browser before it is transferred to the .NET function, the resulting data should not be trusted.


## Demo
<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/cwkAnuvO46GBBXBk45?editor=true&result=true&errorList=false"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY3Mjk5MzYwMSwyMzk3NzA2NDIsLTgzND
ExNTU3OCwtMTk0MzI3MTE0MywtMTQyMDU4MDYyOCwtODYzNDQ3
ODI2LC02MTMxMTAwMTddfQ==
-->