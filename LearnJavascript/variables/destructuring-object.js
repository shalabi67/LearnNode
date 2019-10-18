function createUser() {
    return {
        firstName: "mohammad",
        lastName: "shalabi",
        address: {
            city: "berlin"
        }
    };
}

let { firstName: f, lastName: l} = createUser();
console.log(f);
console.log(l);

// let [f1, l1] = createUser();   error: createUser is not a function or its return value is not iterable



//if variable names matches object names no need to specify variable names
let { firstName, lastName} = createUser();
console.log(firstName);
console.log(lastName);

let {address:{city: c}} = createUser();
console.log(c);

let {address:{city}} = createUser();
console.log(city);

