In this post, I will show you how to load the `Angular` component dynamically. 
### When to use 
Let's suppose you want to create a pop up then you can load the component dynamically 

Let's start the tutorial
- create a new angular application
``` bash
ng new angular-dynamic-component
```
- Remove everything from `app.component.html` and paste the following code snippet

``` html
<button (click)="loadComponent()">Load Component</button>

<div>
	<h3>Parent</h3>
	<ng-template #target></ng-template>
</div>
```
`target` is template reference variable where we will load the component

- Now open `app.component.ts` file and imporfollowing modules
``` javascript
 import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
  } from "@angular/core";
```
and then  inject `ComponentFactoryResolver` as a dependecy in the constrctuor
``` javascript
constructor(private componentFactoryResolver:  ComponentFactoryResolver)  {}
```
Now create one class property that holds the `DOM` reference
``` javascript
  @ViewChild("target", { read: ViewContainerRef, static: false })
  target: ViewContainerRef;
```

###  ViewChild 
It is used to access the `DOM` element in the parent component

### ComponentFactoryResolver
A simple registry that maps Components to generated ComponentFactory classes that can be used to create instances of components
### ViewContainerRef
If you want to insert a new component or template, you need to tell Angular where to put this element. And that's what ViewContainerRef is: A DOM element (container) where I can put your newly component as a sibling to this element.

- Now create one component named `child` in the same project 

``` bash
ng g c child
```
- Open open `child.component.html` and add following code
``` HTML
<h2>I am child component</h2>
```
Now it's time to load the component in parent component on click of a button. Open `app.component.ts` file and addfollowing code snippet  inside 
``` javascript

  loadComponent() {
    this.target.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      ChildComponent
    );
    const componentRef = this.target.createComponent(factory);
  }
  ```
  At this point, when running the application, you will get an error because we have not set the `entryComponents` in `AppModule`. We can set that as shown in the listing below:
  ``` javascript
  import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { ChildComponent } from "./child/child.component";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, ChildComponent],
  bootstrap: [AppComponent],
  entryComponents: [ChildComponent]
})
export class AppModule {}

```
<iframe  width="100%" frameborder="0" height="400px" src="https://stackblitz.com/edit/codeguru-dynamic-component?embed=1&file=src/app/app.component.ts&hideExplorer=1"></iframe>

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTIyODM3MzYyMV19
-->