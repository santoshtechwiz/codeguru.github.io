
The following steps are generally what are required in order to enable custom events with custom event arguments.

1. Define a function in JavaScript that will be responsible for constructing the custom event argument object from the source event:
    
    
   ```js
    function eventArgsCreator(event) { 
      return {
        customProperty1: 'any value for property 1',
        customProperty2: event.srcElement.value
      };
    }
    ```  
2.  Register the custom event with the preceding handler in  `wwwroot/index.html`  (Blazor WebAssembly) or  `Pages/_Layout.cshtml`  (Blazor Server) immediately after the Blazor  `<script>`:
    
  ```js
    <script>
      Blazor.registerCustomEventType('customevent', {
        createEventArgs: eventArgsCreator;
      });
    </script>
```


    
  >The call to  registerCustomEventType`  is performed in a script only once per event.
    
3.  Define a class for the event arguments:
    
    ```csharp
        public class CustomEventArgs : EventArgs
    {
        public string? CustomProperty1 {get; set;}
        public string? CustomProperty2 {get; set;}
    }

    
4- Wire up the custom event with the event arguments by adding an  [EventHandlerAttribute](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.eventhandlerattribute)  attribute annotation for the custom event. The class doesn't require members:
    
 
```csharp
    [EventHandler("oncustomevent", typeof(CustomEventArgs), enableStopPropagation: true, enablePreventDefault: true)]
    static class EventHandlers
    {
    }
  ```
    
5.  Register the event handler on one or more HTML elements. Access the data that was passed in from JavaScript in the delegate handler method:

    ```csharp

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

zfsd
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI1ODU0ODQ2NSwxMDUzNDM2NjgzLDczMD
k5ODExNl19
-->