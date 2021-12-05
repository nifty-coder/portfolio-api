const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const projectSchema = new Schema({
    webOrMobile: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    appLogo: { type: String, required: true },
    appUrl: { type: String, required: true },
    githubUrl: { type: String, required: true }
});

module.exports = mongoose.model('Project', projectSchema);