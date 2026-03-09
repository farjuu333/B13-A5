What is the difference between var, let, and const? 
ANSWER:===>
var, let, and const are keywords in JavaScript used to declare variables. Their main differences are given below:
Declaration:
var is the old keyword introduced in ES5.
let and const were introduced in ES6.
Re-declaration:
var allows re-declaration of the same variable.
let and const do not allow re-declaration.
Re-assignment:
var and let allow changing the value of a variable.
const does not allow changing the value.
Scope:
var has function scope.
let and const have block scope.
Initialization:
const must be initialized at the time of declaration.
var and let can be declared without initialization.
2.What is the spread operator (...)?
ANSWER:===>
The spread operator (...) is used to expand elements of arrays or objects, making it easier to copy, merge, and manipulate data in JavaScript. It simplifies coding and improves readability.
1. Copying an Array
The spread operator can create a copy of an array.
2. Merging Arrays
Multiple arrays can be combined into a single array.
3. Copying Objects
The spread operator can also copy objects.
4. Adding Elements to an Array.
3.What is the difference between map(), filter(), and forEach()?
ANSWER:===>
map(), filter(), and forEach() are JavaScript array methods used to iterate over elements of an array.
map()
It creates a new array by applying a function to each element.
The length of the new array remains the same as the original array.
filter()
It creates a new array with elements that satisfy a condition.
Only elements that pass the test are included.
forEach()
It executes a function for each array element.
It does not return a new array.
4. What is an arrow function?
ANSWER===>
An arrow function is a modern way of writing functions in JavaScript, introduced in ES6 (ECMAScript 2015). It provides a shorter and more concise syntax compared to traditional functions.
1.Short Syntax
Arrow functions are shorter than regular functions.
2.No function Keyword
It uses the arrow symbol => instead of the function keyword.
3.Implicit Return
If there is only one expression, the return keyword can be omitted.
4.Common Use
Arrow functions are widely used with array methods such as map(), filter(), and forEach().
5.What are template literals?
ANSWER===>
Template literals are a feature in JavaScript introduced in ES6 that allow easier string creation and formatting using backticks ( ) instead of single or double quotes.
They support string interpolation, multi-line strings, and embedded expressions.
1.Uses backticks ( ) instead of quotes.
2.Allows embedding variables using ${}.
3.Supports multi-line strings.
4.Makes string formatting easier.