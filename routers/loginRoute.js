const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/',
    loginController.checkEmail,
    loginController.checkPassword,
    loginController.loginUser);

module.exports = router; 
