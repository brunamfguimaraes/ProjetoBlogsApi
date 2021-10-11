const express = require('express');

const router = express.Router();

const usersController = require('../controller/usersController');

router.post('/', usersController.loginUser);

module.exports = router;