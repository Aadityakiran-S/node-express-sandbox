const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js');
const connectDB = require('./db/connect.js');
const notFound = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
require('dotenv').config();

//Setting up static files
app.use(express.static('./public'));

//JSON parser middleware to converte from JSON for all APIs
app.use(express.json());

//Using this route for the rest of the APIs: Aso a middleware
app.use('/api/v1/tasks', tasks);

//Route for for any path other than already defined. Set this up only AFTER ALL OTHER PATHS ARE DEFINED as above
app.use(notFound);

//Error handling middleware
app.use(errorHandlerMiddleware);

const port = 3000;
//Establishing connection to MongoDB
const start = async (mongoURI) => {
    try {
        await connectDB(mongoURI);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
}

start(process.env.MONGO_URI);