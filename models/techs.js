const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const technologiesSchema = new Schema({
    techLang: { type: String, required: true },
    expertiseLevel: { type: String, required: true }
});

module.exports = mongoose.model('TechStack', technologiesSchema);