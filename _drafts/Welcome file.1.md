
[![](http://2.bp.blogspot.com/_iY3Ra2OqpkA/ScYZSSV4VWI/AAAAAAAAB7M/J4z9SnGYLZU/s400/event.jpg)](https://www.blogger.com/blog/post/edit/6673695286148904603/5985650023249548301#)In this post i will show how to create control at run time and attached event to control.

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>Untitled</title>
</head>
<body>

    <script type="text/javascript">
        function addRow() {
            var table = document.getElementById('table1');
            var TR = table1.insertRow();
            var TD = TR.insertCell();
            TD.innerHTML = 'Row added';
            TD.onclick = function() { alert('This is onclick') };
            TD.onmouseover = function() { alert('This is mouseover') };

        }
    </script>

    <table id='table1'>
    </table>
    <br>
    <input type='button' value='Add Row' onclick='addRow()' />
</body>
</html>
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTIwMzA0Njk0NiwxNDA3NTE3MzE1LC0zOD
QxMDUwMTMsLTMxNTY0ODU4OCwtODAwNTYxOTMwLC0xNzI0MjMz
Mzc2LC0xNTY1NzEzOTgzLC0yMDY2NjU1NDc1LC05Mzg1MTYyMz
gsLTMzMjQ1NTM2M119
-->