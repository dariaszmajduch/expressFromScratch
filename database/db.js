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
    getTasksFromDB: async (options = {}) => Tasks.find(options),
    addTaskToDB: async (name, description, isStarted, type) => {
      await Tasks.create({
          name: name,
          description: description,
          isStarted: isStarted,
          type: type,
      })
    },
    getNotesFromDB: async (options = {}) => Notes.find(options),
    addNoteToDB: async (title, description) => {
      await Notes.create({
          title: title,
          description: description,
      })
    },
};
