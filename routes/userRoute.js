const express = require('express');

const { createUser, verifyFields, verifyEmail } = require('../controllers/userController');

const router = express.Router();

router.post('/', verifyFields, verifyEmail, createUser);

module.exports = router;
