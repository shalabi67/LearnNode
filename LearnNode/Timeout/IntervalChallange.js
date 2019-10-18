/*
Print the message “Hello World”
- Every second but only 5 times
Print “Done” and exit
Constraints
- You can’t use setTimeout
 */

let id = 0;
let count = 5;
const timeoutFunction = () => {
    console.log('Hello World');
    count--;
    if(count == 0) {
        clearInterval(id);
        console.log('Done');
    }
}

id = setInterval(timeoutFunction, 1000);