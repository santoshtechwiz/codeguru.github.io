![Imgur](https://i.imgur.com/2C8tCgo.jpg)
## How to optimize Angular app?

  

- Consider lazy loading instead of fully bundled app if the app size is more.

- Make sure that any 3rd party library, which is not used, is removed from the application.

- Have all dependencies and dev-dependencies are separated.

- Make sure the application doesn’t have un-necessary import statements.

- Make sure the app is bundled, uglified, and tree shaking is done.

- Consider the AOT compilation.
- Enable `Production Mode`

	``` javascript
		if (environment.production) {
			    enableProdMode();
		}
		```
-  Use `async` pipe because it's automatically unsubscribe the `Observable` once the component is destroyes.
-  Use `pure` [pipe](https://angular.io/guide/pipes)
-  Use `Zone` for avoiding unnessery change detection when required.
		
```javascript
	export class AppComponent {
    constructor() {
        setInterval(() => console.log(new Date().getTime()), 100);
    }
}	
```
Use `NgZone`  instance methood runOutsideAngular for such type of thing
``` javascript
export class AppComponent {
    constructor(ngZone: NgZone) {
        ngZone.runOutsideAngular(() => {
            setInterval(() => console.log(new Date().getTime()), 100);  
        });
    }
}
```

		
			
			




<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IEhvdyB0byBvcHRpbWl6ZS
BBbmd1bGFyIGFwcD9cbiIsImhpc3RvcnkiOlstMTA4MTIyNTc1
XX0=
-->