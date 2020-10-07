const db = require('./../../database/db');

const getTasksList = async () => {
    const tasks = await db.getTasksFromDB({});
    return {
        tasks: tasks.map(task => {
            return {
                id: task._id,
                name: task.name,
                description: task.description,
                isStarted: task.isStarted,
                type: task.type
            }
        })
    };
};

const tasksListMiddleware = async (req, res, next) => {
    if(!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.tasksListContext = await getTasksList();
    next();
};

module.exports = tasksListMiddleware;
