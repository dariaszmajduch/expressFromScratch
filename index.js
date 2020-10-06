const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlers = require('./lib/handlers');
const tasksListMiddleware = require('./lib/middleware/tasks_list');
const db = require('./database/db');

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    // extname: '.hbs'
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

/**
 * additional middleware used for partials (in views)
 */
app.use(tasksListMiddleware);

// ROUTES DEFINITIONS
app.get('/', handlers.home);
app.get('/contact', handlers.contact);
app.get('/tasks', handlers.tasks);
app.get('/notes', handlers.notes);

/**
 *
 */
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

