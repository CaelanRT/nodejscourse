const http = require('http');

// create server method has a callback that gets hit everytime the user pings the server
// need to add a response.end() method at the end of every server method so that you can signal that the message is complete
// you can also check for things from the request with lots of built-in methods (req.url)
const server = http.createServer((req, res)=>{

    console.log(req.url);

    //need to give meta data for the request here with this method, passing in status code and content type
    res.writeHead(200, {'content-type': 'text/html'});

    // this will write and give you the data of the resonse
    res.write('<h1>home page</h1>');

    // need to ensure you have end otherwise you'll get an infinite loop
    res.end();
    
});

server.listen(5000);
