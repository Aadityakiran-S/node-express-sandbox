const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js');

const port = 3000;

//JSON parser middleware to converte from JSON for all APIs
app.use(express.json());

//Basic welcome message
app.get('/hello', (req, res) =>{
    res.status(200).send('<h1>Task Manager App</h1>');  
})

//Using this route for the rest of the APIs
app.use('/api/v1/tasks', tasks);

app.listen(port, () =>{
    console.log(`Server listening on port ${port}...`);
})