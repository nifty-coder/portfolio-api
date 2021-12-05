const express = require('express');
const router = express.Router();
const { getAllPackages, createPackage } = require('../controllers/packages');

router.get('/', getAllPackages);
router.post('/new', createPackage);

module.exports = router;