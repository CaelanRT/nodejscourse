const express = require('express');
const app = express();
const logger = require('./logger');
const authorize = require('./authorize');

// this will invoke logger for any route
// you need to have this above your requests
// if you give it a path as a param, the middleware will only apply after that path is hit
//app.use('/api',logger);

app.use([logger, authorize]);

app.get('/', (req, res)=>{
    res.send('Home');
})

app.get('/about', (req, res)=>{
    res.send('About');
})

app.get('/api/products', (req, res)=>{
    res.send('products');
})

app.get('/api/items', (req, res)=>{
    res.send('items');
})



app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...');
})