
VS Code (Visual Studio Code) is a free editor from Microsoft, which is very popular nowadays. Visual studio code supports almost all language from code compilation, IntelliSense to debugging. The best part of the VS Code is extensions. VS Code has a vast collection of extensions; one of them is  `REST`  Client extensions which allows sending a request to REST API without leaving the editor.  
In this article, I will show you how to use  `REST Client`  extensions in the VS Code

> Create a file named  rest.rest

### Make Get Request

Then use the following syntax to make a GET request

```bash
GET http://localhost:3000/book
```
Once you type the above text in the  `rest.rest.`  file. REST client will show you  `send request`  link as shown in the below figure

[![](https://1.bp.blogspot.com/-e3EO250w5MI/XrT7TJ-u22I/AAAAAAAAMis/Hh40NPfPNdY3EHrMqhVRlVwm7TGXfTuiACK4BGAsYHg/s320/rest_cl.png)](https://www.blogger.com/blog/post/edit/6673695286148904603/3417254856085953475#)

  

### Make a post request

To make a post request use the following code snippet.

```bash
POST  http://localhost:3000/book
Content-Type: application/json
{"name":"codeguru","isbn":"99999"}

```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1NTIyNDE3ODcsNzk2Mjg2NDgxXX0=
-->