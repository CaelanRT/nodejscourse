const {readFile} = require('fs');

const getText = (path) => {
    return new Promise((resolve, reject)=>{
        readFile('./content/first.txt', 'utf-8', (err, data)=>{
            if (err) {
            reject(err);
        } else {
            resolve(data);    
        }

        })
    })
}

// how to fix this issue, use promises and async await

// once the file system responds, that's when the callback happens and that's where you put your logic

// .then will do something with the return value - .catch is waht happens with an error
getText('./content/first.txt').then(result => console.log(result)).catch(err => console.log());

