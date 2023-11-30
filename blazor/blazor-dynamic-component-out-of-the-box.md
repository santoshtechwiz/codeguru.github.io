
To generate dynamic components in Blazor, we commonly use `RenderTreeBuilder `or the `RenderFragment` To dynamically render a component. These require a lot of manual work, like maintaining the component's visible status based on whether the component should be displayed or hidden, which is more difficult with complex data.


Beginning with .NET 6 Preview 1, the ASP.NET Core team introduced  [DynamicComponent](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-1/#dynamiccomponent) . By using the use of DynamicComponent you can reduces the complexity of dynamic component rendering when dealing with large amounts of complex data.
>If you are not using .net6 preview1 then you can achived the same thing without using the DynamicComponet. please refer the following article

[Dynamically-rendered ASP.NET Core Blazor components](https://www.codeguru.co.in/2022/06/dynamically-rendered-aspnet-core-blazor.html)

## What is DynamicComponent?

[DynamicComponent](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-1/#dynamiccomponent ) is a new built-in Blazor component that can be used to render dynamic components using its type and optional parameters. 


Let's unerstand this with an example. Suppose you want to show a to-do list as a `list view` and a `table view`, as shown in the below image. You can quickly develop this functionality using `DynamicComponent.`  Create two component with diffrent design and then give option to user to select the view he is comfortable.



![](https://blogger.googleusercontent.com/img/a/AVvXsEhSyIQqPK6VeuhXj1KE62AksLrPx4wxlQ6LhyHAN3cv8Rde7BC6tV7wrR-1ZgpML_D0yVs9n7dQK5Shvuet1UFNgOp99JOxA7EguocmjRnvp3Men02mioA87WVvPNNCNEA8vQlQMtrdX9rHdn31b0gqEM53U3VObA5cc34PTi6MWDJXqzAGydEZFn9siQ=w640-h450)

Let's dive into code. I assume that you are familiar with how to create and run the blazor project. In the newly created blazor app I have created two-component `ListView.razor` and `TableView.razor` and then populated the dropdown list with components.

In the main page I have added following code snippet I am creating a list of `Component` with parameter name,type and parameters(in our case it is null)  and then my setting the currently selected component to `DynamicComponent` rest all the heavy lifting work is done by the `DynamicComponent`

```csharp
<DynamicComponent Type="@(Type.GetType(currentComponent.Type))" Parameters="@currentComponent.Parameters"
  />
  ```


>_Main.razor

```csharp

<select @onchange="SelectView">
@foreach(var c in componentList){
    <option value="@c.Name">@c.Name</option>
}
</select>
&nbsp;
<DynamicComponent Type="@(Type.GetType(currentComponent.Type))" Parameters="@currentComponent.Parameters"
  />

@code {

    private Component currentComponent { get; set; }
    private  List<Component> componentList=new List<Component>();
    public class Component
    {
        public string Name { get; set; }

        public string Type { get; set; }

        public Dictionary<string, object> Parameters { get; set; }

    }
    protected override async Task OnInitializedAsync()
    {
      componentList = new List<Component>()
        {
            new Component() { Name = "ListView",Type = typeof(ListView).AssemblyQualifiedName, 
            Parameters = null},
            new Component() { Name = "TableView",Type = typeof(TableView).AssemblyQualifiedName, 
            Parameters = null}


        };
        currentComponent = componentList[0];
        await base.OnInitializedAsync();
    }
    public void SelectView(ChangeEventArgs e){
        currentComponent = this.componentList.FirstOrDefault(x => x.Name.Equals(e.Value.ToString()));

    }
}
```
## # Complete Source Code

This file is simple PCOC class for holding todo data

>Todo.cs
```csharp
namespace BlazorRepl.UserComponents
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Text;
	using System.Threading.Tasks;

	public class Todo
	{
		public int id { get; set; }
		public string title { get; set; }
		public bool completed { get; set; }
	}
}
```
>TodoService.cs

Fake service for returning list of todos
```csharp

namespace BlazorRepl.UserComponents
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Text;
	using System.Threading.Tasks;
	using System.Text.Json;
	using System.Net.Http;
	using System.Text.Json.Serialization;

	public class TodoService
	{
		private List<Todo> todos;


		public List<Todo> GetData()
		{
			todos = new List<Todo>(){
				new Todo{id=1,title="write the blog post",completed=false},
				new Todo{id=2,title="go grocery outlet",completed=true},
				new Todo{id=3,title="lreom ipsum",completed=true},
				new Todo{id=4,title="lorem ipsum lorem ipsum",completed=false},
			};
			return todos;


		}
	}
}
```


>TableView.razor


I am using bootstrap for creating simple table

```html
@inject TodoService todoService
<h1>TableView</h1>

<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Completed</th>
    
    </tr>
  </thead>
  <tbody>
         @foreach(var todo in todoService.GetData()){
    <tr>
     
      <td>@todo.id</td>
      <td>@todo.title</td>
      <td>@todo.completed</td>
    </tr>
         }
   
    
  </tbody>
</table>
```
>ListView.razor

Boostrap list group for showing todos as list-group

```html
@inject TodoService todoService
<h1>List View</h1>


<ul class="list-group">
       @foreach(var todo in todoService.GetData()){
  <li class="list-group-item d-flex justify-content-between align-items-center">
   <span>@todo.id</span> @todo.title
   <p class="list-group-item-text text-success">
        @todo.completed
        </p>
  </li>
   }
</ul>
```




## Demo
Click on preview and play with the demo

<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/QwEAwWvx16pyPHlV47?editor=true&result=true&errorList=false"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY4MDcyMTU1OCwtMTA1MTEwNzMzMiwxNj
c3NjEwMjY4LDExOTY2NDgxNiwxNDMyODIzNzUsNDA4ODkxOTQw
LDE4NzA4Njg5NDUsMjEwNDI5OTc1OCw2ODM5NjQ1NjIsMTMxNj
I1OTYxMiw4NTEyNTA2MDksMTQ2MjgwNDQ0NF19
-->