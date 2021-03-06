class Company {
    constructor() {
        this.employees = [];
    }

    addEmployees(...names) {
        this.employees = this.employees.concat(names);
    }

    //this is how to define iterator
    [Symbol.iterator]() {
        return new ArrayIterator(this.employees);
    }
}

class ArrayIterator {
    constructor(array) {
        this.array = array;
        this.index = 0;
    }
    next() {
        var result = { value: undefined, done: true };
        if(this.index < this.array.length) {
            result.value = this.array[this.index];
            result.done = false;
            this.index += 1;
        }
        return result;

    }
}

let count = 0;
let company = new Company();
company.addEmployees("Tim", "Sue", "Joy", "Tom");

for(let employee of company) {
    console.log(employee);
}
