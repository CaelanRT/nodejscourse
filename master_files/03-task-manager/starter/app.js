const express = require('express');
const app = express();
const tasks = require('./routes/tasks')

// middleware
app.use(express.json());

// routes
app.get('/hello', (req, res)=>{
    res.send('Task Manager App');
})

app.use('/api/v1/tasks', tasks)



// route of '/api/v1' api routes convention is because your root is probably an html page and then you want to have some versioning

const port = 3000;

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
})