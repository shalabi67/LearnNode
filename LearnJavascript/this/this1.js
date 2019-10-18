'use strict';
var obj = {
    val: 'Hi there',
    printVal: function(){
        console.log(this);
        console.log(this.val);
    }
};
obj.printVal(); //this point to obj so this line will print Hi there



var obj2 = {
    val: 'Whats up'
};

obj2.printVal = obj.printVal;

obj2.printVal();   //this points to obj2

/*
var print = obj.printVal;
print();   //now the problem is this point tio undefined
 */


var print1 = obj.printVal.bind(obj2);
print1();