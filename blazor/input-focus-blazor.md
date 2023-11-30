
In this blog post, I will show you how to focus an input element in Blazor app. Let's suppose you want when the user browser to your page you want that focus should be on the input control.
I will show you two techniques to handle this. The first one is the JavaScript approach, and the second one is the Blazor approach which is available after .net 5.0

## First Approach

>You can write JavaScript function in   `wwwroot/index.html`  (Blazor WebAssembly) or  `Pages/_Layout.cshtml`  (Blazor Server) immediately after the Blazor  `<script>.`

Let's first understand the `JavaScript approach. I have created a JavaScript function on the global scope, which takes element id and sets the focus.


```js
  window.focusElement = (element) => {
            var elementToFocus=document.getElementById(element);
            elementToFocus.focus();
        }

```
Now it's time to call the JavaScript function. As you know, if you want to register the `JavaScript` function or access Browser API, then the `OnAfterRender`  lifecycle event is the best place to register. In the following code, I inject the `IJSRuntime` interface and then call the function that now, when the page is loaded in the browser, it will be focused.

>InputFocus.razor

```csharp
@page "/focus"
<h3>InputFocus</h3>
@inject IJSRuntime Js
<EditForm Model="model">
    <InputText id="elemetnToFocus" @bind-Value="model" class="form form-control"></InputText>
</EditForm>

@code {
    private string model = "";

    protected override async void OnAfterRender(bool firstRender)
    {
        if (firstRender)
        {
            await Js.InvokeVoidAsync("focusElement", "elemetnToFocus");
        }
    }
}
```

## Second Approach

If you are using .net version 5.0 or higher you can achive the above functionality very easily. .net 5.0 allows to reference InputText component in C# code. Just declare a variable  `InputToFocus` and assign it to @ref as shown below
```csharp
  <InputText  @ref="InputToFocus" @bind-Value="model" class="form form-control">
```
Now you can `FocusAsync()` method on the @ref in C# code.

```csharp
@page "/focus"
<h3>InputFocus</h3>
@inject IJSRuntime Js
<EditForm Model="model">
    <!-- <InputText id="elemetnToFocus" @bind-Value="model" class="form form-control"></InputText> -->
     <InputText  @ref="InputToFocus" @bind-Value="model" class="form form-control"></InputText>
</EditForm>

@code {
    private string model = "";
    private InputText InputToFocus;
    
   protected override async Task OnAfterRenderAsync(bool firstRender)
{
    if (firstRender)
      if (InputToFocus.Element != null)
           await InputToFocus.Element.Value.FocusAsync();
}
}
```
## Live Demo
I have added both approaches in the following demo; just comment and play with the code.

<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/QGOKFrvx28guctVl38?editor=true&result=true&errorList=false"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk5Nzc5NzI3NiwtMTI5MjExMzkxMywtMT
M5MDI4NDcwMiwxODc4NDY3NTA0LC0xMTk2NDE1NzM1XX0=
-->