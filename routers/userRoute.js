const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', 
    userController.checkDisplayName,
    userController.checkEmail,
    userController.checkPassword,
    userController.checkUser,
    userController.addUser);

module.exports = router; 
