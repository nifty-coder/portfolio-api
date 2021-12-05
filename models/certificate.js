const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const certificateSchema = new Schema({
    course: { type: String, required: true },
    platform: { type: String, required: true },
    file: { type: String, required: true },
    otherInfo: { type: String, default: '' }
});

module.exports = mongoose.model('Certificate', certificateSchema);