const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const packageSchema = new Schema({
    package: { type: String, required: true },
    description: { type: String, required: true },
    npmLink: { type: String, required: true },
    githubRepo: { type: String, default: '#' }
});

module.exports = mongoose.model('Package', packageSchema);