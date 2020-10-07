const db = require('./../../database/db');

const getNotesList = async () => {
    const notes = await db.getNotesFromDB({});
    return {
        notes: notes.map(note => {
            return {
                id: note._id,
                title: note.title,
                description: note.description,
            }
        })
    };
};

const notesListMiddleware = async (req, res, next) => {
    if(!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.notesListContext = await getNotesList();
    next();
};

module.exports = notesListMiddleware;
