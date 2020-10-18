const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const Sale = require('../models/sales');
const checkAuth = require('../middleware/check-auth');
const SaleController = require('../controllers/saleController')

router.post('/', SaleController.saveSale);

router.get('/', SaleController.getSale);

router.put('/:saleID', checkAuth,SaleController.updateSale);
 
router.delete('/:id', checkAuth, SaleController.deleteSale);

module.exports = router;