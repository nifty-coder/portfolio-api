const HttpError = require('../models/http-error');
const Certificate = require('../models/Certificate');

const getAllCertificates = async (req, res, next) => {
    let certificates;
    try {
        certificates = await Certificate.find({});
    } catch (err) {
        return next(new HttpError('Server and database is down.', 500));
    }
    res.json({
        certificates: certificates.map(certificate => certificate.toObject({getters: true}))
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

    res.status(201).json({ certificate: createdCertificate.toObject({getters: true}) });
};

module.exports = {
    getAllCertificates,
    createCertificate
};