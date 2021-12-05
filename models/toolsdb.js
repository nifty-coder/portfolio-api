const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const toolsdbSchema = new Schema({
    toolOrDb: { type: String, required: true },
    expertiseLevel: { type: String, required: true }
});

module.exports = mongoose.model('ToolsOrDB', toolsdbSchema);