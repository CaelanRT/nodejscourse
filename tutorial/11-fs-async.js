//there are two flavours - sync and async

const { readFile, writeFile } = require('fs');

console.log("start");

//need a callback - when the functionality you're doing is complete, you run the callback after the event happens
//if you don't add UTF coding, you get a buffer value
//you need to access the 
readFile('./content/first.txt', 'utf8', (err,result)=>{
    if (err) {
        console.log(err);
        return null;
    }

    //this is wehre you would set up your functionality
    const first = result;

    //nested readfiles to have the callback functions happen and you get the right result
    readFile('./content/second.txt', 'utf8', (err, result)=> {
        if (err) {
        console.log(err);
        return null;
    }

    const second = result;

    //looks in the outside scope of the callback function first
    writeFile('./content/result-async.txt', `Here is the result : ${first}, ${second} `, (err, result)=>{
        if(err) {
            console.log(err);
            
            return;
        }

        console.log("done with this task");
    })
    })
    
})

//node offloads this task once the function gets called so that other users can get processed and do things
console.log("starting next task");

