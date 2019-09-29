// Scalar values
const answer = 42;
const greeting = 'Hello';

//answer = 20; this wil lead to error TypeError: Assignment to constant variable.

// Arrays and Objects
const numbers = [2, 4, 6];
const person = {
  firstName: 'John',
  lastName: 'Doe',
};

console.log(numbers[0])
//numbers = [8, 10] this will cause an error since numbers is constant. TypeError: Assignment to constant variable.
numbers[0] = 7
console.log(numbers[0]);  //this will print 7

/*
person = {
    firstName: 'John Error',
    lastName: 'Doe Error',
}
this can not be done since person is constant.
TypeError: Assignment to constant variable.
*/
console.log(person.firstName); //prints John
person.firstName = 'Mohammad';  // this will work
console.log(person.firstName); //prints Mohammad