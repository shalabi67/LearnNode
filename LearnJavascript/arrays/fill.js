//fill used to fill an array with an item starting from a zero based position and ending with non zero based index.
let arr = [0,1,2,3,4,5,6,7,8,9];
console.log(arr);

arr.fill('b', 3, 6);
console.log(arr);  //[ 0, 1, 2, 'b', 'b', 'b', 6, 7, 8, 9 ]

arr.fill('a', 3);  //[ 0, 1, 2, 'a', 'a', 'a', 'a', 'a', 'a', 'a' ]
console.log(arr);