
In this blog post, I will show you how to load the blazor component dynamically. 
Assume you have two components, `ComOne` and `ComTwo` in the component folders and there is a select list on the page. When user select the component from the select list selected component will be dynamically loaded and render on the page. 

![](https://blogger.googleusercontent.com/img/a/AVvXsEjw_ZRoKUFt974keXx79VTid71cicO1RYw-crUpeg-CKjs7HLqRWxVF7ZOXseUpuiUcteNW4RoJ0yp-8HHj4WOIWZEb4YHAIPrjxpNgqofzOlOXX59NRT-Wkx6S_SuPc3x2GJalT1Rg4CNWg9fKPfPMT-cvNp0BYCAiRMmx7XxzdfzCAV7QRhKHFz1uag=w640-h314)

>Components/ComOne.razor

```csharp
<h1>Com1</h1>
<p>@count</p>
<button @onclick="Increment">Increment</button>
@code{

    private int count=0;
    private void Increment(){
        count++;
        StateHasChanged();

    }
}
```

>Components/ComTwo.razor

```csharp
<h1 style="color:red;">ComTwo</h1>
```

>DynamicComponent.razor


```csharp
@page "/dynamic"
@using DotNetGuru.Pages.Components
@using System.Reflection

<h1>DotNet Guru</h1>
<select @onchange="LoadComponent">
    

    @foreach (var c in new[] {"Select Component", "ComOne", "ComTwo" })
    {
        <option>@c</option>
    }
</select>
<h6>Component Will Be Loaded Here</h6>
@RenderFragment

@code {
    private RenderFragment RenderFragment;

    private readonly List<ComponentBase> componentList = new List<ComponentBase> { new ComOne(), new ComTwo() };


    protected override void OnInitialized()
    {
    }
    public void LoadComponent(ChangeEventArgs e)
    {
       
        RenderFragment = builder =>
        {
            var currentComponent = FilterByType(typeof(ComponentBase), e.Value.ToString());
            if (currentComponent != null)
            {
                builder.OpenComponent(0, currentComponent);
                builder.CloseComponent();
            }
        };
        StateHasChanged();
    }
    public Type FilterByType(Type BaseType,string name)
    {

        return Assembly.GetExecutingAssembly().GetTypes()
            .FirstOrDefault(t => BaseType.IsAssignableFrom(t) && t.Name == name);
        ;
    }

}
```
In order to make demo simple I have already c

>Represents a segment of UI content, implemented as a delegate that writes the content to a [RenderTreeBuilder](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.rendering.rendertreebuilder?view=aspnetcore-6.0).

Let's understand the above code; most of the code is boilerplate. The only method related to the dynamic loading of components is `LoadComponent`. Blazor provides a powerful API `RenderFragment` delegate that rhat writes the content to a [RenderTreeBuilder]. In the following code, I am finding the component from the assembly, and then I am adding the component in RenderTree dynamically based on the type selected from the DropDown list


```csharp
 public void LoadComponent(ChangeEventArgs e)
    {
       
        RenderFragment = builder =>
        {
            var currentComponent = FilterByType(typeof(ComponentBase), e.Value.ToString());
            if (currentComponent != null)
            {
                builder.OpenComponent(0, currentComponent);
                builder.CloseComponent();
            }
        };
        StateHasChanged();
    }
  ```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2NjM1NzM2MSwxMTkyNjM1NjMsLTE3Mj
MyNzU2NzddfQ==
-->