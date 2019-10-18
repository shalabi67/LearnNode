function getX(flag) {
    if(flag) {
        var x = 10;  //this is a bad practice remember from best practices section var defined at the beginning of the file or function
    }

    return x;
}
console.log(getX(true)); //prints 10
console.log(getX(false)); //prints undefined