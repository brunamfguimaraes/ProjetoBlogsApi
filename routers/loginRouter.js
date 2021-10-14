const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/',
loginController.verifyEmail,
loginController.verifyPassword,
loginController.loginUser);

module.exports = router;