const HttpError = require('../models/http-error');
const Certificate = require('../models/certificate');

const getAllCertificates = async (req, res, next) => {
    let certificates;
    try {
        certificates = await Certificate.find({}).lean();
    } catch (err) {
        return next(new HttpError('Server and database is down.', 500));
    }
    res.json({
        certificates: certificates.map(certificate => certificate)
    });
};

const createCertificate = async (req, res, next) => {
    const { course, platform, otherInfo, file } = req.body;

    const createdCertificate = new Certificate({ course, platform, otherInfo, file });

    try {
        await createdCertificate.save();
    } catch (err) {
        return next(new HttpError('Could not make a certificate entry, try again.', 500));
    }

    res.status(201).json({ certificate: createdCertificate });
};

const updateCertificate = async (req, res, next) => {
    const { course, platform, file, otherInfo } = req.body;
    const certid = req.params.cid;

    let certificate;
    try {
      certificate = await Certificate.findOneAndUpdate({ _id: certid }, { 
        $set: {
            course: course,
            platform: platform,
            file: file,
            otherInfo: otherInfo
        }
      },
      { returnDocument: true }).lean();
    } catch (err) {
        return next(new HttpError('Could not update the certificate, try again.', 500));
    }
  
    res.status(200).json({ certificate: certificate });
};

const remove = async (req, res, next) => {
    const id = req.params.cid;

    try {
      await Certificate.deleteOne({ _id: id }).lean();          
    } catch (err) {
        return next(new HttpError("Couldn't delete.", 500));
    }

    res.status(200).json({ message: "Deleted!" });
};

module.exports = {
    getAllCertificates,
    createCertificate,
    updateCertificate,
    remove
};