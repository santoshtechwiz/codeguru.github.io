>Node.js is an open-source, cross-platform runtime environment for server-side and networking applications. Node.js applications are written in JavaScript and can be run within the Node.js runtime on OS X, Microsoft Windows, Linux and FreeBSD.

Node.js provides an `event-driven architecture` and a `non-blocking I/O API` that optimizes an application's throughput and scalability. These technologies are commonly used for real-time applications.
Node.js uses the Google V8 JavaScript engine to execute code, and a large percentage of the basic modules are written in JavaScript. Node.js contains a built-in library to allow applications to act as a Web server without software such as Apache HTTP Server or IIS.

In this article, I will show how to stream a large file using node.js

```javascript
var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    var newFile = fs.createWriteStream("x.wmv");
    var fileBytes = req.headers['content-length'];
    var uploadedBytes = 0;
    req.pipe(newFile);
    req.on('data', function(chunk) {
        uploadedBytes += chunk.length;
        var progress = (uploadedBytes / fileBytes) * 100;
        res.write("progress:" + parseInt(progress, 10) + "\n");
    });
    res.write("Done");

}).listen(8888);
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIxMDQ2ODIwMjBdfQ==
-->