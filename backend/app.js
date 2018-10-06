const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Database connection
const database = require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
    console.log('----------------------In Middleware: ', new Date(), '------------------------');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});

// Routes Declare Here
const companyRoutes = require('./routes/company');
app.use('/api/companies', companyRoutes);

module.exports = app;