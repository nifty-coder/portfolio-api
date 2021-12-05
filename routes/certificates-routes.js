const express = require('express');
const router = express.Router();
const { getAllCertificates, createCertificate } = require('../controllers/certificates');

router.get('/', getAllCertificates);
router.post('/new', createCertificate);

module.exports = router;