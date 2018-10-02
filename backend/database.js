
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.databasUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch(() => {
        console.log('Error in connection');
    });