


```csharp

  public class ExampleModel
{
    [Required]
    [StringLength(10, ErrorMessage = "Name is too long.")]
    public string? Name { get; set; }
    [Required]
    [Range(1,10)]
    public int Age {get;set;}
}
```

>Form.razor

```csharp

<style>
    .custom-error{
        
          border: 5px solid #ffdddd;
    }
    </style>
<EditForm EditContext="_editContext" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
 

    <div>
        <InputText id="name" @bind-Value="exampleModel.Name" />
    <ValidationMessage For="() => exampleModel.Name" />

    </div>
   <div>
         <InputNumber id="age" @bind-Value="exampleModel.Age" />

    <ValidationMessage For="() => exampleModel.Age" />
   </div>

    <button type="submit">Submit</button>
</EditForm>

@code {
    private ExampleModel exampleModel = new();
    private string message="";
    private EditContext _editContext;
    protected override void OnInitialized(){

	_editContext=new EditContext(exampleModel);
	_editContext.SetFieldCssClassProvider(new CustomCssProvider());
}
    private void HandleValidSubmit()
    {
        message="HandleValidSubmit called";

        // Process the valid form
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1NTExODM4Nl19
-->