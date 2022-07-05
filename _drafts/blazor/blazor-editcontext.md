# EditContext, FieldIdentifiers, and FieldState

Holds metadata related to a data editing process, such as flags to indicate which fields have been modified and the current set of validation messages.

Let’s start with a below diagram describing how Blazor maintains meta-state for form data.


![](https://blogger.googleusercontent.com/img/a/AVvXsEg0y5i62UyRyqzsBNnMMRafHgijAYsk1TaOWb8EuurNU4UyVipPP5ZUgPzOLzdtTjaUuCqPgn657XZpCts-ilqLRhjXpmULNig1msUJIW0imSqBoUY4BhdzJiu_R5KnYsqivOfVCJN02eUsSkUhl2Vv0Fd-I681eJJhmLV8FxLvCzutWRy9vPYv-g8Hnw=w459-h640)


## EditContext

Whenever the  `EditForm.Model`  changes (the object being modified in the form),  `EditForm.OnParametersSet`  is executed and creates a new  `EditContext`  instance. The  `EditForm`  component declares this  `EditContext`  as a  [Cascading value](https://blazor-university.com/components/cascading-values/cascading-values-by-type/), so that any components within the form have access to it.

The  `EditContext`  is a form-meta-data holder for the object currently being edited. When editing an object – such as a  `Person`  – in a form, Blazor needs to know additional information about that object in order to give a richer user experience. The additional information held by Blazor tells us:

-   If a specific property of the model has been manually altered.
-   Which model properties have validation errors, and what those errors are.

Clearly, the class of the model being edited should only represent our specific business needs, so having our model classes implement this additional user-interface state information would be a conflict of concerns – so Blazor stores this additional information itself within the EditContext. This is why the EditForm creates a new EditContext whenever its Model changes, because if the Model changes then the information held in the EditContext is no longer relevant.

## FieldIdentifier

The purpose of a  `FieldIdentifier`  is to provide an identity for a specific property on an object. It differs from  `System.Reflection.PropertyInfo`  because it identifies a property on a specific object instance, whereas reflection identifies a property on a class.

Given an  `Address`  class with a property named  `PostalCode`, we can expect the following equality rules:
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwODkwMTI4NDIsMTY1MTQ3OTg1MF19
-->