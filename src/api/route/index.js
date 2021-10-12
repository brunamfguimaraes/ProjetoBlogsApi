const express = require('express');
const userController = require('../controller/userController');
const loginController = require('../controller/loginController');

const router = express.Router();

router.use('/user', userController);
router.use('/login', loginController);

module.exports = router;