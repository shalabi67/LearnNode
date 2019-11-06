let person = {
    firstName: 'Jim',
    lastName: 'Cooper',
    age: 29,
    isAdult: function() { return this.age > 18; }
};

for(let propertyName in person) {
    console.log(`person.${propertyName} = ${person[propertyName]}`);
}

//get property information
console.log(Object.getOwnPropertyDescriptor(person, "firstName")); //{ value: 'Jim', writable: true, enumerable: true, configurable: true }

//change property to be read only
Object.defineProperty(person, "age", { writable: false, value: 20, enumerable:false});
console.log(Object.getOwnPropertyDescriptor(person, "age"));
for(let propertyName in person) {
    console.log(`person.${propertyName} = ${person[propertyName]}`);
}
console.log(person);  //no age will be shown: { firstName: 'Jim', lastName: 'Cooper', isAdult: [Function: isAdult] }
person.age=10; //TODO: why this worked it supposed to throw an exception
console.log('strange');