class Person {
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
class Employee extends Person {
    doWork() {
        return `${this.name} is working`
    }
}

let moh = new Employee('mohammad');
console.log(moh.name);
console.log(moh.doWork());