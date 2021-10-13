const express = require('express');

const {
  createUser,
  verifyFieldsLength,
  verifyEmail,
  verifyFieldsEmpty,
  verifyRegisteredUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', verifyFieldsEmpty,
  verifyFieldsLength, verifyEmail, verifyRegisteredUser, createUser);

module.exports = router;
