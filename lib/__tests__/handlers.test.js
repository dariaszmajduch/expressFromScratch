const handlers = require('../handlers');

test('main page is rendered', () => {
    /**
     * 1. create empty object for request and dummy function render for response (using jest.fn())
     * 2. call a function
     * 3. assertion - check if response render method is called once with expected value (home)
     */
    const req = {};
    const res = { render: jest.fn() };
    handlers.home(req, res);
    expect(res.render.mock.calls[0][0]).toBe('home');
});

test('about page is rendered with random cookie', () => {
    /**
     * function about is called with additional object cookie, so we check if this argument contains at least one char
     */
    const req = {};
    const res = { render: jest.fn() };
    handlers.about(req, res);

    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('about');
    expect(res.render.mock.calls[0][1]).toEqual(expect.objectContaining({cookie: expect.stringMatching(/\W/)}));
});

test('contact page is rendered', () => {
    const req = {};
    const res = { render: jest.fn() };
    handlers.contact(req, res);

    expect(res.render.mock.calls[0][0]).toBe('contact');
});

test('404 page is rendered', () => {
    /**
     * there is also status method so in res object we have to create dummy function
     * and prepare additional assertion
     */
    const req = {};
    const res = { status: jest.fn(), render: jest.fn() };
    handlers.notFound(req, res);

    expect(res.status.mock.calls.length).toBe(1);
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('404');
});

test('505 page is rendered', () => {
    /**
     * function serverError takes four arguments so we need additional dummies err and next function
     * there is also console.error so we have to mock it and check it in additional assertion
     */
    const err = new Error('some error');
    const req = {};
    const res = { status: jest.fn(), render: jest.fn() };
    const next = jest.fn();
    console.error = jest.fn();
    handlers.serverError(err, req, res, next);

    expect(console.error.mock.calls[0][0]).toBe('some error');
    expect(res.status.mock.calls.length).toBe(1);
    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('500');
});
