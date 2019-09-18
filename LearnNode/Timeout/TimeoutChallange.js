/*
Print the following:
    1- hello after 4 sec.
    2- hello after 8 sec.

    use only one function
 */

const timoutFunction = (seconds) => {
    console.log("hello after " + seconds + " sec");
}

setTimeout(timoutFunction, 4 * 1000, 4);
setTimeout(timoutFunction, 5 * 1000, 5);

