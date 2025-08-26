const http = require('http');

//req usually refers to the incoming request object, the res usually is the response heading back
const server = http.createServer((req, res)=>{
    res.write('Welcome to our home page');
    res.end();
});

// need to give it a port number
server.listen(5000);

