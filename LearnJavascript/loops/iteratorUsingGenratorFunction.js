class Company {
    constructor() {
        this.employees = [];
    }

    addEmployees(...names) {
        this.employees = this.employees.concat(names);
    }

    //this is how to define iterator, notice theuse of the generator *
    *[Symbol.iterator]() {
        for(let employee of this.employees) {
            yield employee;
        }
    }
}

let count = 0;
let company = new Company();
company.addEmployees("Tim", "Sue", "Joy", "Tom");

for(let employee of company) {
    console.log(employee);
}
