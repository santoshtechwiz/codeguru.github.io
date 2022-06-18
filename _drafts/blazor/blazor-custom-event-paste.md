

The following steps are generally required to enable custom events with custom event arguments.

1. Define a function in JavaScript that will be responsible for constructing the custom event argument object from the source event:
    
    
   ```js
    function eventArgsCreator(event) { 
      return {
        customProperty1: 'any value for property 1',
        customProperty2: event.srcElement.value
      };
    }
    ```  
2. Register the custom event with the preceding handler in  `wwwroot/index.html`  (Blazor WebAssembly) or  `Pages/_Layout.cshtml`  (Blazor Server) immediately after the Blazor  `<script>`
    
  ```js
    <script>
      Blazor.registerCustomEventType('customevent', {
        createEventArgs: eventArgsCreator;
      });
    </script>
```

  >The call to registerCustomEventType`  is performed in a script only once per event.
  >
    
3. Define a class for the event arguments:
    
    ```csharp
    public class DotNetGuruEventArgs : EventArgs
{
    public bool IsMedia { get; set; }
    public string Data { get; set; }
}

[EventHandler("ondotnetguruevent", typeof(DotNetGuruEventArgs), true, true)]
public static class EventHandlers
{
}
````
 
    
4- An [EventHandlerAttribute](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.eventhandlerattribute) attribute annotation should be added to the custom event to connect the custom event with the event parameters. It is not necessary to have members in the class:
>Code
    
5. It is possible to register the event handler on one or more of the HTML elements. In the handler method for the delegate, which can be found here, you can retrieve the data sent in from JavaScript: It is possible to register the event handler on one or more of the HTML elements. In the handler method for the delegate, which can be found here, you can retrieve the data that was sent in from JavaScript:
>code
  


<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/GmEUlsOi09g7ff4h31?editor=true&result=true&errorList=false"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTg0NDUzNDA5NSwtOTc3MDY4MDQwLDk5MD
UzNDg1MSwtMjA1NjE1ODM4LDE1NTYwMzE4MjAsMTA1MzQzNjY4
Myw3MzA5OTgxMTZdfQ==
-->