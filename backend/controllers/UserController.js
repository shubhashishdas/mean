const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.signin = (req, res, next) => {
    let fetchUserData;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    isSuccess: false,
                    message: "Email address not found"
                })
            }
            fetchUserData = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((response) => {
            if (response) {
                let payload = { email: fetchUserData.email, userId: fetchUserData._id };
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
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            password: hash,
        });
        user.save()
            .then((result) => {
                res.status(201).json({
                    isSuccess: true,
                    data: result
                });
            })
            .catch((error) => {
                res.status(400).json({
                    isSuccess: false
                });
            });
    });

};