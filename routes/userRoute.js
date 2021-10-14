const express = require('express');
const { validateFilds } = require('../middlewares/validations');
const { createUser } = require('../controller/User');

const router = express.Router();

router.route('/')
  .post(validateFilds, createUser);

  module.exports = router;