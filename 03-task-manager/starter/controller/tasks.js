const Task = require('../models/Task.js');
const asyncWrapper = require('../middleware/async.js');

const getAllTasks = asyncWrapper(async (req, res) => {
    let tasks = await Task.find({});
    res
        .status(200)
        .json({ success: true, data: { task: tasks }, count: tasks.length });
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
})

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return res.status(404).json({ message: `Task with ID ${taskID} DNE` });
    }
    res.status(200).json({ task });
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    //Options object should be set to run validators to make sure updation follows validtion rules earlier set and also new: true sends back response as updated value not old one
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, runValidators: true
    });
    if (!task) {
        return res.status(404).json({ msg: `Task with ID: ${taskID} DNE` });
    }
    res.status(200).json({ id: taskID, body: req.body });
})

//This API resets all the other fileds to default values.
const editTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, runValidators: true, overwrite: true,
        //Mongoose by default has the same behaviour for PUT and PATCH but setting overwrite: will differentiate put from patch by causing overwrite for the operation.
    })
    if (!task) {
        return res.status(404).json({ msg: `No task with ID ${taskID}` });
    }
    res.status(200).json({ task });
})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return res.status(404).json({ message: `Task with ID: ${taskID} DNE` });
    }
    res.status(200).json({ task });
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    editTask
};