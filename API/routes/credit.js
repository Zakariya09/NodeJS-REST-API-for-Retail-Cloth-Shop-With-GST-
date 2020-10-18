const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const Credit = require('../models/credit');
const checkAuth = require('../middleware/check-auth');
const CreditController = require('../controllers/creditController')

router.post('/', CreditController.saveCredit);

router.get('/', CreditController.getCredit);

router.put('/:creditID', checkAuth, CreditController.updateCredit);
 
router.delete('/:id', checkAuth, CreditController.deleteCredit);

module.exports = router;