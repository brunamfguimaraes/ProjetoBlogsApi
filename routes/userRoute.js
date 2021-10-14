const express = require('express');

const {
  createUser,
  verifyFieldsLength,
  verifyEmail,
  verifyFieldsEmpty,
  verifyRegisteredUser,
  getAllUsers,
} = require('../controllers/userController');

const { generateJWT, validateJWT } = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', verifyFieldsEmpty,
  verifyFieldsLength, verifyEmail, verifyRegisteredUser, createUser, generateJWT);

router.get('/', validateJWT, getAllUsers);

module.exports = router;
