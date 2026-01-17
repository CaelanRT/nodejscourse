// imports
require('dotenv').config();
require('express-async-errors');

// app
const express = require('express');
const app = express();

// middleware imports
const notFoundMiddlware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware invocations
app.use(express.json());
app.use(notFoundMiddlware);
app.use(errorHandlerMiddleware);


// database
const dbConnect = require('./db/connect');

// routes
app.get('/', (req, res) =>{
    res.send('e-commerce api');
});

// port
const port = process.env.PORT || 5000;

// start function + connect to db
const start = async () => {
    try {
        await dbConnect(process.env.MONGO_URI);

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
        
    }
}

start();



