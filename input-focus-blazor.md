This blog post I will show you how to focus an input element in Blazor app

Let's assume you have


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

.NET 5
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTk1MDgxODk2LDE4Nzg0Njc1MDQsLTExOT
Y0MTU3MzUsNzMwOTk4MTE2XX0=
-->