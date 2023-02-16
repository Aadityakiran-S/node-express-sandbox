const Task_DBSchema = require('../models/Task.js');

const getAllTasks = (req, res) => {
    res.send('Get all tasks');
}

const createTask = async (req, res) => {
    try {
        const task = await Task_DBSchema.create(req.body);
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error });
    }
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