require('dotenv').config();
// async errors

const express = require('express');
const app = express();

const notFoundMiddleWare = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error-handler.js');;

//middleware
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
})

//product routes

app.use(notFoundMiddleWare);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        //connect DB
        app.listen(port, console.log(`Server is listening on port ${port}`));
    }
    catch (error) {
        console.log(error);
    }
}

start();