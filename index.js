const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const handlers = require('./lib/handlers');
const tasksListMiddleware = require('./lib/middleware/tasks_list');
const notesListMiddleware = require('./lib/middleware/notes_list');

// We want to initialize DB connection when app starts
/* eslint-disable no-unused-vars */
const db = require('./database/db');
/* eslint-enable no-unused-vars */

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    // extname: '.hbs'
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// MIDDLEWARE FOR PARTIALS
app.use(tasksListMiddleware);
app.use(notesListMiddleware);

// ROUTES DEFINITIONS
app.get('/', handlers.home);
app.get('/contact', handlers.contact);
app.get('/tasks', handlers.tasks);
app.get('/notes', handlers.notes);

app.post('/api/add-task', handlers.api.addTask);
app.post('/api/add-note', handlers.api.addNote);

app.use(handlers.notFound);
app.use(handlers.serverError);

/**
 * to run integration tests application should be available as a module
 */
if(require.main === module) {
    app.listen(port, () => console.log(`Express app is running: http://localhost:${port}`));
} else {
    module.exports = app;
}

