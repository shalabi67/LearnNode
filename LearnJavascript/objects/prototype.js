let fun = function () {
};

//every function has prototype property
console.log(fun.prototype);  //fun {}

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
console.log(Person.prototype); //Person {}

Person.prototype.age = 10;
let jim = new Person("jim", "lastname");
let sonia = new Person('sonia', 'lastname');
console.log(jim);    //Person { firstName: 'jim', lastName: 'lastname' }
console.log(sonia);  //Person { firstName: 'sonia', lastName: 'lastname' }

console.log(jim.age);   //10
console.log(sonia.age); //10

Person.prototype.age = 22;
console.log(jim.age);   //22
console.log(sonia.age); //22

jim.age = 5;
console.log(jim.age);   //5
console.log(sonia.age); //22

Person.prototype.age = 30;
console.log(jim.age);   //5
console.log(sonia.age); //30