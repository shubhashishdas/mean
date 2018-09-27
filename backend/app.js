const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log('In Middleware', new Date());
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});

app.get('/api/companies', (req, res, next) => {
    let companies = [
        {
            id: 'asf332423',
            companyName: 'Metacube',
            address: 'Sitapura'
        },
        {
            id: 'asfsdgd332423',
            companyName: 'InfoObject',
            address: 'Jhalana'
        }
    ]
    console.log('In get method');
    res.status(200).json({ isSuccess: true, data: companies });
});

app.post('/api/companies/add', (req, res, next) => {
    console.log(req.body);
    console.log("In post request");
    res.status(201).json({ isSuccess: true, data: req.body });
})

module.exports = app;