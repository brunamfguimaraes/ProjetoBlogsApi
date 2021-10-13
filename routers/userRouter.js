const express = require('express');
const { createUser } = require('../controllers/userController');
const { validUser, uniqueEmail } = require('../middlewares/userValidations');

const router = express.Router();

router.route('/')
  .post(validUser, uniqueEmail, createUser)
  .get();

module.exports = router;