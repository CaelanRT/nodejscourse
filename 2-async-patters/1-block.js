// async patterns - we are going to do some blocking code first

const http = require('http');

// req is whats coming in , res it what we send out - both objects
const server = http.createServer((req, res) => {
    if(req.url == '/') {
        res.end('Home Page');
    } else if(req.url == '/about') {
        // BLOCKING CODE
        for(let i = 0; i <1000; ++i) {
            for(let j = 0; j <1000; ++j) {
                console.log(`${i} ${j}`);
                    
            }
        }
        res.end('About Page');
    } else {
        res.end('Error page');
    }


})

// listening on port 5000 is the first param
server.listen(5000, ()=>{
    console.log('Server is listening on port 5000...');
    
})
