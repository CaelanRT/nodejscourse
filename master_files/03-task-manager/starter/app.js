const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();


// middleware
app.use(express.json());

// routes
app.get('/hello', (req, res)=>{
    res.send('Task Manager App');
})

// route of '/api/v1' api routes convention is because your root is probably an html page and then you want to have some versioning
app.use('/api/v1/tasks', tasks)

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
})
    } catch (error) {
        console.log(error);
        
    }
}

start();



