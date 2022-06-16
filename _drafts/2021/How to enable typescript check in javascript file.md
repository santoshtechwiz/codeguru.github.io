
In this post, I will show you how to enable typescript type checking in in JavaScript file.`

Let's suppose you have the following file code in javascript.

``` javascript
var a=10;
console.blog('Hello World');
```
You can see the second line is `console.blog` which is not a valid function also you can see there is no error shown in the editor.

[<img src="https://i.imgur.com/1trDmcb.png" height="100" width="100%"/>](https://i.imgur.com/1trDmcb.png)

If you want typescript to check your file for error(s), you can enable it by simpling adding the following line at the top of your file
``` javascript
//@ts-check
```
once you add the above line in your file, you will immediately see the error that `blog` is a not function on `console`. See the below image for the error message.







[<img src="https://i.imgur.com/yYvauft.png" height="100" width="100%"/>](https://i.imgur.com/yYvauft.png)





<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGFnczogJ1RpcHMmVHJpY3MsSmF2YX
NjcmlwdCdcbiIsImhpc3RvcnkiOlsyNDQ5MzQ3NzNdfQ==
-->