//return a zero based index of the first element and -1 if the element doe not exist.
let array=[1, 4, 8, 0, 10];
let result = array.findIndex(value => value>8);
console.log(result);  //4

result = array.findIndex(value => value>20);
console.log(result);  //-1

