const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const Import = require('../models/import');
const checkAuth = require('../middleware/check-auth');
const ImportController = require('../controllers/importController')

router.post('/', ImportController.saveImport);

router.get('/', ImportController.getImport);

router.put('/:packageID', checkAuth, ImportController.updateImport);
 
router.delete('/:id', checkAuth, ImportController.deleteImport);

module.exports = router;