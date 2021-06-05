![Imgur](https://i.imgur.com/2C8tCgo.jpg)
## Does angular template supports if else
Yes. New Version of Angular framework support if else
Let's take an example. In the following code snippet, I am using Angular `if-else` directive to showing the user is Admin or not.

  Check the following example
``` javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div  *ngIf="isAdmin; else elseBlock">
    Admin Area
    </div> 
<ng-template  #elseBlock>
  Normal User
</ng-template>
  `,
  styles: []
})
export class AppComponent {
  isAdmin = true;
}

```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTMyODkxOTk5MF19
-->