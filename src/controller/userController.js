const express = require('express');

const validationUser = require('../middleware/validations/validationNewUser');

const routeUser = express.Router();

routeUser.post('/', validationUser, async (_req, res) => {
  res.status(201).json('oi');
});

module.exports = routeUser;
