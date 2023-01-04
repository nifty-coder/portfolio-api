const HttpError = require('../models/http-error');
const Project = require('../models/project');

const getAllProjects = async (req, res, next) => {
    let projects;
    try {
        projects = await Project.find({});
    } catch (err) {
        return next(new HttpError('Server and database is down.', 500));
    }
    res.json({
        projects: projects.map(project => project.toObject({ getters: true }))
    });
};

const createProject = async (req, res, next) => {
    const {
        webOrMobile,
        name,
        status,
        date,
        description,
        technologies,
        appLogo,
        appUrl,
        githubUrl
    } = req.body;

    const createdProject = new Project({
        webOrMobile,
        name,
        status,
        date,
        description,
        technologies,
        appLogo,
        appUrl,
        githubUrl
    });

    try {
        await createdProject.save();
    } catch (err) {
        return next(new HttpError('Could not make a project entry, try again.', 500));
    }

    res.status(201).json({ project: createdProject.toObject({ getters: true }) });
};

const updateProject = async (req, res, next) => {
    const {
        webOrMobile,
        name,
        status,
        date,
        description,
        technologies,
        appLogo,
        appUrl,
        githubUrl
    } = req.body;
    const prjid = req.params.pid;

    let project;
    try {
      project = await Project.findOneAndUpdate({ _id: prjid }, { 
        $set: {
            webOrMobile: webOrMobile,
            name: name,
            status: status,
            date: date,
            description: description,
            technologies: technologies,
            appLogo: appLogo,
            appUrl: appUrl,
            githubUrl: githubUrl
        }
      },
      { returnDocument: true });
    } catch (err) {
        return next(new HttpError('Could not update the project entry, try again.', 500));
    }
    
    res.status(200).json({ project: project.toObject({ getters: true }) });
};

const remove = async (req, res, next) => {
    const id = req.params.pid;

    try {
      await Project.deleteOne({ _id: id });          
    } catch (err) {
        return next(new HttpError("Couldn't delete.", 500));
    }

    res.status(200).json({ message: "Deleted!" });
};

module.exports = {
    getAllProjects,
    createProject,
    updateProject,
    remove
};