const http = require('http');

//req usually refers to the incoming request object, the res usually is the response heading back
const server = http.createServer((req, res)=>{
    if (req.url === '/') {
        res.end('Welcome to our home page')
        return
    }

    if (req.url === '/about') {
        res.end('Here is our short history')
        return
    }

    // write after end error, you can't send 2 responses to the same request so you need return statements in the code or you need if else if and else
    res.end(`
        <h1>Oops!</h1>
        <p>We can't seem to find the page that you're looking for</p>
        <a href="/">back home</a>
        `);
    
});

// need to give it a port number
server.listen(5000);


