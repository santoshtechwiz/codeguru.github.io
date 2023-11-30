
Jest is a JavaScript testing framework maintained by Facebook, Inc. designed and built by Christoph Nakazawa with a focus on simplicity and support for large web applications. It works with projects using Babel, TypeScript, Node.js, React, Angular, Vue.js and Svelte. [Wikipedia](https://en.wikipedia.org/wiki/Jest_(JavaScript_framework))

In this post, you will learn the following thing
- How to use mock
-  How to mock Jquery selector
-  How to assert on mock
Let's start. Let's suppose you have the following javascript function

```javascript
 const save = ($) => {
    if (!$('#button').hasClass('expanded')) {
    }
      $('#button').addClass('expanded');
    } else {
      $('#button').removeClass('expanded');
  }
  ```
  As you can see the function is dependent on `Jquery($)` object.Now either you can pass the real jquery object or you can jest powerpull feature mocking. In this post I will show you how to mock Jquery and write test for the above function
```javascript
describe( 'Hide show on click of button', () => {
	const addClass = jest.fn();
	const removeClass = jest.fn();
	const hasClass = jest.fn(className => {return true;});

	const jQuery = jest.fn(() => ({
		addClass,
		removeClass,
		hasClass
	}));


	it( 'removes class when has class', () => {
		save(jQuery);
		expect(addClass.mock.calls.length).toBe(0);
		expect(removeClass.mock.calls.length).toBe(1);
	});
});
```
In the above code, you can see that I am creating a jquery mock object with the required method needed by the `save` function and then by asserting on the mock call.

Happy Coding :)

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQzMDY3NjgyOV19
-->