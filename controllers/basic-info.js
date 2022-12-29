const HttpError = require('../models/http-error');
const BasicInfo = require('../models/basic-info');
const basicInfoDetails = require('../data/basic-info');

const getBasicInfo = async (req, res, next) => {
    let basicInfo;
    basicInfo = await BasicInfo.find({});
    if(basicInfo.length == 0) {
        const basicInfoDetailsData = new BasicInfo(basicInfoDetails);
        try {
            await basicInfoDetailsData.save();
        } catch (err) {
          return next(new HttpError('Could not make an entry, try again.', 500));
        }
    } 

    res.json({
        basicInfo: basicInfo.map(basicInfoDF => basicInfoDF.toObject({getters: true}))
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
  
    res.status(200).json({ basicInfo: updatedBasicInfo.toObject({ getters: true }) });
};

module.exports = { getBasicInfo, updateBasicInfo };