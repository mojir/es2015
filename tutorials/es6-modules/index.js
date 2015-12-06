"use strict";
console.log("ES6 modules");

// Import all exports from module
const math = require("./lib/math-utils");

let x = math.double(2); // -> 4
x = math.tripple(x); // -> 12
console.log(`Now x is ${x}`);


// Import specific export from module
const stars = require("./lib/string-utils").surroundWithStars;

console.log(stars("Albert with stars"));


// Import default from module
const fibonacci = require("./lib/fib");
console.log(`The 10th number in the fibonacci sequence is ${fibonacci(10)}`);
