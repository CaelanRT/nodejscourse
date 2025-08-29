const express = require('express');
// requiring path module
const path = require('path');
const app = express();

// app.use is what you're using in the response, and all your static resources are in the folder by this name, usually public
// app.use is for setting up middleware
app.use(express.static('./public'))

// now everything from your static resources is now servable!!!

app.get('/', (req, res)=>{
    // this needs the absolute path so you're resolving the dirname then getting to the directory you want
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
})

app.all('*', (req, res)=>{
    res.status(404).send('resource not found')
})




app.listen(5000, ()=>{
    console.log("server is listening on port 5000");
})


