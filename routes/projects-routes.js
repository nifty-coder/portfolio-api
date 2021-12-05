const express = require('express');
const router = express.Router();
const { getAllProjects, createProject } = require('../controllers/projects');

router.get('/', getAllProjects);
router.post('/new', createProject);

module.exports = router;