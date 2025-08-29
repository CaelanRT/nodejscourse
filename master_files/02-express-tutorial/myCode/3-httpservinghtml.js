const http = require('http');
const {readFileSync} = require('fs');

// we are not invoking this when everyone pings the server, just one ping when it stands up and its read and the contents are stored in homepage
const homePage = readFileSync('./index.html');

// you can now serve pages!

// you can set up external html that will get passed in to this file, and then you pass in the contents of that file into your res.write functions
const server = http.createServer((req, res) => {
    const url = req.url;

    // getting the url from the request and checking what page its asking for

    // home
    if (url === '/') {
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write(homePage);
        res.end();
    // about page
    } else if (url === '/about') {
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write('<h1>about page</h1>');
        res.end();
    // 404
    } else {
        res.writeHead(404, {'content-type' : 'text/html'})
        res.write('<h1>page not found</h1>');
        res.end();
    }

    
})

server.listen(5000);