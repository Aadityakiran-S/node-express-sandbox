const express = require('express');
const router = express.Router();

const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controller/people.js');

//Middleware to parse if sending post req through JSON
var jsonParser = express.json();

//Simply retrieve people 
router.get('/', getPeople)

//This is for JavaScript form (javascript.html)
//Data is passed in the form of JSON so we need jsonParser
router.post('/', jsonParser, createPerson)

//Created a seperate method to test through postman
router.post('/postman', jsonParser, createPersonPostman)

//Here we send the ID in url and the data to change in JSON
router.put('/:id', jsonParser, updatePerson)

//Same thing as above, ID from URL and data from JSON
router.delete('/:id', jsonParser, deletePerson)

module.exports = router; //This is boilerplate required for middleware router to work