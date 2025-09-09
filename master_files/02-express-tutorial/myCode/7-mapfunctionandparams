// require express
const express = require('express');
//getting the info from another file
const { products } = require('./data');
// have your app
const app = express();

// serve a get request at root
app.get('/', (req,res)=>{
    res.send('<h1> Home Page </h1><a href="/api/products">products</a>');
})

// we're going to send back the products here, but were going to send back just the products that meet the query string criteria
app.get('/api/products', (req, res)=> {
    // can use the map() method to access properties of a json object
    const newProducts = products.map((product)=> {
        const {id, name, image} = product;
        return {id,name,image}
    })

    res.json(newProducts);
})

// listen to the server
app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...');
})