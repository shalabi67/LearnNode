let promiseOne = new Promise(function(resolve, reject) {
    resolve("I am data from promise one");
});

let promiseTwo = new Promise(function(resolve, reject) {
    resolve(promiseOne);
});

promiseTwo.then(function(data) {
    console.log('I am promise two.');
    console.log(`Data is have is ${data}`);
})