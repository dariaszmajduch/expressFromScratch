const mongoose = require('mongoose');

mongoose.connect('mongodb://root:rootpass@mongo:27017/workOrganizer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.error(`MongoDB error: ${err} `);
    process.exit(1);
});

db.once('open', () => {
    console.log('Connected');
});
