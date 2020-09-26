const getTasksList = () => [
    {
        taskName: 'First task',
        description: 'Description for first task job',
        isStarted: 'yes',
        taskType: 'manual, automated',
    },
    {
        taskName: 'Second task',
        description: 'Description for second task job',
        isStarted: 'yes',
        taskType: 'jenkins',
    },
    {
        taskName: 'Third task',
        description: 'Description for third task job',
        isStarted: 'yes',
        taskType: 'other',
    },
    {
        taskName: 'Fourth task',
        description: 'Description for fourth task job',
        isStarted: 'yes',
        taskType: 'manual, other',
    },
];

const tasksListMiddleware = (req, res, next) => {
    /**
     * res.locals is available in each view
     * we do not want to change a context on these views so
     * here we create partials object
     */
    if(!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.tasksListContext = getTasksList();
    next();
};

module.exports = tasksListMiddleware;
