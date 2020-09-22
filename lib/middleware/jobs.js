const getJobsData = () => [
    {
        job: {
            name: 'Blue job',
            // url: '',
            color: 'blue',
        },
        description: 'Blue job - description',
    },
    {
        job: {
            name: 'Yellow job',
            color: 'yellow',
        },
        description: 'Yellow job - description',
    },
    {
        job: {
            name: 'Red job',
            color: 'red',
        },
        description: 'Red job - description',
    },
    {
        job: {
            name: 'Disabled job',
            color: 'disabled',
        },
        description: 'Disabled job - description',
    },
];

const jobsMiddleware = (req, res, next) => {
    /**
     * res.locals is available in each view
     * we do not want to change a context on these views so
     * here we create partials object
     */
    if(!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.jobsContext = getJobsData();
    next();
};

module.exports = jobsMiddleware;
