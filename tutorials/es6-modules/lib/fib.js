"use strict";

module.exports = function fib(n) {
    if (n <= 0) {
        return NaN;
    }
    if (n <= 2) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
};
