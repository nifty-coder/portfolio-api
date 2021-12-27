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

const updatePackage = async (req, res, next) => {
    const { package, description, npmLink, githubRepo } = req.body;
    const pkgid = req.params.pid;

    let updPackage;
    try {
      updPackage = await Package.findOneAndUpdate({ _id: pkgid }, { 
        $set: { 
            package: package, 
            description: description, 
            npmLink: npmLink, 
            githubRepo: githubRepo 
        }
      },
      { returnDocument: true });
    } catch (err) {
        return next(new HttpError('Could not update the package, try again.', 500));
    }
  
    res.status(200).json({ package: updPackage.toObject({getters: true}) });
};

const remove = async (req, res, next) => {
    const id = req.params.pid;

    try {
      await Package.deleteOne({ _id: id });          
    } catch (err) {
        return next(new HttpError("Couldn't delete.", 500));
    }

    res.status(200).json({ message: "Deleted!" });
};

module.exports = {
    getAllPackages,
    createPackage,
    updatePackage,
    remove
};