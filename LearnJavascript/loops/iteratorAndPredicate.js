let filter = function*(items, predicate) {
    for(let item of items) {
        //console.log("filter", item);
        if(predicate(item)) {
            yield item;
        }
    }
}

let names = ["Tim", "Sue", "Joy", "Tom"];

//get all names begin with T
for(let name of filter(names, e => e[0] == 'T')) {
    console.log(name);
}


let numbers = [1,2,3,4,5,6,7,8,9];

console.log("get all numbers less than 5")
for(let number of filter(numbers, e => e<5)) {
    console.log(number);
}

console.log("get all numbers between 3 than 8")
for(let number of filter(numbers, e => e>3 && e<8)) {
    console.log(number);
}