This blog post I will discuss everything about EditContext. EditContext is the brain of Form Validation. As per the microsoft `EditContext`  Holds metadata related to a data editing process, such as flags to indicate which fields have been modified and the current set of validation messages.

Let's start with the below diagram describing how Blazor maintains a meta-state for form data.


![](https://blogger.googleusercontent.com/img/a/AVvXsEg0y5i62UyRyqzsBNnMMRafHgijAYsk1TaOWb8EuurNU4UyVipPP5ZUgPzOLzdtTjaUuCqPgn657XZpCts-ilqLRhjXpmULNig1msUJIW0imSqBoUY4BhdzJiu_R5KnYsqivOfVCJN02eUsSkUhl2Vv0Fd-I681eJJhmLV8FxLvCzutWRy9vPYv-g8Hnw=w459-h640)


## EditContext

Whenever the  `EditForm.Model`  changes (the object being modified in the form),  `EditForm.OnParametersSet`  is executed and creates a new  `EditContext`  instance. The  `EditForm`  component declares this  `EditContext`  as a  `[Cascading value]`  so that any components within the form can access it.

The  `EditContext`  is a form-meta-data holder for the object currently being edited. When editing an object –  in a form, Blazor needs to know additional information about that object to give a richer user experience. The additional information held by Blazor tells us:

-   If a specific property of the Model has been manually altered.
-   Which model properties have validation errors, and what those errors are.

> EditForm creates a new EditContext whenever its Model changes. If the Model changes, then the data held in the EditContext is no longer relevant.



## What is FieldIdentifier?

A' FieldIdentifier' aims to provide an identity for a specific property on an object. 

## FieldState

The  `FieldState`  class holds additional information about any object’s property. The  `EditContext`  class has a private property of type  `Dictionary<FieldIdentifier, FieldState>`  – this lets Blazor store its additional state in a flattened list for quick access.

```csharp
@page "/form"
@using EditContextDemo.Data
<h3>FromDemo</h3>
<EditForm EditContext="_editContext" OnValidSubmit="Callback">
    <div>
        <label for="FirstName">FirstName</label>
        <InputText @bind-Value="person.Name"></InputText>
    </div>
    <div>
        <label for="Age">Age</label>
        <InputNumber @bind-Value="person.Age"></InputNumber>
    </div>
    <input type="submit" value="Save" />
</EditForm>

@code {

    Person person = new Person();
    private EditContext _editContext;
    protected override void OnInitialized()
    {
        person.Name = "demo";
        person.Age = 12;
        _editContext = new EditContext(person);

    }

    private void Callback()
    {
      
    }
}

```
If you run the above application and enter some value in the name filed and click on the submit button then you will see that EditContext keep track of the filed that is modifed in our case name field

![](https://blogger.googleusercontent.com/img/a/AVvXsEg8IxIDdA4ZtvdiPfA7qZDt1kNxZjej-rarfub4uQm0RWH5wCtPEnc-NleSU78nxomcoLaxU9BDCVNLcFQFih_WpcgxFZ6Da39q1Al2TmwF1VOKb0E89nRGjf7hsXShAlSVZ1ArvOaWsPUO2DZIsd33zNLTd5-oqjMlxv5K5DP0dTK-HKGuZuuPoV_40g=w640-h342)

### FieldState Demo

<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/QwEBYqPF49pLjqtv36?editor=true&result=true&errorList=false"></iframe>




## How to Retrive All Error Messages from the EditContext
If you want to access all the error messages then you can get it by using following method call

```csharp
 _errors = _editContext.GetValidationMessages();
 ```

## How to know when the input value has changed

If you want to detect when the input value has changed you can subscribe to `EditContext` `OnFieldChanged` event and get the information


```csharp
  _editContext.OnFieldChanged += EditContext_OnFieldChanged;
  ```


<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk1MTQxMTE2MCwtMTM3NzQ5NTYyOSw3MT
gwNjEwNjgsMjQ0Njk0NjgsLTg5NzIwNjk2NCwtMTI0NTQ1NDE5
NCwtMTgxMjU3ODEyNiwtNTY2NzEyNjczLC0yMDg5MDEyODQyLD
E2NTE0Nzk4NTBdfQ==
-->