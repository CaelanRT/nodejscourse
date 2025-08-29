// starting express, servers on easymode!
// require express you need to install express
const express = require('express');

const app = express();

// need to add the resource, and a callback, which again has the 2 args of req and res
// everytime the user hits rood with a get, you get this 
app.get('/', (req, res) => {
    res.status(200).send('Home Page');
})

app.get('/about', (req, res) => {
    res.status(200).send('About Page');
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

// important methods
// app.get - request
// app.post - request
// app.put - request
// app.delete - request
// app.all - handles all http verbs
// app.use
// app.listen




app.listen(5000, ()=>{
    console.log("server is listening on port 5000");
    
})



