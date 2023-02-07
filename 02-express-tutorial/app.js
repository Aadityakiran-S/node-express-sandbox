const express = require('express');
const {products, people} = require('./data');
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to home page");
})

app.get('/People', (req, res) => {
    // res.json([{name : "John"}, {name: "Susan"}]);
    res.json(products);
})

app.listen(3000, () => {
    console.log('Listening on port 3000...');
})