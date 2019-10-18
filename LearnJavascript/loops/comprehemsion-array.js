//comprehension had been removed.

/*let range = function*(start, end) {
    let current = start;
    while(current <= end) {
        yield current;
        current += 1;
    }
}

let numbers = [];
for(let n of [1,2,3]) {
    numbers.push(n * n);
}
expect(numbers).toEqual([1, 4, 9]);

numbers = [for (n of [1,2,3]) if(n > 1) n * n];
expect(numbers).toEqual([4,9]);

let numbers2 = (for (n of [1,2,3]) n * n);
expect(Array.from(numbers2)).toEqual([1,4,9]);
*/


