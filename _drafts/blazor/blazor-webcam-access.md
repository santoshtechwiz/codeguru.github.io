This blog post I will show you how to access WebCam in Blazor application.
In order to access web camra from the user machine we will used the HTML5 `video` element and `navigator` API of the browser. Using blazor javascript interoperabily api we will invoke C# method from JavaScript and then called the StateHasChanged method from C# to repaint the browser.




![](https://blogger.googleusercontent.com/img/a/AVvXsEj822VcB1xaPgIhlrG6wRFvWRoeY25ShKH71XadfCHFxSeOnU5tvs_GhjpEBvRK5sKyYJclQM8n9nZZnL8UyVmAU49ZxR1_6T3RbqP6eFufpn5mljTkXlTxsdnM6J-IlEXwFhh_XDI5kHOe_C6qJZOWzzMhNjlQqwSIT_nmcy2jZWstVMKni_GkMBkZ9w=w640-h258)


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


<!--stackedit_data:
eyJoaXN0b3J5IjpbMjEzODU3MjU0MywyMTA2MDExNjczXX0=
-->