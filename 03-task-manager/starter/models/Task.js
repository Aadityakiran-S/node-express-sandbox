const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: String,
    comlpeted: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);