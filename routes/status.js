const express = require('express');
const router = express.Router();
const HttpError = require('../models/http-error');
const Status = require('../models/status');

router.get('/', async (req, res, next) => {
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
});

module.exports = router;