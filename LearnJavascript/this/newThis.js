var obj = function(){
    var _this = this;
    console.log(this);
    _this.hello = 'hello';

    _this.greet = function(){
        console.log(_this.hello);
    }

    this.delayGreeting = function(){
        setTimeout(_this.greet, 1000)
    }

}

var greeter = new obj();

greeter.delayGreeting()