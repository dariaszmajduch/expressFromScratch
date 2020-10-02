const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
    name: String,
    description: String,
    isStarted: Boolean,
    type: [String]
});

const Tasks = mongoose.model('Tasks', tasksSchema, 'Tasks');

module.exports = Tasks;
