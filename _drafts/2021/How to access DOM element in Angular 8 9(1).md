
![Imgur](https://i.imgur.com/lbG85qP.png)
In this post, I will show you how to access the `DOM` element in Angular 8,9.
For this tutorial, I am using `stackbliz` online cloud editor. 
Create a new application in stackbliz and then open the ==app.component.html== and add following code snippet
``` HTML

<input type="text" value="code Guru">
```
To access the `input` element in the component we need to create a `template reference` variable in the html. To create a template reference variable in angular add any name with prefix `#`
``` html
<input type="text" value="code Guru" #text>
```
Now to access this element in component we will use angular api `ViewChild`


**For this tutorial I am going to access the input element and will set the `focus` when component load in the browser**

## What is ViewChild

`ViewChild` provide the reference to the DOM or component declared in the template. To initialize or modifying the element/component, we used `ngAfterViewInit` life cycle hook event.

Now open the ==app.component.ts== file and import `ViewChild` from the `@angular/core`
``` javascript
import {ViewChild} from '@angular/core'
```
The syntax for `ViewChild` decorator is:
```
@ViewChild([#template-reference ], {read: [reference type]});
```
**read** -  Specify what kind of element you are trying to inject like template reference,component or directive
**static** - True to resolve query results before change detection runs, false to resolve after change detection. Defaults to false.

``` javascript
import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("text", { read: ElementRef }) text: ElementRef;

  ngAfterViewInit() {
    console.log(this.text.nativeElement);
    this.text.nativeElement.focus();
  }
}
```
== DEMO==
<iframe src="https://stackblitz.com/edit/codeguru-dom?embed=1&file=src/app/app.component.ts&view=preview" width='500' height='400'></iframe>


<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGFnczogQW5ndWxhclxuIiwiaGlzdG
9yeSI6WzE3MDY0MzY3ODNdfQ==
-->