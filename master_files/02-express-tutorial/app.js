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

// // item 1 route
// app.get('/api/products/1', (req, res)=> {
//     // getting a single product using the find method
//     const singleProduct = products.find((product)=> product.id === 1)

//     res.json(singleProduct);
// })

// this is it with a route parameter
app.get('/api/products/:productID', (req, res)=> {
    
    console.log(req.params);
    // you can destructure the params and the access the value that is passed
    const {productID} = req.params;

    const singleProduct = products.find((product) => product.id === Number(productID));

    if (!singleProduct) {
        return res.status(404).send('Product does not exist');
    }    

    return res.json(singleProduct);
    
})

app.get('/api/products/:productID/reviews/:reviewID', (req,res)=>{
    console.log(req.params);
    res.send('hello world');
})

app.get('/api/v1/query', (req,res)=>{

    // console.log(req.query);

    // you have your list of products now
    const {search, limit} = req.query;
    let sortedProducts = [...products];
    
    // searching for a product that starts with a certain letter
    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search);
        })
    }

    // seeing if there is a query limit in the query string
    if (limit) {
        sortedProducts = sortedProducts.slice(0,Number(limit))
    }

    // checking to see if the array is empty, sending back successful empty response if so
    if(sortedProducts.length < 1) {
        return res.status(200).json({success:true, data:[]})
    }

    // sending back our successful products array in json
    return res.status(200).json(sortedProducts);
    
})

// listen to the server
app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...');
})