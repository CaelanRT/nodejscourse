var http = require('http');
var fs = require('fs');

// effectively sending the big text file onto a webpage
http.createServer(function (req, res) {
    // sending big documents like that over the internet is really slow, you should use a stream

    // const text = fs.readFileSync('./content/big.txt', 'utf-8');
    // res.end(text);

    const fileStream = fs.createReadStream('./content/big.txt', 'utf-8');
    fileStream.on('open', ()=>{
        // pipe method pushing things from read stream to write stream, if you can read data in chunks you can now write data in chunks
        // response can be set up as writeable
        // saves on time and space
        fileStream.pipe(res);
    })

    fileStream.on('error', (err)=>{
        res.end(err);
    })
})
.listen(5000);