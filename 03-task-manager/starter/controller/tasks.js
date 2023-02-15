const Task = require('../models/Task.js');

const getAllTasks = (req, res) => {
    res.send('Get all tasks');
}

const createTask = (req, res) => {
    res.json(req.body);
}

const getTask = (req, res) => {
    const params = req.params;
    console.log(params);
    res.send(`Task fetched with ID ${params.id}`);
}

const updateTask = (req, res) => {
    const params = req.params;
    console.log(params);
    res.send(`Updated task with ID ${params.id}`);
}

const deleteTask = (req, res) => {
    const params = req.params;
    console.log(params);
    res.send(`Deleted task with ID ${params.id}`);
}

module.exports = { 
    getAllTasks, 
    createTask,
    getTask,
    updateTask,
    deleteTask
};