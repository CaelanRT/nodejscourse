require('dotenv').config();
require('express-async-errors');

const connectDB = require('./db/connect');
const productRouter = require('./routes/products')

// async errors



const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorFoundMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());

// routes
app.get('/', (req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
});

// router
app.use('/api/v1/products', productRouter);

// products route
app.use(notFoundMiddleware);
app.use(errorFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // connect to db
        await connectDB(process.env.MONGO_URI);
        app.listen(port);
        console.log(`Server is listening on port ${port}...`);
    } catch (error) {
        console.log(error);
        
    }
}

start();