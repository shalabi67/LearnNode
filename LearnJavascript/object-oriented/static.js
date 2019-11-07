class Employee {
    static RetiredAge = 67;
    static createEmployee(name) {
        let employee = new Employee(name);

        return employee;
    }
    constructor(name) {
        this._name = name;
    }

    getName() {
        return this._name;
    }
}

let mohammad = Employee.createEmployee('mohammad');
console.log(mohammad);
console.log(Employee.RetiredAge);