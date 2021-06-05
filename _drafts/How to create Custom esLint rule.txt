

 In this post I will show you how to create custom eslint rule using ESLint plugin.
 
# What are ESLint Plugins

It's an extension for ESLint that will enforce rules, that are not implemented into the ESLint core. For example, if you want to force that no body should use `alert` in there code you can write your own plugin to force this rule.

## A simple rule

Let's suppose you want to restrict the use of template literal in your code (Not very useful maybe, but for demonstration purposes of this guide, it will suffice.)


``` javascript
const a=`Hello world` //invalid
```
``` javascript
const a='Hello world'//valid
```

# Structure of eslint plugin

The structure of eslint plugin is as below
``` javascript
module.exports = {
    rules: {
        "rule-name": {
            create: function (context) {
                // rule implementation ...
            }
        }
    }
};
```
## Setting up our ESLint plugin

```bash
mkdir eslint-plugin-no-template-literals
cd eslint-plugin-no-template-literals
npm init -y
npm install -D eslint
```
 ## How to implement our rule
 A ESLint rule contains 2 main parts:

-   `meta`: an object where we will specify the usage of our rule.
-   `create`: a function that will return an object with all the methods that ESLint will use to parse our statement. Each method returned is an AST node.

> You can visit [AST Explorer](https://astexplorer.net/) for more information

create ``` index.js ``` file in your newly created folder and paste following code

``` javascript
module.exports = {
    rules: {
        "no-template-literals": {
            create: function (context) {
                return {
                    TemplateLiteral(node) {
                        context.report(node, 'Do not use template literals');
                    }
                };
            }
        }
    }
};
```
The above code is self explanotory. In AST template literral node is represented by ```TemplateLiteral``` eslint scan the source code of javascript and when it found the template literal it's show the error

## How to use

Once you’re done, in your project root, add the plugin as a dependency using `npm`
``` bash
npm add --dev file:./eslint-plugin-no-template-literals
```
Notice the `file:./eslint-plugin-no-template-literals` part. [This syntax](https://yarnpkg.com/lang/en/docs/cli/add/) will allow us to install a package that is on our local file system.

## Configure the newly created rule

Finally, add the plugin and rule in your `eslintrc` file. You can do that like so:

``` javascript
// eslintrc.js  
{
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [ "no-template-literals" ],
    "rules": {
        "semi": "error",
        "no-template-literals/no-template-literals": 1
    }
}
```
*remove eslint-plugin prefix*


<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU3MzIyMDM3OV19
-->