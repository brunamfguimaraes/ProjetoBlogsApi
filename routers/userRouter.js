const express = require('express');
const { create } = require('../controller/userController');

const router = express.Router();

router.route('/')
  .post(create)
  .get();

module.exports = router;
