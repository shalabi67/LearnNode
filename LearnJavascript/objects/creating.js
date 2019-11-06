let person = {
   firstName: 'Jim',
   lastName: 'Cooper',
   age: 29,
   isAdult: function() { return this.age > 18; }
};

console.log(person.firstName);
console.log(person.isAdult());

//adding dynamic properties and functions
person.fullName = function () {
    return `${this.firstName} ${this.lastName}`;
};
person.married = false;

console.log(person.married);
console.log(person.fullName());