const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.post('/signup', (req, res, next) => {
    console.log(req);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });
});

module.exports = router;