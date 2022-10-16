const express = require('express');
const router = express.Router();
const { getAllPackages, createPackage, updatePackage, remove } = require('../controllers/packages');

router.get('/', getAllPackages);
router.post('/new', createPackage);
router.patch('/:pid', updatePackage);
router.delete('/:pid', remove);

module.exports = router;