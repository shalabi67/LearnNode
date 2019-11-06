function answer(generator) {
    var my = generator();
    return function() {
        return my.next.apply(my, arguments)
    }
}

var run = answer(function*() {
    let x = 1 + (yield);
    let y = 1 + (yield);
    yield(x + y);
});

run();
run(10);
console.log(run(30).value);