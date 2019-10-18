var myVar = 10;

function func() {
    myVar = 25;
    var myVar;
}

func();
console.log(myVar);  //this will print 10