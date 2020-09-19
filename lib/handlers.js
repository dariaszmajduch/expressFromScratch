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

exports.serverError = (err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
}
