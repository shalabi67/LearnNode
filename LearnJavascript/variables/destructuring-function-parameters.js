function createUser({firstName, lastName, address:{city}}) {
    return {
        firstName,
        lastName,
        address: {
            city
        }
    };
}

let { firstName: f, lastName: l} = createUser({firstName: 'mohammad', lastName: 'shalabi', address: {city: 'berlin'}});
console.log(f);
console.log(l);



//if variable names matches object names no need to specify variable names
let obj = {firstName: 'mohammad', lastName: 'shalabi', address: {city: 'berlin'}};
let { firstName, lastName} = createUser(obj);
console.log(firstName);
console.log(lastName);

let {address:{city: c}} = createUser(obj);
console.log(c);

let {address:{city}} = createUser(obj);
console.log(city);

