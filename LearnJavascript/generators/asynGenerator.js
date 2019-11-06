function getData(data) {
    setTimeout(function() {
        run(data);
    }, 1000)
}

function answer(generator) {
    var my = generator();
    return function() {
        return my.next.apply(my, arguments)
    }
}

var run = answer(function*() {
    let x = 1 + (yield getData(10));
    let y = 1 + (yield getData(30));
    let answer = (yield getData(`The sum is ${x + y}`));
    console.log(answer);
});

run();
