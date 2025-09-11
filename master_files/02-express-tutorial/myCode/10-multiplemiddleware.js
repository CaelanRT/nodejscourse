const express = require('express');
const app = express();
const logger = require('./logger');
const authorize = require('./authorize');
const morgan = require('morgan');

// this will invoke logger for any route
// will we use middleware in routes? yes. add middleware to routes you want those functions to run on
// can add multiple middleware to routes using the array thing
// middleware options - our own / express' own middleware / 3rd party
// you need to have this above your requests
// if you give it a path as a param, the middleware will only apply after that path is hit
//app.use('/api',logger);

// app.use([logger, authorize]);

// app.use has a method called static and its looking for the public folder, puts all contents of public folder as static assets
// app.use(express.static('./public'))
app.use(morgan('tiny'))


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