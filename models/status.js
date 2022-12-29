const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const statusSchema = new Schema({
    statusCode: { type: Number, required: true },
    status: { type: String, required: false },
    date: { type: String, required: false }
});

module.exports = mongoose.model('Status', statusSchema);