const {people} = require('../data.js');

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people });
}

const createPerson = (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
        return res.status(401).json({ sucess: false, message: `Please provide credentials` });
    }
    res.status(201).json({ success: true, message: `Welcome ${name}` });
}

const createPersonPostman = (req, res) => {
    const { name } = req.body;
    console.log(name);
    if (!name) {
        return res.status(401).json({ success: false, message: "Please provide credentials" });
    }
    //Adding our person to the list and showing in output
    var person = { id: people[people.length - 1].id + 1, name: name };
    return res.status(200).json({
        success: true,
        data: [...people, person]
    });
}

const updatePerson = (req, res) => {
    const { id } = req.params; //ID passed through URL
    const { name } = req.body; //value passed through body

    //Checking if person exists
    const person = people.find((person) => person.id === Number(id));
    if (!person) {
        return res.status(400).json({ success: false, message: `Person with Id ${id} DNE` });
    }

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    })
    res.status(200).json({ success: true, data: newPeople });
}

const deletePerson = (req, res) => {
    const { id } = req.params; 

    const person = people.find((person) => person.id === Number(id));
    if (!person) {
        return res.send(404).json({ success: false, message: `Perons with ID ${id} DNE` });
    }

    const newPeople = people.filter((person) => person.id !== Number(id));

    res.status(200).json({ success: true, data: newPeople });
}

module.exports = {
    getPeople, createPerson, createPersonPostman, updatePerson, deletePerson
}