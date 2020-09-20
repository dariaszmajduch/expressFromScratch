const cookies = require('./cookies');

exports.home = (req, res) => { 
    /**
     * if Handlebars engine is not used (for each page):
     * res.type('text/plain'); - set Content-Type heading
     * res.send('Home page');
     */
    res.render('home');
}

exports.about = (req, res) => {
    // send dynamically generated value
    res.render('about', { cookie: cookies.getCookie() });
}

exports.contact = (req, res) => res.render('contact');

exports.notFound = (req, res) => {
    res.status(404);
    res.render('404');
}

/**
 * in Express error handling is recognized by number of arguments
 * so we can not remove unused 'next' argument - error pointed by ESLint, but
 * we can disable this rule for this part of code 
 */
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
}
/* eslint-enable no-unused-vars */
