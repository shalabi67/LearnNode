function getX(flag) {
    if(flag) {
        let x = 10;  //let is not defined out of the if block scope
    }

    return x;  //give compile error x is not defined
}
console.log(getX(true)); //will not run
console.log(getX(false)); //will not run