const express = require('express');
const router = express.Router();
const { getAllTechs, createTechStack, updateTechStack, remove } = require('../controllers/techs');

router.get('/', getAllTechs);
router.post('/new', createTechStack);
router.patch('/:tid', updateTechStack);
router.delete('/:tid', remove);

module.exports = router;