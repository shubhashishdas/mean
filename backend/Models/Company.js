const mongoose = require('mongoose');
const companySchema = mongoose.Schema({
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    imagePath: { type: String, default: null }
});

module.exports = mongoose.model('Company', companySchema);