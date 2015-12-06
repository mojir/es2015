"use strict";

exports.surroundWithDashes =  function surroundWithDashes(str) {
    return `---${str}---`;
};

exports.surroundWithStars =function surroundWithStars(str) {
    return `***${str}***`;
};
