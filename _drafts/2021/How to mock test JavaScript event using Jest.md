
>Jest is a JavaScript testing framework maintained by Facebook, Inc. designed and built by Christoph Nakazawa with a focus on simplicity and support for large web applications. It works with projects using Babel, TypeScript, Node.js, React, Angular, Vue.js and Svelte. [Wikipedia](https://en.wikipedia.org/wiki/Jest_(JavaScript_framework))

In this post, you will learn how to mock Javascript event in Jest.

Let's start the tutorial. Suppose you have following javascript function
```javascript
module.exports = {
  init: function () {
    document.addEventListener("DOMContentLoaded", () => {
      this.instance();
    });
  },
  instance: function () {
    console.log("Instance method called");
  }
};
```
You can see we are calling the `instance` method when the document is loaded.
Let's write the test case for the above function using jest.


```javascript
import eventModule from "./event";

test("It should pass", () => {
  const instanceMock = jest.spyOn(eventModule, "instance");
  document.addEventListener = jest
    .fn()
    .mockImplementationOnce((event, callback) => {
      callback();
    });
  eventModule.init();
  expect(document.addEventListener).toBeCalledWith(
    "DOMContentLoaded",
    expect.any(Function)
  );
  expect(instanceMock).toBeCalledTimes(1);
});
```
As you can see the I am mocking document.addEventListener using jest and then asserting on the spy function.

Happy Coding :)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQ5ODQyNTgyNSwtMTEyMzcwNzcyNV19
-->