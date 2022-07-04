In this blog post I wil show you how to override the css in `EditContext` . Assume you have already the css classes for the error message and you want to override the class when the blazor add the validation error message. You can do this very easily with blazor app. 

![](https://blogger.googleusercontent.com/img/a/AVvXsEgZufpGKmScUej2LB3GabR3eWjeCBA7g0J6ThHl6e_PuRcniAsBZvQ0E96-r0KPPtopQ1aJ7FCo4PqCJG9dRdZeGmkT75cLo6zp-7kSOnugU8Dn13F6TIvnMVlmGPTYDni3Ls9X80dL7WE0tHzMrqZKzr4ZwJx_43Vg0pyxXwsvCOh5cw8UZAIrylPDsw=w640-h282)

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
    .custom-success{
       border:  5px  solid  green;

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

>_Main.razor

```html
<h1>CodeGuru-Demo</h1>
<Form/>
@code {

}
```


>CustomCssProvider.cs

```csharp
 public class CustomCssProvider:FieldCssClassProvider
    {
public override string GetFieldCssClass(EditContext editContext,in FieldIdentifier fieldIdentifier){
	var isValid=!editContext.GetValidationMessages(fieldIdentifier).Any();
	if(editContext.IsModified(fieldIdentifier)){
		return isValid? "custom-success" : "custom-error";
	}else{
		return isValid ? "": "custom-error";
	}
}
    }
    ```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjA0MDQ0NDU3OSwtNDA3NzcwMTgzLDkzMD
M1MDU1OV19
-->