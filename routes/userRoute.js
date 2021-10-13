const express = require('express');

const {
  createUser,
  verifyFieldsLength,
  verifyEmail,
  verifyFieldsEmpty,
  verifyRegisteredUser,
} = require('../controllers/userController');

const generateJWT = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', verifyFieldsEmpty,
  verifyFieldsLength, verifyEmail, verifyRegisteredUser, createUser, generateJWT);

module.exports = router;
