const express = require('express');
const expressHandlebars = require('express-handlebars');
const cookies = require('./lib/cookies');

const app = express();
const port = process.env.PORT || 3000;

/**
 * views do not to have to be static (as images or CSS files)
 * Express uses different views engines i.e. Pug or Handlebars (different levels of abstraction)
 * configuration of engine Handlebars engine below, layouts and pages are defined in views directory
 * if we do not use other layout by default 'main' will be used
 */
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

/**
 * static files are handled by app.use (it adds middleware)
 * in layout we can add path to file from /public (this directory is not visible for client)
 */
app.use(express.static(__dirname + '/public'));

/**
 * app.METHOD(route, function)
 * letter size, / at the end, additional parameters after & are ignored
 * i.e. /about, /About, /about/, /about?foo=bar, ...
 * function is called (with defined attributes) when route matches
 */

// ROUTES DEFINITIONS
/**
 * order of routes definition (and middleware) is important! i.e.
 * app.get('/about*', () => { ... }); - usage of wildcard *
 * app.get('/about/contact', () => { ... }); - it will never match
 * app.get('/about/other', () => { ... }); - it will never match
 */
app.get('/', (req, res) => {
    /**
     * if Handlebars engine is not used (for each page):
     * res.type('text/plain'); - set Content-Type heading
     * res.send('Home page');
     */
    res.render('home');
});

app.get('/about', (req, res) => {
    // send dynamically generated value
    res.render('about', { cookie: cookies.getCookie() });
});

app.get('/about/contact', (req, res) => {
    res.render('contact');
});

/**
 * not standard pages are handled by app.use (it adds middleware)
 * it handles request which do not match to any defined routes
 * if Handlebars engine is used we have to explicitly establish status
 */
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
});

app.listen(port, () => console.log(
    `Express app is running: http://localhost:${port}`
));
