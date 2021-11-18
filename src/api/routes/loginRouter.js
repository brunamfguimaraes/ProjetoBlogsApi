const express = require('express');
const { login } = require('../controllers/loginController');

const router = express.Router();

router.route('/').post(login);

module.exports = router;
