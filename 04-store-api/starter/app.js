require('dotenv').config();
// async errors

const express = require('express');
const app = express();

//Connect to the DB
const connectDB = require('./db/connect.js');
const productsRoute = require('./routes/products.js');

const notFoundMiddleWare = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error-handler.js');;

//middleware
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
})

app.use('/api/v1/products', productsRoute);

//product routes

app.use(notFoundMiddleWare);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}`));
    }
    catch (error) {
        console.log(error);
    }
}

start();