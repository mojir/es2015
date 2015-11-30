console.log("Simple Example");

let x = 1;
let y = 2;

console.log("\nbefore");
console.log(`x: ${x}, y: ${y}`);

[x, y] = [y, x];

console.log("\nafter");
console.log(`x: ${x}, y: ${y}`);
