const express = require('express');
const router = express.Router();
const { getAllCertificates, createCertificate, updateCertificate, remove } = require('../controllers/certificates');

router.get('/', getAllCertificates);
router.post('/new', createCertificate);
router.patch('/:cid', updateCertificate);
router.delete('/:cid', remove);

module.exports = router;