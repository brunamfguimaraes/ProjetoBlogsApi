const express = require('express');

const validationUser = require('../middleware/validations/validationNewUser');

const routeUser = express.Router();

routeUser.post('/', validationUser, async (req, res) => {
  console.log(req.body);
  res.status(201).json('oi');
});

module.exports = routeUser;
