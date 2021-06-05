![Imgur](https://i.imgur.com/2C8tCgo.jpg)
## How to automatically subscribe and unsubscribe an Observable in Angular
There are several ways to unsubscribe the `Observable` in Angular, but the best way to unsubscribe is by using `async` pipe.
  The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has emitted. When the component gets destroyed, the `async`pipe unsubscribes automatically to avoid potential memory leaks.
  ``` javascript
@Component({
template: `
<div>
Interval: {{observable$ | async}}
</div>
`
})
export  class AppComponent implements OnInit {
observable$
ngOnInit () {
this.observable$ = Rx.Observable.interval(1000);
}
}
```
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IEhvdyB0byBhdW9tYXRpY2
FsbHkgc3Vic2NyaWJlIGFuZCB1bnN1YnNjcmliZSBhbiBPYnNl
cnZhYmxlIGluIEFuZ3VsYXJcbiIsImhpc3RvcnkiOlstMTQ2Mz
gwODYxOF19
-->