const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const basicInfoSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    email: {  type: String, required: true },
    educationOrProfession: { type: String, required: true },
    githubProfile: { type: String, required: true },
    ytChannelCoding: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('BasicInfo', basicInfoSchema);