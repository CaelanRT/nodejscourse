// MIDDLEWARE - functions that execute during requests to the server
// middleware functions have access to requrest and response objects
// express apps are nothing but middlewear functions stuffed together

// express import
const express = require('express');

// instantiate app
const app = express()

// req => middleware => res
// request comes in, do something, pass it to the response
// this is business logic?
// middleware - FUNCTIONS THAT DO THINGS THAT YOU CAN CALL IN YOUR ROUTES
// with middleware, you must pass to the next middleware except if youre passing back the response, next middleware is your get methods with responses
const logger = (req, res, next) =>{
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next()
    
}

// MIDDLEWARE CAN GO HERE - it will supply req 
app.get('/', logger, (req, res)=>{
    res.send('Home');
})

app.get('/about', logger, (req, res)=>{
    res.send('About');
    
    
})





// listen
app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...');
})