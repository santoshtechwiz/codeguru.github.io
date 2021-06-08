You can use a 'init' accessor instead of a `set` accessor to declare a property in C# 9. Only an object's initializer can set init-only properties, which are generally read-only:

Large immutable classes can be created with init-only properties rather than the anti-pattern of writing a function Object() { [native code] } with thousands of optional parameters
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgzNTE1ODI4MCw3MzA5OTgxMTZdfQ==
-->