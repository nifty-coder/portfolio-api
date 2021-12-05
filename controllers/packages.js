const HttpError = require('../models/http-error');
const Package = require('../models/package');

const getAllPackages = async (req, res, next) => {
    let packages;
    try {
        packages = await Package.find({});
    } catch (err) {
        return next(new HttpError('Server and database is down.', 500));
    }
    res.json({
        packages: packages.map(pkg => pkg.toObject({getters: true}))
    });
};

const createPackage = async (req, res, next) => {
    const { package, description, npmLink, githubRepo } = req.body;

    const createdPackage = new Package({ package, description, npmLink, githubRepo });

    try {
        await createdPackage.save();
    } catch (err) {
        return next(new HttpError('Could not make a package entry, try again.', 500));
    }

    res.status(201).json({ package: createdPackage.toObject({getters: true}) });
};

module.exports = {
    getAllPackages,
    createPackage
};