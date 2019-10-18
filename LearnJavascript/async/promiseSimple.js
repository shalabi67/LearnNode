let promise = Promise.resolve(3);
promise.then(function(data) {
    console.log(`data is ${[data]}`)
});
let errorPromise = Promise.reject(Error('error'));
errorPromise.catch(function (error) {
    console.log(`Error is ${error.message}`);
})