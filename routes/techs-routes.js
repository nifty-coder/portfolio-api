const express = require('express');
const router = express.Router();
const { getAllTechs, createTechStack } = require('../controllers/techs');

router.get('/', getAllTechs);
router.post('/new', createTechStack);

module.exports = router;