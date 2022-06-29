In Blazor, we typically use either RenderTreeBuilder or Razor syntax `RenderFragment` to create dynamic components. In the classic approach, we check for the data type or for a condition to dynamically render a component. This necessitates manually maintaining the component’s state of visibility based on whether the component should be displayed or hidden, which is more complicated for complex data.

Beginning with .NET 6 Preview 1, the ASP.NET Core team introduced  [DynamicComponent](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-1/#dynamiccomponent) . The use of DynamicComponent greatly reduces the complexity of dynamic component rendering when dealing with large amounts of complex data.

## What is DynamicComponent?

[DynamicComponent](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-1/#dynamiccomponent ) is a new built-in Blazor component that can be used to render dynamic components using its type and optional parameters. Let’s take a look at it with some code examples. 
Let's consider you want to show todo list as list view and table view as shown in the below image.I have created two component `ListView` and `TableView` and then poppulated the dropdown list with components.


![](https://blogger.googleusercontent.com/img/a/AVvXsEhSyIQqPK6VeuhXj1KE62AksLrPx4wxlQ6LhyHAN3cv8Rde7BC6tV7wrR-1ZgpML_D0yVs9n7dQK5Shvuet1UFNgOp99JOxA7EguocmjRnvp3Men02mioA87WVvPNNCNEA8vQlQMtrdX9rHdn31b0gqEM53U3VObA5cc34PTi6MWDJXqzAGydEZFn9siQ=w640-h450)



## Demo

<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/QwEAwWvx16pyPHlV47?editor=true&result=true&errorList=false"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTMxNjI1OTYxMiw4NTEyNTA2MDksMTQ2Mj
gwNDQ0NF19
-->