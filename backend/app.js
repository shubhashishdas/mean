const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
// Database connection
const database = require('./database');

const whiteList = ['http://localhost:4200']
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed By Cors'));
        }
    }
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname + '/images')));
app.set('secret', config.secret);

// Routes Declare Here
const companyRoutes = require('./routes/company');
const userRoutes = require('./routes/user');

app.use('/api/companies', companyRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;