const HttpError = require('../models/http-error');
const ToolsOrDB = require('../models/toolsdb');

const getToolsOrDbs = async (req, res, next) => {
    let toolsdbs;
    try {
        toolsdbs = await ToolsOrDB.find({});
    } catch (err) {
        return next(new HttpError('Server and database is down.', 500));
    }
    res.json({
       toolsDbs: toolsdbs.map(toolsdb => toolsdb.toObject({getters: true}))
    });
};

const createToolOrDbEntry = async (req, res, next) => {
    const { toolOrDb, expertiseLevel } = req.body;

    const createdToolDbEntry = new ToolsOrDB({ toolOrDb, expertiseLevel });

    try {
        await createdToolDbEntry.save();
    } catch (err) {
        return next(new HttpError('Could not make a tool or db entry, try again.', 500));
    }

    res.status(201).json({ toolDb: createdToolDbEntry.toObject({getters: true}) });
};

const updateToolOrDB = async (req, res, next) => {
    const { toolOrDb, expertiseLevel } = req.body;
    const toolid = req.params.tid;

    let toolDb;
    try {
      toolDb = await ToolsOrDB.findOneAndUpdate({ _id: toolid }, { 
        $set: {
            toolOrDb: toolOrDb,
            expertiseLevel: expertiseLevel
        }
      },
      { returnDocument: true });
    } catch (err) {
        return next(new HttpError('Could not update the tool/db entry, try again.', 500));
    }
  
    res.status(200).json({ toolDb: toolDb.toObject({getters: true}) });
};

const remove = async (req, res, next) => {
    const id = req.params.tid;

    try {
      await ToolsOrDB.deleteOne({ _id: id });          
    } catch (err) {
        return next(new HttpError("Couldn't delete.", 500));
    }

    res.status(200).json({ message: "Deleted!" });
};
 
module.exports = {
   getToolsOrDbs,
   createToolOrDbEntry,
   updateToolOrDB,
   remove
};