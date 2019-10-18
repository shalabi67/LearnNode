let sum = 0;
let numbers = [1,2,3,4];

// for loop
sum = 0;
for(let i =0; i < numbers.length; i++){
    sum += numbers[i];
}
console.log(sum);

// for in
sum = 0;
for(let i in numbers) {
    sum += numbers[i];
}
console.log(sum);


// for of
sum = 0;
for(let i of numbers) {
    sum += i;
}
console.log(sum);

// iterator
sum = 0;
let iterator = numbers[Symbol.iterator]();
let next = iterator.next();
while(!next.done){
    sum += next.value;
    next = iterator.next();
}
console.log(sum);