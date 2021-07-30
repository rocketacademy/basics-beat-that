# Rocket Academy Coding Basics: Beat That!

Some learnings from working on the project.

## Global Variables

Do not use global variables as parameters for functions. Call the global variable within the function because when you want to update the global variable and it is used as a parameter in a function, the update only happens within the function.

## Array Max/Min

[w3schools](https://www.w3schools.com/js/js_array_sort.asp)

JavaScript does not have built in functions for finding the max or min value in an array, but `Math.max()` can return the max value of an array through the following function.

```javascript
function myArrayMax(array) {
  return Math.max.apply(null, array);
}
```

## Array Numeric Sort

[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

For numeric sort, create a compare function within the sort method.

```javascript
let numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
```

If an array contains objects, the objects can be sorted based on the objects' properties. Sort stability: if there is a match, the order will remain in the same order before calling the sort.

```javascript
const students = [
  { name: "Alex", grade: 15 },
  { name: "Devlin", grade: 15 },
  { name: "Eagle", grade: 13 },
  { name: "Sam", grade: 14 },
];

// Sort students by grade in ascending order
students.sort((firstItem, secondItem) => firstItem.grade - secondItem.grade);

[
  { name: "Eagle", grade: 13 },
  { name: "Sam", grade: 14 },
  { name: "Alex", grade: 15 }, // original maintained for similar grade (stable sorting)
  { name: "Devlin", grade: 15 }, // original maintained for similar grade (stable sorting)
];
```

## Array Find Object in Array using Properties

[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find#find_an_object_in_an_array_by_one_of_its_properties)

Find an object in an array through one of its properties.

```javascript
const inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 },
];

const result = inventory.find(({ name }) => name === "cherries");

console.log(result); // { name: 'cherries', quantity: 5 }
```

## Find Duplicate Values in an Array

## Objects

Used objects to represent players in an array to retain their identities to allow players to be displayed in a leaderboard in descending or ascending order.

## For Loops

[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for...in_statement)

Although JavaScript allows `for...in` statement, it is not recommended to use this to iterate over an array because it will also return user-defined properties or methods of the array.

## Nested For Loops

Use different counters for nested for loops.
