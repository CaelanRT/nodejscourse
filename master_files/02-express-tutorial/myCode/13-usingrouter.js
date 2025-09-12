const express = require('express');
const app = express();
const people = require('./routes/people');
const auth = require('./routes/auth');


// static assets
app.use(express.static('./methods-public'))

// you can't just send a post request, you need to encode the URL with middleware by parsing the form data
// parse form data
app.use(express.urlencoded({extended:false}));

// parse json data
app.use(express.json())

// here is wehre were using our router but you need to set up a baseroute
// this path is now the path that you are using in your router file so you need to have the paths there based on the directory you're giving the path for right now
app.use('/api/people',people);

// login middleware path
app.use('/login', auth);

// post
// this is your login page, and in the html if you hosted your server different from where your front end was hosted you would give the full path tot he front end form




app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...');
})