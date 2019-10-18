/*
Javascript default behavior of moving all declarations to the top of the current scope.

Var variables are created when their containing Lexical Environment is instantiated and are initialized to undefined when created.
 */
console.log(myvar1)  //this will print undefined
var myvar1 = 10;

console.log(myvar2)  //this will through an exception
let myvar2;