In this article, I will show you how to copy text to the clipboard without using any third-party library.


```html
<html>

<head>
    <script>
        function copyToClipboar() {
            /* Get the textarea */
            var copyText = document.getElementById("clipText");

            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/

            /* Copy the text inside the text field */
            document.execCommand("copy");

            /* debug */
            // alert("Copied the text: " + copyText.value);
        }
    </script>
</head>

<body>
    <textarea id='clipText'>
        Enter Text And Click Button To Copy Text To ClipBoard</textarea>
    <br />
    <input type="button" onclick="copyToClipboar()" value="Copy" />

</body>
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTYzOTQ4Njg1Nl19
-->