const express = require('express');

const validateLogin = require('../middlewares/validations/loginUser');
const { createJWT } = require('../middlewares/tokenJWT');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/', validateLogin, createJWT, loginController);

module.exports = router;