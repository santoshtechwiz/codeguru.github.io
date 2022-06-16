# JEST
Jest is a JavaScript testing framework maintained by Facebook, Inc. designed and built by Christoph Nakazawa with a focus on simplicity and support for large web applications. It works with projects using Babel, TypeScript, Node.js, React, Angular, Vue.js and Svelte. [Wikipedia](https://en.wikipedia.org/wiki/Jest_(JavaScript_framework))

##  What is `IntersctionObserver`?
The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport

In this tutorial you will learn how to mock ==IntersectionObserver== using `JEST`

For the tutorial I have prepared a simple javascript function that uses IntersectionObserver API.
There are two function in the module `loadItems` and `init`. Init function is listing for the IntersectionObserver and when the `intersectionRatio` became more than 0 it's trigger the `loadItems` function.

==main.js==
```javascript 

const InfiniteScroll = (() => {

  loadItems = (n) => {
    // DO SOMETHING MEANINGFULL
    console.log(n);
  }

  init = (sentinel) => {
    var intersectionObserver = new IntersectionObserver(function(entries) {
      if (entries[0].intersectionRatio <= 0) {
        return;
      }
     exports.loadItems(10);
    });
    intersectionObserver.observe(sentinel);
  }

  const exports = {
    loadItems,
    init,
  };
 
  let sentinel = document.querySelector('#sentinel');
   module.exports = exports;
  return data;
})();

```

In order to test the above module we need to mock `IntersectionObserver` and documetn `querySelector` method. Below is the mock version of `IntersectionObserver`. You can see I am mocking three functions

- observer
- unobserve
- takeRecrods


``` javascript
const observe = jest.fn();
    const unobserve = jest.fn();

    global.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
      takeRecords: jest.fn(),

    }))
 ```
Now it's time to mok document `querySelector` method. Here I am spying on the `querySelector` method and returning a javascript object which have all the property required to trigger the IntersectionObserver.

```javascript
 jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      switch (selector) {
        case '#sentinel':
          return mockedEntries;

      }
    });
  ```

==main.test.js==
```javascript


const API = require('./main');

const $ = require("jquery");
describe("IntersectionObserver Test", () => {


  it('It should called', () => {
    const observe = jest.fn();
    const unobserve = jest.fn();

    global.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
      takeRecords: jest.fn(),

    }))
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      switch (selector) {
        case '#sentinel':
          return mockedEntries;

      }
    });
    const mockedEntries = {
      intersectionRatio: 10,
      boundingClientRect: {
        x: 10,
        y: 20,
        width: 30,
        height: 40
      }
    };
    API.loadItems = jest.fn();
    jest.spyOn($.fn, "init").mockReturnValueOnce(mockedEntries);
    API.init($("#sentinel"));
    const observerCallback = window.IntersectionObserver.mock.calls[0][0]
    observerCallback([mockedEntries])
    expect(API.loadItems).toHaveBeenCalledTimes(1);
  })
});
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3NTYyNTE1MDAsMTkwNDI4NzU2NCwtMT
IzNTg0OTAyOV19
-->