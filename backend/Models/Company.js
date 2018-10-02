const mongoose = require('mongoose');
const companySchema = mongoose.Schema({
    companyName: { type: String, required: true },
    address: { type: String, required: true }
});

module.exports = mongoose.model('Company', companySchema);