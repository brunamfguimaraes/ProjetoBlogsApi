const express = require('express');
const validateJWT = require('../auth/validateJWT');
const controller = require('./categoriesController');

const router = express.Router();

router.route('/')
  .post(validateJWT, controller.create)
  .get(validateJWT, controller.getAll);

module.exports = router;
