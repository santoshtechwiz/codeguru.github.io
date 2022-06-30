


> Written with [StackEdit](https://stackedit.io/).


```html
<InputFile OnChange="LoadImage" />

<img src="@ImageUri" />

```

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

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY5NDA1MTgwMF19
-->