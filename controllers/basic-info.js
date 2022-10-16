const HttpError = require('../models/http-error');
const BasicInfo = require('../models/BasicInfo');

const getBasicInfo = async (req, res, next) => {
    let basicInfo;
    try {
        basicInfo = await BasicInfo.find({});
    } catch (err) {
        return next(new HttpError('Server and database is down.', 500));
    }
    res.json({
        basicInfo: basicInfo.map(pkg => pkg.toObject({getters: true}))
    });
};

const updateBasicInfo = async (req, res, next) => {
    const {
        name,
        location,
        email,
        educationOrProfession,
        githubProfile,
        ytChannelCoding,
        description
    } = req.body;
    const biid = req.params.biid;

    let updatedBasicInfo;
    try {
      updatedBasicInfo = await BasicInfo.findOneAndUpdate({ _id: biid }, { 
        $set: {
            name: name,
            location: location,
            email: email,
            educationOrProfession: educationOrProfession,
            githubProfile: githubProfile,
            ytChannelCoding: ytChannelCoding,
            description: description
        }
      },
      { returnDocument: true });
    } catch (err) {
        return next(new HttpError('Could not update the BasicInfo, try again.', 500));
    }
  
    res.status(200).json({ BasicInfo: updatedBasicInfo.toObject({getters: true}) });
};

module.exports = { getBasicInfo, updateBasicInfo };