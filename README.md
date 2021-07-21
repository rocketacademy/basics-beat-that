# Rocket Academy Coding Basics: Beat That!

Some learnings from working on the project.

## Global Variables

Do not use global variables as parameters for functions, call the variable within the function. When you want to update the global variable and it is used as a parameter in a function, the update only happens within the function.

## Array Max

JavaScript does not have built in functions for finding the max or min value in an array. [w3schools] listed a function that can return the max value of an array using `Math.max()`.

```javascript
function myArrayMax(array) {
  return Math.max.apply(null, array);
}
```

[w3schools]: https://www.w3schools.com/js/js_array_sort.asp
