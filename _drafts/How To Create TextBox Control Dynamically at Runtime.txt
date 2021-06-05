In Technique when creating control dynamically in a Page Load event handler these controls will retain their ViewState after the `PostBack`, but what if controls created dynamically at runtime in a Button Click event handler instead of Page Load event then on PostBack these controls `ViewState` are lost. To persists the 
ViewState of these child controls we will recreate these controls again on a  PostBack in overrideable `CreateChildControls()` method   which is called whenever 
ASP.NET needs to create these WebControl in a Control Tree. 
```csharp
 // Add TextBoxes Control to Placeholder 

private void CreateTextBoxes()
  {

      for (int counter = 0; counter <= NumberOfControls; counter++)
      {
          TextBox tb = new TextBox();
          tb.Width = 150;
          tb.Height = 18;
          tb.TextMode = TextBoxMode.SingleLine;
          tb.ID = "TextBoxID" + (counter + 1).ToString();
          // add some dummy data to textboxes
          tb.Text = "Enter Title " + counter;
          phTextBoxes.Controls.Add(tb);
          phTextBoxes.Controls.Add(new LiteralControl("<br/>"));

      }

  }
```
  

In `CreateTextBoxes` method I loop through ‘n’ numbers of controls that we wants to create dynamically in phTextBoxes placeholder.
```csharp
// Create TextBoxes on PostBack. 
protected override void CreateChildControls()
  {
      // Here we are recreating controls to persist the ViewState on every post back
      if (Page.IsPostBack)
      {
          NumberOfControls += 1;
          CreateTextBoxes();
      }
      else
      {
          CreateTextBoxes();
          // Increase the control value to 1
          NumberOfControls = 0;
      }

  }
```
`CreateChildControls` method, here we are recreating control on every PostBack. If the page is created the first time, we just create these controls and save 1 in the `ViewState`, so we know that we have created
these controls and assigned the id of the control to 1.  

// Increase the counter when button is clicked and add to view state  
```csharp
protected void btnAddTitle_Click(object sender, EventArgs e)
  {
      NumberOfControls += 1;
  }
```
  
In the button event handler, we just increase the counter by one and save its value to ViewState for later retrieval. Once we have created these controls on ASP.NET page, retrieving data from these dynamically created controls is easy by using the FindControl method.

// Read TextBoxes Data

```csharp
public int NumberOfControls
   {
       get
       {
           if (ViewState["Count"] == null)
           {
               return 0;
           }
           return (int)ViewState["Count"];
       }
       set
       {
           ViewState["Count"] = value++;
       }
   }

   private void ReadTextBoxes()
   {
       strValue = string.Empty;
       int n = NumberOfControls;

       for (int i = 0; i <= NumberOfControls; i++)
       {

           string boxName = "TextBoxID" + (i + 1).ToString();
           TextBox tb = phTextBoxes.FindControl(boxName) as TextBox;
           strValue += tb.Text + "\n";
       }
       Response.Write(strValue);


   }
   ```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQxNTQyODgwM119
-->