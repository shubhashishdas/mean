const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports.signin = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    isSuccess: false,
                    message: "Email address not found"
                })
            }
            if (user.password == req.body.password) {
                return { match: true, user: user }
            } else {
                return { match: false }
            }
        })
        .then((response) => {
            if (response.match) {
                let payload = { email: response.user.email, userId: response.user._id };
                const token = jwt.sign(
                    payload,
                    req.app.get('secret'),
                    { expiresIn: '1h' }
                );
                res.status(200).json({ isSuccess: true, token: "Bearer " + token, expiresIn: 3600, user: response.user });
            } else {
                res.status(401).json({ isSuccess: false, message: 'Authentication failed' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(401).json({ isSuccess: false });
        });
};

module.exports.signup = (req, res, next) => {
    console.log(req);
    const user = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    });

    user.save()
        .then((result) => {
            res.status(201).json({
                isSuccess: true,
                data: result
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                isSuccess: false
            });
        });
};