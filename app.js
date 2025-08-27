// npm - global command, comes with node
// npm --version

// local dependency - use it only in this particular project
// npm i <packageName>

// global dependency - use it in any project
// npm install -g <packageName>

// package.json - manifest file (stores important info about projec/package)

//3 ways to make this
// manual approach (create package.json in the root, create properties etc)

// automate
// npm init (step by step)
// npm init -y (everything default setup)
// why do you need? when you have a package.json it will add a dependencies object to that file when you install a package
// package.json is VERY IMPORTANT


const _ = require('lodash');

// returns this array of arrays as a flat array
const items = [1, [2,[3,[4]]]];
const newItems = _.flattenDeep(items);
console.log(newItems);
