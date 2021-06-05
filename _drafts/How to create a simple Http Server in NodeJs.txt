>Node.js is an open-source, cross-platform runtime environment for server-side and networking applications. Node.js applications are written in JavaScript and can be run within the Node.js runtime on OS X, Microsoft Windows, Linux.

`Node.js` uses the `Google V8` JavaScript engine to execute code, and a large percentage of the basic modules are written in JavaScript. `Node.js` contains a built-in library to allow applications to act as a Web server without software such as Apache HTTP Server or IIS.  
In this article, I will show you how to create a simple Http Server using node.js Before diving into code, let us first install node.js from the following link.

[Learn More](https://nodejs.org/)

- Once the node.js installed. Open the terminal window and type following command.
```bash
node –version
```
[![image](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2Flh3.googleusercontent.com%2F-wTqV2_3RNo8%2FVcuCmV4F3PI%2FAAAAAAAADMM%2F7xQOkkjFffI%2Fimage_thumb%2525255B1%2525255D.png%3Fimgmax%3D800&container=blogger&gadget=a&rewriteMime=image%2F* "image")](http://lh3.googleusercontent.com/-XWtUIJTJfrk/VcuCliu93FI/AAAAAAAADME/m4eZs8LXNrE/s1600-h/image%25255B3%25255D.png)

*If you see similar output then node.js is installed on your machine.*

- Open any text editor and paste following code into it and save it as Sever.js.
```javascript
var http = require("http");

function requestHandler(req, res) {

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write("Hello world");
	//end the response
	res.end();

}
//Create http server
var server = http.createServer(requestHandler);
server.listen(8000, function () {
	console.log("Server is up and running");
})
```
- open command prompt and type following command.
```bash
node Server.js
```
[![image](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2Flh3.googleusercontent.com%2F-j4Vz_nITi28%2FVcuCno9qMiI%2FAAAAAAAADMc%2F1uilMi2IaEI%2Fimage_thumb%2525255B3%2525255D.png%3Fimgmax%3D800&container=blogger&gadget=a&rewriteMime=image%2F* "image")](http://lh3.googleusercontent.com/-k6Ob1YgQLR8/VcuCmwSvIvI/AAAAAAAADMU/_no9K339Q-Y/s1600-h/image%25255B7%25255D.png)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTkzNDkxNDUzNV19
-->