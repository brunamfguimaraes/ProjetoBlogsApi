const express = require('express');

const router = express.Router();

const { loginController } = require('../controllers/Login');

router.route('/')
.post(loginController);

module.exports = router;
