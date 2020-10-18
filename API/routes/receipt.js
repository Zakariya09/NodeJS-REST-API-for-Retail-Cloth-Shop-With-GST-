const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const Receipt = require('../models/receipt');
const checkAuth = require('../middleware/check-auth');
const ReceiptController = require('../controllers/receiptController')

router.post('/', ReceiptController.saveReceipt);

router.get('/', ReceiptController.getReceipt);

router.put('/:receiptId',  ReceiptController.updateReceipt);
 
router.delete('/:id', ReceiptController.deleteReceipt);

module.exports = router;