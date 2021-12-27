const express = require('express');
const router = express.Router();
const { getAllProjects, createProject, updateProject, remove } = require('../controllers/projects');

router.get('/', getAllProjects);
router.post('/new', createProject);
router.patch('/:pid', updateProject);
router.delete('/:pid', remove);

module.exports = router;