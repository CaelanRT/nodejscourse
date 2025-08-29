const http = require('http');
const {readFileSync} = require('fs');

// you need to read all the files in the folder in order for the app to render correctly, the request is looking for th
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeImage = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');



// you can set up external html that will get passed in to this file, and then you pass in the contents of that file into your res.write functions
const server = http.createServer((req, res) => {
    const url = req.url;
    

    // getting the url from the request and checking what page its asking for

    // home
    if (url === '/') {
        res.writeHead(200, {'content-type' : 'text/html'});
        res.write(homePage);
        res.end();
    // styles
    } else if (url === '/styles.css') {
        res.writeHead(200, {'content-type' : 'text/css'});
        res.write(homeStyles);
        res.end();
    // logo
    } else if (url === '/logo.svg') {
        res.writeHead(200, {'content-type' : 'image/svg+xml'});
        res.write(homeImage);
        
        res.end();
    // logic
    } else if (url === '/browser-app.js') {
        res.writeHead(200, {'content-type' : 'text/javascript'});
        res.write(homeLogic);
        
        res.end();
    // 404
    } else {
        res.writeHead(404, {'content-type' : 'text/html'})
        res.write('<h1>page not found</h1>');
        res.end();
    }

    
})

server.listen(5000);