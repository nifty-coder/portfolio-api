const express = require('express');
const router = express.Router();
const { getBasicInfo, updateBasicInfo } = require('../controllers/basic-info');

router.get('/', getBasicInfo);
router.patch('/:biid', updateBasicInfo);

module.exports = router;