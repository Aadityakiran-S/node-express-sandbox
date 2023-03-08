const Task = require('../models/Task.js');

const getAllTasks = async (req, res) => {
    try {
        let tasks = await Task.find({});
        // res.status(200).json({ task });
        res
            .status(200)
            .json({ success: true, data: { task: tasks }, count: tasks.length });
    } catch (error) {
        res
            .status(500)
            .json({ success: false, data: { error } });
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ message: `Task with ID ${taskID} DNE` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        //Options object should be set to run validators to make sure updation follows validtion rules earlier set and also new: true sends back response as updated value not old one
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true, runValidators: true
        });
        if (!task) {
            return res.status(404).json({ msg: `Task with ID: ${taskID} DNE` });
        }
        res.status(200).json({ id: taskID, body: req.body });
    } catch (error) {
        res.status(500).json({ error });
    }
}

//This API resets all the other fileds to default values.
const editTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true, runValidators: true, overwrite: true,
            //Mongoose by default has the same behaviour for PUT and PATCH but setting overwrite: will differentiate put from patch by causing overwrite for the operation.
        })

        if (!task) {
            return res.status(404).json({ msg: `No task with ID ${taskID}` });
        }

        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ message: `Task with ID: ${taskID} DNE` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    editTask
};