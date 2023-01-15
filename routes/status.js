const express = require('express');
const { getStatus, updateStatus } = require('../controllers/status');
const router = express.Router();

router.get('/', getStatus);
router.patch('/:sid', updateStatus);

module.exports = router;