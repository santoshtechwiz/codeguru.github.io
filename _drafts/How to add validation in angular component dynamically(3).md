In this post, I will show you how to add validation to angular component dynamically.
Sometimes we need to show the control based on the user selection. For this post I have created a simple project in which there are two controls one is textbox and another is checkbox. When the user click on the checkbox we will add the required validation to textbox

![Imgur](https://i.imgur.com/aeeD6cl.png)
![Imgur](https://i.imgur.com/maH8M76.png)

Let's start the tutorial.

  Create an application using `angular-cli`
``` bash
ng new dynamic-validation
```
Open `app.component.htm` and add following markup

``` html

<h2>Add validation</h2>

<div class="row">
	<form [formGroup]="form">
		<div class="form-group">
			<label for="email">Email</label>
			<input type="text" class="form-control"  id="email" formControlName="email">
			<div class="alert alert-danger"
				*ngIf=" form.get('email').touched && form.get('email').errors && form.get('email').errors.required">
				Email is required
			</div>


		</div>
		<div class="form-group">
			<div class="form-check">
				<input class="form-check-input" formControlName="isRequired" (change)="addValidation()" type="checkbox" id="gridCheck">
				<label class="form-check-label" for="gridCheck">
      Email Is Required
      </label>
			</div>
		</div>

		<input type="button" class="btn btn-success" value="Submit" [disabled]="!form.valid">
</form>
</div>
```
After that open `app.component.ts` file and add following code

``` javascript
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  form: FormGroup;
  constructor() {
    this.createForm();
  }
  ngOnInit() {}
  addValidation() {
    const emailCtrl = this.form.get("email");
    const val = this.form.get("isRequired").value;
    if (val === true) {
      emailCtrl.setValidators([Validators.required]);
    } else {
      emailCtrl.clearValidators();
    }
    emailCtrl.updateValueAndValidity();
  }
  createForm() {
    this.form = new FormGroup({
      email: new FormControl(),
      isRequired: new FormControl(false)
    });
  }
}
```
**DEMO**
<iframe width="100%" frameborder="0" src="https://stackblitz.com/edit/codeguru-dynamic-validation?embed=1&file=src/app/app.component.ts" height="400"></iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbMzY1OTQ3NDU5XX0=
-->