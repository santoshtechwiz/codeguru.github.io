
In this blog post, I will show you one of the lesser-known features of the Blazor custom event. This feature allows us to map an event to a browser event and then connect to the C# code. 
Here I am going to build a textbox that reacts to paste events and displays the pasted image, similar to Facebook or Twitter textbox.
Currently, the code supports only the png image, but this can quickly extend it.
[](https://blogger.googleusercontent.com/img/a/AVvXsEh-c1r3bZ-Sdckocq_70CGtY_4MRPY4Np9TfBMF49CoGDNGyFKc3USn2izdZVZpVz7z2QhiP4YzVq7WFm32KbhZCBMvmtS4tgdXNlwjEV20fi051C0etSDFF1hmtVnI5ObaN4OpxvbWx87KarrBD1xaYEtpet6Psmwv-PzhHhf4SyUkJpoUJBMczpr4Ow=w400-h281)
The following steps are generally required to enable custom events with custom event arguments.

 1. Define a function in JavaScript that will be responsible for constructing the custom event argument object from the source event and  Register the custom event with the preceding handler in  `wwwroot/index.html`  (Blazor WebAssembly) or  `Pages/_Layout.cshtml`  (Blazor Server) immediately after the Blazor  `<script>`
```js
Blazor.registerCustomEventType('codeguruevent', {
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
The above code defines a custom event `dotnetguruevent` (you can name it whatever you want). Then this event is the map to browser paste event. When any control triggers the `dotnetguruevent` event, it will fire the `createEventArgs` event, process the data, and send it to the C# method. See the other steps for how to connect these functions to c#
 >The call to registerCustomEventType`  is performed in a script only once per event.

 2. Define a class for the event arguments:

```csharp
	public class CodeGuruEventArgs : EventArgs
		{
		    public bool IsMedia { get; set; }
		    public string Data { get; set; }
		}
```
Above is the simple C# custom event args class, which has two properties, IsMedia and Data.

 3. Wire up the custom event with the event arguments by adding an EventHandlerAttribute attribute annotation for the custom event. The class doesn't require members:

```csharp
[EventHandler("oncodeguruevent", typeof(DotNetGuruEventArgs), true, true)]
		public static class EventHandlers
		{
		}
```
This is the essential part of the article. Here we are registering the custom event 
> Make sure that you prefix your event name


 5. Now its time to consume the custom event Register the event handler on one or more HTML elements. Access the data that was passed in from JavaScript in the delegate handler method:
```csharp
<label>
    Try pasting into the following text box:
    <textarea @oncodeguruevent="HandleCustomPaste" />
</label>

<p>
    @foreach(var image in images){
      <img src="@image">
    }
</p>

@code {
    private string? message;
    private List<string> images=new List<string>();

    private void HandleCustomPaste(CodeGuruEventArgs eventArgs)
    {
        if(eventArgs.IsMedia){
          images.Add(eventArgs.Data);
        }
    }
}
```
The above code is self-explanatory.
Whenever the custom event is fired on the DOM, the event handler is called with the data passed from JavaScript.

## Live Demo

<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/GmEUlsOi09g7ff4h31?editor=true&result=true&errorList=false"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQxMDk5NzczNiwzOTg5OTExNDQsLTE5Mz
A1Njc5MzksLTk3NzA2ODA0MCw5OTA1MzQ4NTEsLTIwNTYxNTgz
OCwxNTU2MDMxODIwLDEwNTM0MzY2ODMsNzMwOTk4MTE2XX0=
-->