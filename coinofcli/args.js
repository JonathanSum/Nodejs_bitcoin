// Handling console arguments with Node.js Core
const args = process.argv;
console.log(args);

args.splice(0, 2);
console.log(args);
