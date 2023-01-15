const HttpError = require('../models/http-error');
const Status = require('../models/status');

const getStatus = async (req, res, next) => {
    let status;
    status = await Status.find({});
    if(status.length == 0) {
        const statusData = new Status({ statusCode: 200, status: '', date: new Date().toString() });
        try {
            await statusData.save();
        } catch (err) {
          return next(new HttpError('Could not make an entry, try again.', 500));
        }
    } 

    res.json({
        status: status.map(statusDF => statusDF)
    });
};

const updateStatus = async (req, res, next) => {
    const { statusCode, status } = req.body;
    const sid = req.params.sid;

    let updatedStatus;
    try {
      updatedStatus = await Status.findOneAndUpdate({ _id: sid }, { 
        $set: {
            statusCode: statusCode,
            status: status,
            date: new Date().toDateString()
        }
      },
      { returnDocument: true });
    } catch (err) {
        return next(new HttpError('Could not update the status, try again.', 500));
    }
  
    res.status(200).json({ status: updatedStatus.toObject({ getters: true }) });
};

module.exports = { getStatus, updateStatus };