const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');
const OrderController = require('../controllers/orderController')

router.get('/', checkAuth, OrderController.orders_get_all);
router.post('/', checkAuth, OrderController.save_order);
router.get('/:orderId', checkAuth,OrderController.get_order_byId)
router.delete('/:orderId', checkAuth, OrderController.delete_order)

module.exports = router;