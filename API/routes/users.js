const express = require('express');
const router = express.Router();
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/userController');

router.post('/signup', UserController.userSignup);

router.post('/login', UserController.userLogin);

router.delete('/:userId', UserController.userDelete);

router.get('/', UserController.getUsers);

router.put('/:userId', checkAuth , UserController.updateUser);
 
module.exports = router;

