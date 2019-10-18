class Employee {
    constructor(name) {
        this._name = name;
    }

    getName() {
        return this._name;
    }
}

let moh = new Employee('mohammad');
console.log(moh.getName());

let elham = new Employee('Elham');
console.log(elham.getName());
