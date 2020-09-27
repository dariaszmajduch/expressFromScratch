const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlers = require('./lib/handlers');
const tasksListMiddleware = require('./lib/middleware/tasks_list');
const db = require('./database/db');

const app = express();
const port = process.env.PORT || 3000;

/**
 * views do not to have to be static (as images or CSS files)
 * Express uses different views engines i.e. Pug or Handlebars (different levels of abstraction)
 * configuration of engine Handlebars engine below, by default layouts should be in views/layouts
 * pages directly in views directory
 * by default 'main' will be used (defaultLayout parameter)
 * default extension is .handlebars, but could be changed by extname parameter
 */
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    // extname: '.hbs'
}));
app.set('view engine', 'handlebars');

/**
 * static files are handled by app.use (it adds middleware)
 * in layout we can add path to file from /public (this directory is not visible for client)
 */
app.use(express.static(__dirname + '/public'));

/**
 * additional middleware used for partials (in views)
 */
app.use(tasksListMiddleware);

/**
 * app.METHOD(route, function)
 * letter size, / at the end, additional parameters after & are ignored
 * i.e. /about, /About, /about/, /about?foo=bar, ...
 * function is called (with defined attributes) when route matches
 */

// ROUTES DEFINITIONS
/**
 * order of routes definition (and middleware) is important! i.e.
 * if we are using wildcard *
 * app.get('/about*', () => { ... });
 * then below routes will never match
 * app.get('/about/contact', () => { ... });
 * app.get('/about/other', () => { ... });
 */
app.get('/', handlers.home);

app.get('/contact', handlers.contact);

/**
 * not standard pages are handled by app.use (it adds middleware)
 * it handles request which do not match to any defined routes
 * if Handlebars engine is used we have to explicitly establish status
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

