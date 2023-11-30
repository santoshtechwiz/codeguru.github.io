As per the Wikipedia Angular is
>Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS

In this article I will show you how to implement `switchMap` operator which is one of the most used operator from `RxJs` library. 

## switchMap opetator
SwitchMap is a flattening operator with two observables, one outer and one inner. switchMap emit values only from the most recently projected Observable.

Let's understand this operator with real world example.Assume you want to load post from the webserver and once post is loaded you want to download all the related comments. See the below animations how switchMap works.

![](https://1.bp.blogspot.com/-tBALfDqjn0c/YLxfMim_FbI/AAAAAAAAOv0/O1xaV36oleIzZFHGB3ixWWXRyOUVNOjsgCLcBGAsYHQ/s16000/switch-map.gif)

> I am using stackbliz id for this demo

Let's create a service that load post and comments

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class PostService {
  apiURL: string = 'https://jsonplaceholder.typicode.com/posts/1';
  constructor(private httpClient: HttpClient) {}

  getSinglePost() {
    return this.httpClient.get(`${this.apiURL}`);
  }
  getAllComments(postId: number) {
    return this.httpClient.get(`${this.apiURL}/comments`);
  }
}
```

Open the `app.component.ts` and add following code.

```typescript
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/from';
import { PostService } from './postservice.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items;
  constructor(private postService: PostService) {}
  ngOnInit() {}
  ngAfterViewInit() {
    // Load Single Post
    this.postService
      .getSinglePost()
      .pipe(
        // Switch to load comments
        switchMap((res1: any) => this.postService.getAllComments(res1.id))
      )
      .subscribe(result => {
        // Finally get the result and show to page
        this.items = result;
        console.log(result);
      });
  }
}

```
The code is very simple only thing need to understand is below code. As you can see I am using `switchMap` opetator for loading the comments.

```typescript
.getSinglePost()
      .pipe(
        // Switch to load comments
        switchMap((res1: any) => this.postService.getAllComments(res1.id))
      )
      .subscribe(result => {
        // Finally get the result and show to page
        this.items = result;
        console.log(result);
      });
 ```


<iframe src='https://stackblitz.com/edit/codeguru-angular-switch-map?ctl=1&embed=1&file=app/app.component.html&hideExplorer=1&view=preview' height="500px" width="600px">
</iframe>
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIxNDU2NjIyODUsLTIwODcyMjE1ODhdfQ
==
-->