
In this blog post, I will show you how to override the CSS in `EditContext.` For example, assume you already have the CSS classes for the error message. Then, when the blazor adds the validation error message, you want to override the class. You can do this very easily with the blazor app. 
The blazor framework provides a class called `FieldCssClassProvider` that you can use to override the default CSS class that blazor applies to input control when validation error occures.

# FieldCssClassProvider

>Supplies CSS class names for form fields representing their validation state or other state information from an EditContext.

Let's create a simple demo to understand this; as shown in the image below, I have added two custom classes, one for error and one for success.


![](https://blogger.googleusercontent.com/img/a/AVvXsEgZufpGKmScUej2LB3GabR3eWjeCBA7g0J6ThHl6e_PuRcniAsBZvQ0E96-r0KPPtopQ1aJ7FCo4PqCJG9dRdZeGmkT75cLo6zp-7kSOnugU8Dn13F6TIvnMVlmGPTYDni3Ls9X80dL7WE0tHzMrqZKzr4ZwJx_43Vg0pyxXwsvCOh5cw8UZAIrylPDsw=w640-h282)

To override the CSS, follow these steps.

- Create a model class and add the required `DataAnotation`; as you can see, I have added Required and Range

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

-  In the edit form, replace `Model` with the private instance of `EditContext.` 

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

- Create a `CustomCssProvider` class; you can name it anything and inherits it from the `FieldCssClassProvider` class and return the CSS classes that you want to use
- After that  set the _editContext.SetFieldCssClassProvider(new CustomCssProvider());

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

>_Main.razor

```html
<h1>CodeGuru-Demo</h1>
<Form/>
@code {

}
```
## CustomCss Class Demo


<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/mGuVEJET30quO2gu35?editor=true&result=true&errorList=false"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3NzkxOTI0NDYsLTg1ODk2OTA1MSwtMz
QxNDM1MzkzLC0xOTEyNzQ0MDg4LC00MDc3NzAxODMsOTMwMzUw
NTU5XX0=
-->