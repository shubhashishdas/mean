const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.pre('save', (next) => {
    if (!this.isModified('password')) return next();

    bcrypt.genSalt(10)
        .then((err, salt) => {
            if (err) return next(err);
            bcrypt.hash(this.user, salt)
                .then((err, hash) => {
                    if (err) return next(err);
                    this.password = hash;
                    next();
                });
        });
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);