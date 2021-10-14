const express = require('express');

const validateLogin = require('../middlewares/validations/loginUser');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/', validateLogin, loginController);

module.exports = router;