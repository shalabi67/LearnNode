{
  // Block Scope
}

if (true) {
  // Block Scope
  var i = 10
  let j = 10
}
console.log(i);  //this is valid since var has no block scope
//console.log(j);  not valid since let has block scope ReferenceError: j is not defined

for (var i = 1; i <= 10; i++) {
  // Block Scope
}

function sum(a, b) {
  // Function Scope
  var result = a + b;
}

sum(4 + 3);
//console.log(result);  this will lead to error result is undefined
