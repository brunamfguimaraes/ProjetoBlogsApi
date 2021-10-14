const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', 
userController.verifyDisplayName,
userController.verifyEmail,
userController.verifyPassword,
userController.verifyUser,
userController.addUser);

router.get('/',
userController.validToken,
userController.getAllUsers);

module.exports = router;