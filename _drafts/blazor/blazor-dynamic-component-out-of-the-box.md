In Blazor, we typically use either RenderTreeBuilder or Razor syntax ([RenderFragment](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.renderfragment?view=aspnetcore-5.0 "Link to RenderFragment Delegate documentation")) to create dynamic components. In the classic approach, we check for the data type or for a condition to dynamically render a component. This necessitates manually maintaining the component’s state of visibility based on whether the component should be displayed or hidden, which is more complicated for complex data.

Beginning with .NET 6 Preview 1, the ASP.NET Core team introduced  [DynamicComponent](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-1/#dynamiccomponent "Link to DynamicComponent"). The use of DynamicComponent greatly reduces the complexity of dynamic component rendering when dealing with large amounts of complex data.

## What is DynamicComponent?

[DynamicComponent](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-1/#dynamiccomponent "Link to DynamicComponent")  is a new built-in Blazor component that can be used to render dynamic components using its type and optional parameters. Let’s take a look at it with some code examples!
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ2MjgwNDQ0NF19
-->