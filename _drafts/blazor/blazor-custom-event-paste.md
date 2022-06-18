
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
    
 
    
4- An [EventHandlerAttribute](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.eventhandlerattribute) attribute annotation should be added to the custom event in order to connect the custom event with the event parameters. It is not necessary to have members in the class:
>Code
    
5.  The event handler can be registered on one or more HTML elements. You can get the data that was sent in from JavaScript in the handler method for the delegate here:
>code
  

<!--stackedit_data:
eyJoaXN0b3J5IjpbNjk4NDE1ODkwLC0yMDU2MTU4MzgsMTU1Nj
AzMTgyMCwxMDUzNDM2NjgzLDczMDk5ODExNl19
-->