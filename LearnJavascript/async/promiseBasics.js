/*
shows simple promise use.
 */
let promise = new Promise(function(resolve, reject) {
    resolve();
} );

promise.then(function() {
    console.log("Promise then function called");
});

/*
shows how to pass data from promise
 */
promise = new Promise(function(resolve, reject) {
    resolve(20);  //20 is the data that the promise pass back
} );

promise.then(function(data) {
    console.log(`Promise then function called. data is ${data}`);
});

/*
show how to deal with error or reject. this is way to do that.
 */
//first way
promise = new Promise(function(resolve, reject) {
    reject(Error("something went wrong using first way"));
} );

promise.then(function() {
    console.log("SHOWED NOT SEE THIS: Promise then function called");
}, function(error) {
    console.log(`reject called with error = ${error.message}`);
});

//second was very simple
promise = new Promise(function(resolve, reject) {
    reject(Error("something went wrong using second way"));
} );
promise.catch(function(error){
    console.log(`reject called with error = ${error.message}`);
});
