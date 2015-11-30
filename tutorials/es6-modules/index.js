"use strict";
console.log("ES6 modules");

// Import all exports from module
import * as math from "./lib/math-utils";

let x = math.double(2); // -> 4
x = math.tripple(x); // -> 12
console.log(`Now x is ${x}`);


// Import specific export from module
import {surroundWithStars as stars} from "./lib/string-utils";

console.log(stars("Albert with stars"));


// Import default from module
import fibonacci from "./lib/fib";
console.log(`The 10th number in the fibonacci sequence is ${fibonacci(10)}`);
