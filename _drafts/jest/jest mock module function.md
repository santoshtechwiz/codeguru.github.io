Jest is a JavaScript testing framework maintained by Facebook, Inc. designed and built by Christoph Nakazawa with a focus on simplicity and support for large web applications. It works with projects using Babel, TypeScript, Node.js, React, Angular, Vue.js and Svelte.  [Wikipedia](https://en.wikipedia.org/wiki/Jest_(JavaScript_framework))

In this post, I will show you an easy way to automatically mock all the function of the module. By the end of this tutorial, you will learn the following things.

-   How to mock a module automatically
-   How to check the function is the mock function
-   How to assert on the mock function

To show the demo I am using the following simple javascript module

```javascript
const utils = {
  getJSON: (data) => JSON.stringify(data),
  isAuthorized: (secret) => secret === "codeguru"
};

module.exports = utils;

```

As you can see the module have two functions  `getJSON`  and  `isAuthorized`  now we are going to write the test for this module.

One way is to load the module and then mock the function manually. But there is a better way to mock the module in  `Jest`. Just add the  `jest.enableAutomock`  on the top of your test file and then load your module as shown in the following code snippet.

```javascript
jest.enableAutomock();
const utils = require("./main");

```

Just by adding  `enableAutomock`  jest will provide the mock version of the function in your test.

```javascript
jest.enableAutomock();

const utils = require("./main");

describe("automatic mocks", () => {
  it("should mock all methods of utils", () => {
    expect(utils.getJSON.mock).toBeTruthy();
      expect(jest.isMockFunction(utils.isAuthorized)).toBeTruthy();
  });

  it("mocked implementation", () => {
    utils.getJSON.mockReturnValue(123);
    expect(utils.getJSON({ name: "test" })).toBe(123);
  });
});

```

As you can see now every function have a  `mock`  property and now you can use all the mock functionality of jest on your function
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTMzMTE2Nzk1OV19
-->