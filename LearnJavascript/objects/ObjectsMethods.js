let jim = {
    firstName: 'Jim',
    lastName: 'Cooper',
    age: 29,
    isAdult: function() { return this.age > 18; }
};

console.log(Object.keys(jim));  //[ 'firstName', 'lastName', 'age', 'isAdult' ]

let person = {married: true, firstName: 'person'};

//set attributes and function of jim to person. person is destination, jim is source
Object.assign(person, jim);
console.log(Object.keys(person));  //[ 'married', 'firstName', 'lastName', 'age', 'isAdult' ]
console.log(person); //{married: true,firstName: 'Jim',lastName: 'Cooper',age: 29,isAdult: [Function: isAdult]}

