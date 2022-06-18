
The following steps are generally required to enable custom events with custom event arguments.

 1. Define a function in JavaScript that will be responsible for constructing the custom event argument object from the source event and  Register the custom event with the preceding handler in  `wwwroot/index.html`  (Blazor WebAssembly) or  `Pages/_Layout.cshtml`  (Blazor Server) immediately after the Blazor  `<script>`
```js
Blazor.registerCustomEventType('dotnetguruevent', {
  browserEventName: 'paste',
  createEventArgs: event => {
    let isMedia = false;
    let data = event.clipboardData.getData('Text');
    const items = event.clipboardData.items;
    const acceptedMim = ['iamge/png'];
    for (let i = 0; i < items.length; i++) {
      const file = items[i].getAsFile();
      if (!file) continue;
      if (acceptedMim.indexOf(items[i].type) != -1) {
        continue;

      }
      isMedia = true;
      const url = window.URL;
      data = url.createObjectURL(file);
      return {
        isMedia,
        data
      }
    }

  }
});
```

 >The call to registerCustomEventType`  is performed in a script only once per event.

 2. Define a class for the event arguments:

```csharp
	public class DotNetGuruEventArgs : EventArgs
		{
		    public bool IsMedia { get; set; }
		    public string Data { get; set; }
		}
```

 3. Wire up the custom event with the event arguments by adding an EventHandlerAttribute attribute annotation for the custom event. The class doesn't require members:

```csharp
[EventHandler("ondotnetguruevent", typeof(DotNetGuruEventArgs), true, true)]
		public static class EventHandlers
		{
		}
```

 5. Register the event handler on one or more HTML elements. Access the data that was passed in from JavaScript in the delegate handler method:
```csharp
<label>
    Try pasting into the following text box:
    <textarea @oncustompaste="HandleCustomPaste" />
</label>

<p>
    @foreach(var image in images){
      <img src="@image">
    }
</p>

@code {
    private string? message;
    private List<string> images=new List<string>();

    private void HandleCustomPaste(CustomPasteEventArgs eventArgs)
    {
        if(eventArgs.IsMedia){
          images.Add(eventArgs.Data);
        }
    }
}

<script suppress-error="BL9992">
  Blazor.registerCustomEventType('custompaste', {
    browserEventName: 'paste',
    createEventArgs: event => {
        alert(event);
        let isMedia = false;
        let data = event.clipboardData.getData('Text');
        const items = event.clipboardData.items;
        const acceptedMim = ['image/png'];
        for (let i = 0; i < items.length; i++) {
            const file = items[i].getAsFile();
            if (!file) continue;
            if (acceptedMim.indexOf(items[i].type) === -1) {
                continue;

            }
            isMedia = true;
            const url = window.URL || window.webkitURL;
            data = url.createObjectURL(file);
          

        }
        return {
            isMedia,
            data
        }
    }
});
</script>
```

## Live Demo

<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/GmEUlsOi09g7ff4h31?editor=true&result=true&errorList=false"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5NTI3NTUwODgsLTk3NzA2ODA0MCw5OT
A1MzQ4NTEsLTIwNTYxNTgzOCwxNTU2MDMxODIwLDEwNTM0MzY2
ODMsNzMwOTk4MTE2XX0=
-->