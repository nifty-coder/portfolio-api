const express = require('express');
const router = express.Router();
const { getToolsOrDbs, createToolOrDbEntry, updateToolOrDB, remove } = require('../controllers/toolsdb');

router.get('/', getToolsOrDbs);
router.post('/new', createToolOrDbEntry);
router.patch('/:tid', updateToolOrDB);
router.delete('/:tid', remove);

module.exports = router;