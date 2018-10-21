const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
// Database connection
const database = require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname + '/images')));
app.set('secret', config.secret);

app.use((req, res, next) => {
    console.log('----------------------In Middleware: ', new Date(), '------------------------');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});

// Routes Declare Here
const companyRoutes = require('./routes/company');
const userRoutes = require('./routes/user');

app.use('/api/companies', companyRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;