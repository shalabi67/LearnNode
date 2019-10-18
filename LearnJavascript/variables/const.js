const NUMBER = 10;

// NUMBER=11; will give error: Assignment to constant variable.

//const has block scope
for(let i=1; i<10; i++) {
    const X = 5;
}
// console.log(X); X is not defined
