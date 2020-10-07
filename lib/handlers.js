const db = require('./../database/db');

exports.home = (req, res) => {
    res.render('home');
};

exports.tasks = (req, res) => {
    res.render('tasks');
};

exports.contact = (req, res) => res.render('contact', {
    context: 'context',
    contextWithHtml: '<i>contextWithHtml</i>',
    precedentContext: {
        name: 'precedentContext',
    },
    smallList: [
        { name: 'First element', value: 'First value' },
        { name: 'Second element', value: 'Second value' },
    ],
    unlessArray: [],
    elseArray: ['a', 'b', 'c']
});

exports.notes = (req, res) => {
   res.render('notes');
};

exports.api = {
    addTask: async (req, res) => {
        await db.addTaskToDB(req.body.taskName, req.body.taskDescription, req.body.isTaskStarted, req.body.taskType);
        res.send({ result: 'success' });
    },
    deleteTask: async (req, res) => {
        await db.deleteTaskFromDB(req.params.id);
        res.redirect('/tasks');
    },
    addNote: async (req, res) => {
        await db.addNoteToDB(req.body.noteTitle, req.body.noteDescription);
        res.send({ result: 'success' });
    },
    deleteNote: async (req, res) => {
        await db.deleteNoteFromDB(req.params.id);
        res.redirect('/notes');
    },
};

exports.notFound = (req, res) => {
    res.status(404);
    res.render('404', { layout: 'error' });
};

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500', { layout: 'error' });
};
/* eslint-enable no-unused-vars */
