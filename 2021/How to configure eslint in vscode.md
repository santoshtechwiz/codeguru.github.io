In this post, I will show you how to configure eslint in Visual Studio Code. 

# What  is Eslint
As per the Wikipedia

> ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code. It was created by Nicholas C. Zakas in 2013. Rules in ESLint are configurable, and customized rules can be defined and loaded. ESLint covers both code quality and coding style issues
# How to configure ESLint

 #### Create a folder named `eslint-demo`
 ``` bash
  md eslint-demo
  ```
  
 #### Change directory to `eslinit-demo`
`"bash
cd eslint-demo
`"
####  Create Package.json
`"bash
npm init -y
`"
Above command will create a `"package.json``` file in the directory. Option'y' means to accept all the default.

#### Install the dependecies
Now inatall all the dependencies
``` bash
npm i -D eslint eslint-config-standard 
eslint-plugin-import eslint-plugin-node 
eslint-plugin-promise 
eslint-plugin-standard
```
#### Configure ESLint
create `.eslintrc.json` file in your project and add following code snippet
``` javascript
{
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
           },
    "rules": {}
}
```
#### Install ESLint plugin in Visual Studio Code
Open visual studio code and press `CTRL+SHIFT+X` and search eslint
![enter image description here](https://i.imgur.com/dsmc4E5.png)
Now,restart the visual studio and write some bad code and eslint will show you the errors/warnings in real time

![enter image description here](https://i.imgur.com/3PUZci5.png)


## Configuring Rules[](https://eslint.org/docs/2.13.1/user-guide/configuring#configuring-rules)

ESLint comes with a large number of rules. You can modify which rules your project uses either using configuration comments or configuration files. To change a rule setting, you must set the rule ID equal to one of these values:

-   `"off"`  or  `0`  - turn the rule off
-   `"warn"`  or  `1`  - turn the rule on as a warning (doesn't affect exit code)
-   `"error"`  or  `2`  - turn the rule on as an error (exit code is 1 when triggered)

Let's suppose you want to enable semicolon rule means you want every statement must end with a semicolon. To configure this rule open `.eslintrc.json` file and add the following code snippet to `rules` section
`"javascript
{
    "parserOptions": {
      
    },
    "extends": "eslint:recommended",
    "plugins": [ "no-template-literals" ],
    "rules": {
      "semi":"error",
        
    }
}
```
###  Enforce specifying rules to disable in  `eslint-disable`  comments
This rule makes you specify the rules you want to disable when using  `eslint-disable`,  `eslint-disable-line`  or  `eslint-disable-next-line`  comments.

If you want to disable an ESLint rule in a file or on a specific line, you can add a comment.

On a single line:
``` javascript
const message = 'foo';
console.log(message); // eslint-disable-line no-console


// eslint-disable-next-line no-console
console.log(message);
```
On the whole (rest of the) file:
``` javascript
/* eslint-disable no-console */
const message = 'foo';
console.log(message);
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjQwMTM5ODY4XX0=
-->