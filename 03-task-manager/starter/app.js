const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js');
const connectDB = require('./db/connect.js');
require('dotenv').config();

const port = 3000;

//JSON parser middleware to converte from JSON for all APIs
app.use(express.json());

//Basic welcome message
app.get('/hello', (req, res) => {
    res.status(200).send('<h1>Task Manager App</h1>');
})

//Using this route for the rest of the APIs: Aso a middleware
app.use('/api/v1/tasks', tasks);

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

