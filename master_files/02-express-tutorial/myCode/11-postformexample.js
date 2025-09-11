const express = require('express');
const app = express();
let {people} = require('./data');

// static assets
app.use(express.static('./methods-public'))

// you can't just send a post request, you need to encode the URL with middleware by parsing the form data
// parse form data
app.use(express.urlencoded({extended:false}));

// this sets the request property of the response to true and the data to the people you required in
app.get('/api/people', (req,res)=>{
    res.status(200).json({success:true,data:people})
})

// post
// this is your login page, and in the html if you hosted your server different from where your front end was hosted you would give the full path tot he front end form
app.post('/login', (req, res)=>{
    const {name} = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    } else {
        return res.status(401).send('Please Provide Credentials')
    }
})

// put

// delete



app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...');
})