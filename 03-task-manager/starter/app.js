const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js');
const connectDB = require('./db/connect.js');
require('dotenv').config();

const port = 3000;

//Setting up static files
app.use(express.static('./public'));

//JSON parser middleware to converte from JSON for all APIs
app.use(express.json());

//Using this route for the rest of the APIs: Aso a middleware
app.use('/api/v1/tasks', tasks);

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

