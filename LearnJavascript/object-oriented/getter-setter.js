class Employee {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }
}

let moh = new Employee('mohammad');
console.log(moh.name);

let elham = new Employee('Elham');
console.log(elham.name);

elham.name = 'khaleel';
console.log(elham.name);