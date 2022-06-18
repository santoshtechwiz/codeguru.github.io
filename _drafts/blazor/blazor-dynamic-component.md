In this blog post I will show you how to load blazor component dynamically. 
Assume you have two components `ComOne` and `ComTwo` in the component folders

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
        Console.WriteLine(e.Value);

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
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTcxNjQyNTEyXX0=
-->