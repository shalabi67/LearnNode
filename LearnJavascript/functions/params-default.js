function createUser(firstName = 'mohammad', lastName='shalabi', city = 'berlin') {
    return {
        firstName,
        lastName,
        address: {
            city
        }
    };
}

function print({firstName, lastName, address: {city}}) {
    console.log("firstName=" + firstName);
    console.log("lastName=" + lastName);
    console.log("city=" + city);
}

let obj = createUser();
print(obj);

obj = createUser('firstName');
print(obj);

obj = createUser(undefined, 'lastName', null);
print(obj);


