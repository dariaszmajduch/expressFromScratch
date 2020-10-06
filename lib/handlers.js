const db = require('./../database/db');
const Tasks = require('./../database/models/tasks');

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

exports.notes = async (req, res) => {
   const notes = await db.getNotes({});
   const context = {
       notes: notes.map(note => {
           return {
               title: note.title,
               description: note.description,
           }
       })
   };
   res.render('notes', context)
};

/**
 * If we want to use other layout than default ('main'), this layout name should be passed as a
 * parameter to the context
 */
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
