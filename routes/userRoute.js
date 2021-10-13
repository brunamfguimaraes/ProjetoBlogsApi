const express = require('express');

const {
  createUser,
  verifyFieldsLength,
  verifyEmail,
  verifyFieldsEmpty,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', verifyFieldsEmpty, verifyFieldsLength, verifyEmail, createUser);

module.exports = router;
