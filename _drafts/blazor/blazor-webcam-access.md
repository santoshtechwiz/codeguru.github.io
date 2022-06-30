This blog post I will show you how to access WebCam in Blazor application.
In order to access web camra from the user machine we will used the HTML5 `video` element and `navigator` API of the browser. Using blazor javascript interoperabily api we will invoke C# method from JavaScript and then called the StateHasChanged method from C# to.
See the following image for JavaScript->C# method mapping




![](https://blogger.googleusercontent.com/img/a/AVvXsEj822VcB1xaPgIhlrG6wRFvWRoeY25ShKH71XadfCHFxSeOnU5tvs_GhjpEBvRK5sKyYJclQM8n9nZZnL8UyVmAU49ZxR1_6T3RbqP6eFufpn5mljTkXlTxsdnM6J-IlEXwFhh_XDI5kHOe_C6qJZOWzzMhNjlQqwSIT_nmcy2jZWstVMKni_GkMBkZ9w=w640-h258)



As you can see from the above image that we are using Blazor `DotNetObjectReference` class to mediate beweeen JavaScript and C#.
Lets add the javascript file and add the following functions.

## Invoke an instance .NET method

To invoke an instance .NET method from JavaScript (JS):

-   Pass the .NET instance by reference to JS by wrapping the instance in a  [DotNetObjectReference](https://docs.microsoft.com/en-us/dotnet/api/microsoft.jsinterop.dotnetobjectreference)  and calling  [Create](https://docs.microsoft.com/en-us/dotnet/api/microsoft.jsinterop.dotnetobjectreference.create)  on it.
-   Invoke a .NET instance method from JS using  `invokeMethodAsync`  or  `invokeMethod`  (Blazor WebAssembly only) from the passed  [DotNetObjectReference](https://docs.microsoft.com/en-us/dotnet/api/microsoft.jsinterop.dotnetobjectreference). The .NET instance can also be passed as an argument when invoking other .NET methods from JS.
-   Dispose of the  [DotNetObjectReference](https://docs.microsoft.com/en-us/dotnet/api/microsoft.jsinterop.dotnetobjectreference).

```js

export async function init(videoElementRef, dotnetObjectRef) {
    console.log("Init");
    try {
        var stream = await navigator.mediaDevices.getUserMedia({ video: true });
        onSuccess(stream, videoElementRef);
        dotnetObjectRef.invokeMethodAsync("OnSuccess");
    }
    catch (e) {
        onFailure(e, dotnetObjectRef)
      
    }
}
function onSuccess(stream, videoElementRef) {
    
    videoElementRef.srcObject=stream;
    videoElementRef.play();
}

function onFailure(exception, dotnetObjectRef) {
    console.log("Exception occurred", exception);
    dotnetObjectRef.invokeMethodAsync("onFailure", exception.message);
}
```
Here I am using JavaScript module technique. The above code is self explanotry expect the dotnetObjectRef refrecne which is blazor class to interact with C#


```csharp
@if (!string.IsNullOrEmpty(errorMessage))
{
    @errorMessage
}

<video id="video" @ref="VideoElementRef"></video>
```

Correspoding to JavaScript I have C# method as shown below
```csharp
@code {

    private ElementReference VideoElementRef { get; set; }
    private string errorMessage = "";
    private string jsModulePath = "./camra.js";
    private Task<IJSObjectReference> moduleRef;
    [Inject]
    private IJSRuntime jSRuntime { get; set; }
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            moduleRef = jSRuntime.InvokeAsync<IJSObjectReference>("import", jsModulePath).AsTask();
            var module = await moduleRef;
            await module.InvokeVoidAsync("init", VideoElementRef, DotNetObjectReference.Create(this));
        }
    }

    [JSInvokable]
    public void OnSuccess()
    {
        StateHasChanged();

    }
    [JSInvokable]
    public void onFailure(string e)
    {
        errorMessage = e;
        StateHasChanged();
    }


}   
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTcxMDMwNTEwMCwxNjU4NjgzMjkwLC0xNT
IyNzk2MTg5LDIxMDYwMTE2NzNdfQ==
-->