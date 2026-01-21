// imports
require('dotenv').config();
require('express-async-errors');

// app
const express = require('express');
const app = express();

// rest of the packages
const morgan = require('morgan');

// middleware imports
const notFoundMiddlware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require('./routes/authRoutes');

// middleware invocations
app.use(morgan('tiny'));
app.use(express.json());



// database
const dbConnect = require('./db/connect');

// routes
app.get('/', (req, res) =>{
    res.send('e-commerce api');
});

// auth routes
app.use('/api/v1/auth', authRouter);

// error handling must be under the main routes
app.use(notFoundMiddlware);
app.use(errorHandlerMiddleware);

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



