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
    constructor(name, title) {
        super(name);
        this._title = title;
    }
    doWork() {
        return `${this.name} is working with title ${this.title}`
    }

    get title() {
        return this._title;
    }
}

let moh = new Employee('mohammad', 'developer');
console.log(moh.name);
console.log(moh.doWork());