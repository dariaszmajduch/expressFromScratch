const mongoose = require('mongoose');
const Tasks = require('./models/tasks');
const Notes = require('./models/notes');

mongoose.connect('mongo mongodb://workOrganizerUser:pass123@mongo_work_org:27017/mongo_work_org', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`MongoDB error: ${err} `);
    process.exit(1);
});

db.once('open', () => {
    console.log('Connected');
});

module.exports = {
    getTasks: async (options = {}) => Tasks.find(options),
    getNotes: async (options = {}) => Notes.find(options),
};
