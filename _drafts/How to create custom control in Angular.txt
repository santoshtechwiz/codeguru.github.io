>Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations
In this article, I will show you how to create a custom control in Angular, which we can use as reactive form control.
Angular provides a lot of extensibility feature for extending the behaviour of the Angular framework. 
To create custom control we need to implemented [`ControlValueAccessor`]([https://angular.io/api/forms/ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor)) interface which have following four method
```javascript
interface ControlValueAccessor {
  writeValue(obj: any): void
  registerOnChange(fn: any): void
  registerOnTouched(fn: any): void
  setDisabledState(isDisabled: boolean)?: void
}
```


For this article, I am going to create a custom spinner control.

>  Create an angular application by executing the following command
```bash
ng new app_name
```
> Then create a component called `SpinnerControl` and paste the following code. All the code is self-explanatory.

```javascript
import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-number",
  template: `
    <div class="container">
      <div class="left">
        <input
          class="number-input"
          [value]="value"
          type="number"
          [disabled]="disabled"
        />
      </div>
      <div class="right">
        <button (click)="onIncrement()">+</button>
        <button (click)="onDeincrement()">-</button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        padding: 0px;
      }
      .right {
        display: flex;
        flex-direction: column;
      }
      .number-input {
        height: 40px;
      }

      button {
        height: 20px;
        width: 20px;
        border: 0px;
        background-color: #aa33dd;
      }
    `
  ]
})
export class SpinnerControl implements ControlValueAccessor {
  @Input()
  public value: number;
  @Input()
  public disabled: boolean;

  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(val): void {
    console.log(val);
    this.value = +val || 0;
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  numberChange($event) {
    this.onTouched();
    this.onChanged($event.target.value);
    this.setDisabledState(this.disabled);
  }

  onIncrement() {
    this.value = this.value + 1;
    this.onChanged(this.value);
  }

  onDeincrement() {
    this.value = this.value - 1;
    this.onChanged(this.value);
  }
}

```

| Method Name                                                      | Description                                                                          |
|------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| writeValue                                                       | Write a new value to the element                                                     |
| registerOnChange                                                 | Is called when the control values changes in the UI                                  |
| registerOnTouched                                                | StartFragmentIs called by the forms API to update the form model on blur EndFragment |
| new Date (year, month, day, hours, minutes, seconds, milliseconds | Based on Date and time                                                               |

### How to use?
Before using this custom reactive form control, you have to register this with angular providers array. See the below code for registration

```javascript
providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpinnerControl),
      multi: true
    }
  ]

```
> Final code looks like below.
```javascript
import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-number",
  template: `
    <div class="container">
      <div class="left">
        <input
          class="number-input"
          [value]="value"
          type="number"
          [disabled]="disabled"
        />
      </div>
      <div class="right">
        <button (click)="onIncrement()">+</button>
        <button (click)="onDeincrement()">-</button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        padding: 0px;
      }
      .right {
        display: flex;
        flex-direction: column;
      }
      .number-input {
        height: 40px;
      }

      button {
        height: 20px;
        width: 20px;
        border: 0px;
        background-color: #aa33dd;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpinnerControl),
      multi: true
    }
  ]
})
export class SpinnerControl implements ControlValueAccessor {
  @Input()
  public value: number;
  @Input()
  public disabled: boolean;

  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(val): void {
    console.log(val);
    this.value = +val || 0;
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  numberChange($event) {
    this.onTouched();
    this.onChanged($event.target.value);
    this.setDisabledState(this.disabled);
  }

  onIncrement() {
    this.value = this.value + 1;
    this.onChanged(this.value);
  }

  onDeincrement() {
    this.value = this.value - 1;
    this.onChanged(this.value);
  }
}
```

### What is `forwardRef`
From [Angular's API docs on  `forwardRef`](https://angular.io/api/core/forwardRef):

> `forwardRef` is used when the token which we need to refer to for the purposes of DI is declared, but not yet defined. It is also used when the token which we use when creating a query is not yet defined.

In simple terms, Angular compiler uses the function to provide the provider type during runtime.

DEMO
<iframe src="https://stackblitz.com/edit/codeguru-control-value-accessor?ctl=1&embed=1" height="100%"
width="100%"/>
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc4NzEyMDU3MywtMTc5OTEwMzkxNCw2Mj
I4ODE5MjEsMTU2OTQ2NTMxOSwxNzI2ODQ0MDA1LC0xMzgyNTYw
NzNdfQ==
-->