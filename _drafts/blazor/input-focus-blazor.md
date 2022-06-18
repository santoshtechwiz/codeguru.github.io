This blog post I will show you how to focus an input element in Blazor app. Let's suppose you want when user browser to your page you want that focus should be on the input control.
I will show you two technique to handle this. The first one is JavaScript approach and second one is Blazor approach which is aviable after .net 5.0

## First Apporach
Let's first understand

```js
  window.focusElement = (element) => {
            var elementToFocus=document.getElementById(element);
            elementToFocus.focus();
        }

```

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

.NET 5.0


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


<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/QGOKFrvx28guctVl38?editor=true&result=true&errorList=false"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTMxMDE3NjA4LC0xMjkyMTEzOTEzLC0xMz
kwMjg0NzAyLDE4Nzg0Njc1MDQsLTExOTY0MTU3MzVdfQ==
-->