const db = require('./../../database/db');

const getTasksList = async () => {
    const tasks = await db.getTasks({});
    return {
        tasks: tasks.map(task => {
            return {
                name: task.name,
                description: task.description,
                isStarted: task.isStarted,
                type: task.type
            }
        })
    };
};

const tasksListMiddleware = async (req, res, next) => {
    /**
     * res.locals is available in each view
     * we do not want to change a context on these views so
     * here we create partials object
     */
    if(!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.tasksListContext = await getTasksList();
    next();
};

module.exports = tasksListMiddleware;
