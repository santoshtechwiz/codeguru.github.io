In this post, I will show you how to convert string to base64 and vice versa.
### What is base64 Encoding

>  Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation
### When to use Base64
When the transmission medium supports only printable characters like SMTP
javascript has two in-built functions for encoding and decoding base64 string
## bota(string)/ Binary To ASCII
This function takes a string as input and converts it to `base64`. For example, if you want to convert `Javascript` to base64 string you can use `atob` function as shown below

``` javascript
const result=btoa('javascript')
// OUTPUT
SmF2YXNjcmlwdA==
```
## atob(base64 string) /ASCII to binary 
This function takes base64 encoded string as a input convert it to string

``` javascript
const result=atob('SmF2YXNjcmlwdA==');
// OUTPUT
Javascript




<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI1MjM0MzkxMF19
-->