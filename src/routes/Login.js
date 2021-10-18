const express = require('express');
const { attempLogin } = require('../controllers/Login');

const router = express.Router();

router.route('/')
  .post(attempLogin);

module.exports = router;