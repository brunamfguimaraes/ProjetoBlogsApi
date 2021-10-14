const express = require('express');

const { makeLogin } = require('../controllers/loginController');

const generateJWT = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', makeLogin, generateJWT);

module.exports = router;
