let x = 10;
let y = 20;

console.log("x=" + x);
console.log("y=" + y);

//swap x and y
[x,y] = [y, x];

console.log("x=" + x);
console.log("y=" + y);

[x,y] = [5,6,7];
console.log("x=" + x);
console.log("y=" + y);

[,x,y] = [1,2,3];
console.log("x=" + x);
console.log("y=" + y);