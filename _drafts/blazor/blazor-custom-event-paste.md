In this blog post I will show you one of the lesser known feature of Blazor custom event. This feature allows us to map a event to browser event and then connect to C# code. 
Here I am going to build a textbox that react to paste event and displayed the image that is pasted similar to facebook or twitter textbox.
Currently the code support only the png image but you can easly extended it.

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
Above code defines a custom event `dotnetguruevent` (you can name it whatever you want) and then this event is map to browser paste event. when any control trigger the `dotnetguruevent` event it will fire the `createEventArgs` event and process the data and send it to C# method. See the other steps for how to connect this functions to c#
 >The call to registerCustomEventType`  is performed in a script only once per event.

 2. Define a class for the event arguments:

```csharp
	public class DotNetGuruEventArgs : EventArgs
		{
		    public bool IsMedia { get; set; }
		    public string Data { get; set; }
		}
```
Above is the simple C# custom eventargs class which have two property IsMedia and Data.

 3. Wire up the custom event with the event arguments by adding an EventHandlerAttribute attribute annotation for the custom event. The class doesn't require members:

```csharp
[EventHandler("ondotnetguruevent", typeof(DotNetGuruEventArgs), true, true)]
		public static class EventHandlers
		{
		}
```
This is the most important part of the article. Here we are registring the custom event 
> Make sure that you prefix on on your event name


 5. Now its time to consume the custom event Register the event handler on one or more HTML elements. Access the data that was passed in from JavaScript in the delegate handler method:
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
```
Above code is slef explanorty
Whenever the custom event is fired on the DOM, the event handler is called with the data passed from the JavaScript.

## Live Demo

<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/GmEUlsOi09g7ff4h31?editor=true&result=true&errorList=false"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTkwNDU2MzUxNSwtOTc3MDY4MDQwLDk5MD
UzNDg1MSwtMjA1NjE1ODM4LDE1NTYwMzE4MjAsMTA1MzQzNjY4
Myw3MzA5OTgxMTZdfQ==
-->