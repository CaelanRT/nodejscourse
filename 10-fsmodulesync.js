//there are two flavours - sync and async

const { readFileSync, writeFileSync } = require('fs');

//read file sync needs 2 params - a path and what is the encoding(utf8)

console.log("start");


const first = readFileSync('content/first.txt','utf-8');
const second = readFileSync('content/second.txt','utf-8');

console.log(first, second);

//write file sync needs 2 params - first is the file name (it will create if doesn't exist), then the content

writeFileSync('.\\content\\result-sync.txt',`Here is the result: ${first}, ${second}`, {flag: 'a'});

console.log("done");
console.log("starting the next task");

