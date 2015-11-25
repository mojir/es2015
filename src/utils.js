exports.afterN = function afterN(n, fn) {
    return function() {
        n--;
        if (n === 0) {
            fn();
        }
    };
};
