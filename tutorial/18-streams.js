// STREAMS
// writeable - write data sequentially
// readable - read data sequentially
// duplex - read and write data sequentially
// transform - data can be modified
// many built-in modules implement the streaming interface and it extends the events class
// streams are good for large files or lots of data

const {createReadStream} = require('fs');

//need to create a stream and envoke it
const stream = createReadStream('./content/big.txt', {highWaterMark: 90000});

// default the size of the buffer is 64kb
// last buffer - remainder after the buffer chunk
// highWaterMakr - control size, pass this as a parameter
// can set encoding as well using {encoding: 'utf-8}

// stream is now created and were reading the file chunk by chunk
stream.on('data', (result) => {
    console.log(result);
    
})