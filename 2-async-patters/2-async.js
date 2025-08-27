const {readFile, writeFile} = require('fs').promises
//there is promisify in util that lets you turn something into a promise
// const util = require('util');

// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);




// const getText = (path) => {
//     return new Promise((resolve, reject)=>{
//         readFile(path, 'utf-8', (err, data)=>{
//             if (err) {
//             reject(err);
//         } else {
//             resolve(data);    
//         }

//         })
//     })
// }

// how to fix this issue, use promises and async await

// once the file system responds, that's when the callback happens and that's where you put your logic

// .then will do something with the return value - .catch is waht happens with an error
// getText('./content/first.txt')
//     .then(result => console.log(result))
//     .catch(err => console.log());

// what happens here is only once the promise gets resolved does the await part get fired
// async functions are cool, wrap in a try catch block!
const start = async() => {
    try {
        const first = await readFile('./content/first.txt', 'utf-8');
        const second = await readFile('./content/second.txt', 'utf-8');
        await writeFile('./content/result-mind-grenade.txt', `This is awesome: ${first} ${second}`, {flag: 'a'});
        console.log(first, second);
    } catch (error) {
        console.log(error);
    }
}

start();

