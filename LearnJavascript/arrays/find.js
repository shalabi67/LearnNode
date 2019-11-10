//find finds the first matching element, if the element is not exist it returned undefined
let array=[1, 4, 8, 0, 10];
let result = array.find(value => value>1);
console.log(result);  //4

const trees = [
    { name: "birch", count: 4 },
    { name: "maple", count: 5 },
    { name: "oak", count: 2 }
];

const oakTrees = trees.find(tree => tree.name === "oak");
console.log(oakTrees); //{ name: 'oak', count: 2 }



//non exiting element
result = array.find(value => value>10);
console.log(result);  //undefined