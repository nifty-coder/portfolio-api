const express = require('express');
const router = express.Router();
const { getToolsOrDbs, createToolOrDbEntry } = require('../controllers/toolsdb');

router.get('/', getToolsOrDbs);
router.post('/new', createToolOrDbEntry);

module.exports = router;