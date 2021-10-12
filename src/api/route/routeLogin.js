const express = require('express');
const loginController = require('../controller/userController');

const router = express.Router();

router.use('/', loginController);

module.exports = router;