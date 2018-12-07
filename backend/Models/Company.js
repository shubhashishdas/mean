const mongoose = require('mongoose');
const companySchema = mongoose.Schema({
    companyName: { type: String, required: true },
    address: { type: String, required: false },
    imagePath: { type: String, default: null },
    applied: { type: Boolean, default: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Company', companySchema);