require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const productRouter = require('./routes/products.js');

const connectDB = require('./db/connect.js');

const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlingMiddleware = require('./middleware/error-handler.js');

//middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productRouter);

app.use(errorHandlingMiddleware); app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server listneing on port ${port}..`));
    } catch (error) {
        console.log(error);
    }
}

start();