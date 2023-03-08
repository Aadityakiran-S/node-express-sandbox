const express = require('express');
const router = express.Router();
const { getAllTasks, getTask, createTask, updateTask, deleteTask, editTask
} = require('../controller/tasks.js');

//Chaining here just specifies that the paths are the same for get and post
router.route('/').get(getAllTasks).post(createTask);
//Similarly the paths are the same for these as well
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask).put(editTask);

module.exports = router;