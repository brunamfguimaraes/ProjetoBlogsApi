const express = require('express');
const validateJWT = require('../auth/validateJWT');
const controller = require('./userController');

const router = express.Router();

router.route('/')
  .post(controller.create)
  .get(validateJWT, controller.getAll);

router.route('/:id').get(validateJWT, controller.findById);

module.exports = router;
