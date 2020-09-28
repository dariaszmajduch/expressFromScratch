const cookies = require('./cookies');
const db = require('./../database/db');

exports.home = (req, res) => {
    /**
     * if Handlebars engine is not used (for each page):
     * res.type('text/plain'); - set Content-Type heading
     * res.send('Home page');
     */
    res.render('home');
};

exports.about = (req, res) => {
    // send dynamically generated value
    res.render('about', { cookie: cookies.getCookie() });
};

exports.contact = (req, res) => res.render('contact', {
    /**
     * context object is defined here and is used in template between {{..}}
     * (if additional HTML code should be generated {{{...}}})
     */
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
   const notes = await db.getNotes();
   const context = {
       notes: notes.map(note => ({
           title: note.title,
           description: note.description,
       }))
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

/**
 * in Express error handling is recognized by number of arguments
 * so we can not remove unused 'next' argument - error pointed by ESLint, but
 * we can disable this rule for this part of code
 */
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500', { layout: 'error' });
};
/* eslint-enable no-unused-vars */
