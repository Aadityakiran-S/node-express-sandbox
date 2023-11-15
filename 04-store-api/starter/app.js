require('dotenv').config();
//async errors

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlingMiddleware = require('./middleware/error-handler.js');

//middleware
app.use(express.json());

//routes

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use(errorHandlingMiddleware); app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        //Connect to DB
        app.listen(port, console.log(`Server listneing on port ${port}..`));
    } catch (error) {
        console.log(error);
    }
}

start();