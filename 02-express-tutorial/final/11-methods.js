const express = require('express');
const app = express();
let { people } = require('./data.js');

//Static assets setup to get site up and running
app.use(express.static('./methods-public'));

//Middleware to parse from data in traditional form (x-www-form-urlencoded)
var parse = express.urlencoded({ extended: false });
//Middleware to parse if sending post req through JSON
var jsonParser = express.json();

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people });
})

//This is for JavaScript form (javascript.html)
//Data is passed in the form of JSON so we need jsonParser
app.post('/api/people', jsonParser, (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
        return res.status(401).json({ sucess: false, message: `Please provide credentials` });
    }
    res.status(201).json({ success: true, message: `Welcome ${name}` });
})

//Created a seperate method to test through postman
app.post('/api/postman/people', jsonParser, (req, res) => {
    const {name} = req.body;
    console.log(name);
    if (!name) {
        return res.status(401).json({ success: false, message: "Please provide credentials" });
    }
    //Adding our person to the list and showing in output
    var person = {id: people[people.length -1].id + 1, name: name};
    return res.status(200).json({ success: true, 
        data: [...people, person]
    });
})

//Here we send the ID in url and the data to change in JSON
app.put('/api/people/:id', jsonParser, (req, res) =>{
    const {id} = req.params; //ID passed through URL
    const {name} = req.body; //value passed through body

    //Checking if person exists
    const person = people.find((person) => person.id === Number(id));
    if(!person){
        return res.status(400).json({success: false, message: `Person with Id ${id} DNE`});
    }

    const newPeople = people.map((person) =>{
        if(person.id === Number(id)){
            person.name = name;
        }
        return person;
    })
    res.status(200).json({success: true, data: newPeople});
})

//Same thing as above, ID from URL and data from JSON
app.delete('/api/people/:id', jsonParser, (req, res) =>{
    const {id} = req.params;

    const person = people.find((person) => person.id === Number(id));
    if(!person){
        return res.send(404).json({success: false, message: `Perons with ID ${id} DNE`});
    }

    const newPeople = people.filter((person) => person.id !== Number(id));

    res.status(200).json({success: true, data: newPeople});
})

//This is for traditional form (index.html)
//Data is passed in x-www-form-urlencoded so only need parse
app.post('/login', parse, (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    }
    else {
        return res.status(401).send(`Please provide credentials`);
    }
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000....');
})