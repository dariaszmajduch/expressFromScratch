const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title: String,
    description: String,
});

const Notes = mongoose.model('Notes', notesSchema, 'Notes');

module.exports = Notes;
