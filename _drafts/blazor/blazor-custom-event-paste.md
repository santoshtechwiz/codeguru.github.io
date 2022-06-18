Custom events with custom event arguments are generally enabled with the following steps.

1.  In JavaScript, define a function for building the custom event argument object from the source event:
    
    JavaScriptCopy
    
    ```
    function eventArgsCreator(event) { 
      return {
        customProperty1: 'any value for property 1',
        customProperty2: event.srcElement.value
      };
    }
    
    ```
    
2.  Register the custom event with the preceding handler in  `wwwroot/index.html`  (Blazor WebAssembly) or  `Pages/_Layout.cshtml`  (Blazor Server) immediately after the Blazor  `<script>`:
    
    HTMLCopy
    
    ```
    <script>
      Blazor.registerCustomEventType('customevent', {
        createEventArgs: eventArgsCreator;
      });
    </script>
    
    ```
    
    Note
    
    The call to  `registerCustomEventType`  is performed in a script only once per event.
    
3.  Define a class for the event arguments:
    
    C#Copy
    
    ```
    public class CustomEventArgs : EventArgs
    {
        public string? CustomProperty1 {get; set;}
        public string? CustomProperty2 {get; set;}
    }
    
    ```
    
4.  Wire up the custom event with the event arguments by adding an  [EventHandlerAttribute](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.eventhandlerattribute)  attribute annotation for the custom event. The class doesn't require members:
    
    C#Copy
    
    ```
    [EventHandler("oncustomevent", typeof(CustomEventArgs), enableStopPropagation: true, enablePreventDefault: true)]
    static class EventHandlers
    {
    }
    
    ```
    
5.  Register the event handler on one or more HTML elements. Access the data that was passed in from JavaScript in the delegate handler method:
    
    razorCopy
    
    ```
    <button @oncustomevent="HandleCustomEvent">Handle</button>
    
    @code
    {
        void HandleCustomEvent(CustomEventArgs eventArgs)
        {
            // eventArgs.CustomProperty1
            // eventArgs.CustomProperty2
        }
    }
    
    ```
    

Whenever the custom event is fired on the DOM, the event handler is called with the data passed from the JavaScript.

If you're attempting to fire a custom event,  [`bubbles`](https://developer.mozilla.org/docs/Web/API/Event/bubbles)  must be enabled by setting its value to  `true`. Otherwise, the event doesn't reach the Blazor handler for processing into the C# custom  [EventHandlerAttribute](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.eventhandlerattribute)  method. For more information, see  [MDN Web Docs: Event bubbling](https://developer.mozilla.org/docs/Web/Guide/Events/Creating_and_triggering_events#event_bubbling).

#### [](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/event-handling?view=aspnetcore-6.0#custom-clipboard-paste-event-example)Custom clipboard paste event example

The following example receives a custom clipboard paste event that includes the time of the paste and the user's pasted text.

Declare a custom name (`oncustompaste`) for the event and a .NET class (`CustomPasteEventArgs`) to hold the event arguments for this event:

`CustomEvents.cs`:

C#Copy

```
[EventHandler("oncustompaste", typeof(CustomPasteEventArgs), 
    enableStopPropagation: true, enablePreventDefault: true)]
public static class EventHandlers
{
}

public class CustomPasteEventArgs : EventArgs
{
    public DateTime EventTimestamp { get; set; }
    public string? PastedData { get; set; }
}

```

Add JavaScript code to supply data for the  [EventArgs](https://docs.microsoft.com/en-us/dotnet/api/system.eventargs)  subclass. In the  `wwwroot/index.html`  or  `Pages/_Layout.cshtml`  file, add the following  `<script>`  tag and content immediately after the Blazor script. The following example only handles pasting text, but you could use arbitrary JavaScript APIs to deal with users pasting other types of data, such as images.

`wwwroot/index.html`  (Blazor WebAssembly) or  `Pages/_Layout.cshtml`  (Blazor Server) immediately after the Blazor script:

HTMLCopy

```
<script>
  Blazor.registerCustomEventType('custompaste', {
      browserEventName: 'paste',
      createEventArgs: event => {
        return {
          eventTimestamp: new Date(),
          pastedData: event.clipboardData.getData('text')
        };
      }
  });
</script>

```

The preceding code tells the browser that when a native  [`paste`](https://developer.mozilla.org/docs/Web/API/Element/paste_event)  event occurs:

-   Raise a  `custompaste`  event.
-   Supply the event arguments data using the custom logic stated:
    -   For the  `eventTimestamp`, create a new date.
    -   For the  `pastedData`, get the clipboard data as text. For more information, see  [MDN Web Docs: ClipboardEvent.clipboardData](https://developer.mozilla.org/docs/Web/API/ClipboardEvent/clipboardData).

Event name conventions differ between .NET and JavaScript:

-   In .NET, event names are prefixed with "`on`".
-   In JavaScript, event names don't have a prefix.

In a Razor component, attach the custom handler to an element.

`Pages/CustomPasteArguments.razor`:
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA1MzQzNjY4Myw3MzA5OTgxMTZdfQ==
-->