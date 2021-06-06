
You must have came across some .css issues related with the browser behavior. Some of the styles that works in IE doesn't work in FireFox. In that situation you need to write conditional code for both browsers.

Below is the sample code that demonstrate how to write conditional statement tin CSS.
```html
<html>
   <head>
       <title>Conditional CSS</title>
       <style type="text/css">
           body
           {
               color:blue;
           }
       </style>
      <!--[if IE 7]>
		 <style type="text/css">
		 body {
		 background-color:red;
		 }
		 </style>
		 <![endif]-->
   </head>
   <body>
       <p>
           Conditional CSS
       </p>
   </body>
</html>
```

If you copy-paste above code as an .html file and browse into IE 7, you will get the background color of the page as red and color of the text as blue but if you will browse the same page in FireFox, the background property of the body tag will not be applicable and it will be default (white) while you will see the color of the text as blue as you were seeing into IE 7. This is because the color of text has been specified as default style while the background is written as conditional statement.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwNjY2NjY2MjYsMTUyMzM5MTExMCwtMT
QyOTk2MjE5NCw2NDc5NzU2MTYsLTE1MDIyODUyODZdfQ==
-->