"use strict";

// Export a function
function double(x) {
    return 2 * x;
}

// Export another function
function tripple(x) {
    return 3 * x;
}

function surroundWithStars(str) {
    return "***" + str + "***";
}

function fib(n) {
    if (n <= 0) {
        return NaN;
    }
    if (n <= 2) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}

console.log("ES6 modules");

var x = double(2); // -> 4
x = tripple(x); // -> 12
console.log("Now x is " + x);

console.log(surroundWithStars("Albert with stars"));

console.log("The 10th number in the fibonacci sequence is " + fib(10));