
// this is a different way to set up a server using an event emitter api
// this is essentially the same eventemitter method and you listen for a request event
// the builtin server modules rely on events even if you don't need to build your own events!
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    res.end('Welcome');
})

server.listen(5000);