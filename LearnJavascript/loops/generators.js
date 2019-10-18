let numbers = function*() {
    console.log(`generating value 1  and sum is ${sum}`);
    yield 1;
    console.log(`generating value 2  and sum is ${sum}`);
    yield 2;
    console.log(`generating value 3  and sum is ${sum}`);
    yield 3;
    console.log("generator has no more values and it will exit.");
};

let sum = 0;
let iterator = numbers();
console.log("calling generator");
let next = iterator.next();
while(!next.done) {
    sum += next.value;
    console.log("calling generator");
    next = iterator.next();
}
console.log(`sum = ${sum}`);

sum = 0;
for(let n of numbers()){
    sum += n;
}
console.log(`sum = ${sum}`);


numbers = function*(start, end) {
    for(let i = start; i <= end; i++) {
        console.log(`generating value ${i} and sum is ${sum}`);
        yield i;
    }
};

sum = 0;
for(let n of numbers(1,5)){
    sum += n;
}
console.log(`sum = ${sum}`);