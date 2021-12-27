const HttpError = require('../models/http-error');
const TechStack = require('../models/techs');

const getAllTechs = async (req, res, next) => {
    let techs;
    try {
        techs = await TechStack.find({});
    } catch (err) {
        return next(new HttpError('Server and database is down.', 500));
    }
    res.json({
       techs: techs.map(tech => tech.toObject({getters: true}))
    });
};

const createTechStack = async (req, res, next) => {
    const { techLang, expertiseLevel } = req.body;

    const createdTechTB = new TechStack({ techLang, expertiseLevel });

    try {
        await createdTechTB.save();
    } catch (err) {
        return next(new HttpError('Could not make a tech stack entry, try again.', 500));
    }

    res.status(201).json({ technologies: createdTechTB.toObject({getters: true}) });
};

const updateTechStack = async (req, res, next) => {
    const { techLang, expertiseLevel } = req.body;
    const techid = req.params.tid;

    let techStack;
    try {
      techStack = await TechStack.findOneAndUpdate({ _id: techid }, { 
        $set: {
            techLang: techLang,
            expertiseLevel: expertiseLevel
        }
      },
      { returnDocument: true });
    } catch (err) {
        return next(new HttpError('Could not update the tech stack entry, try again.', 500));
    }
  
    res.status(200).json({ techStack: techStack.toObject({getters: true}) });
};

const remove = async (req, res, next) => {
    const id = req.params.tid;

    try {
      await TechStack.deleteOne({ _id: id });          
    } catch (err) {
        return next(new HttpError("Couldn't delete.", 500));
    }

    res.status(200).json({ message: "Deleted!" });
};

module.exports = {
    getAllTechs,
    createTechStack,
    updateTechStack,
    remove
};