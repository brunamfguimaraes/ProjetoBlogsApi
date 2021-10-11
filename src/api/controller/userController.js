const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const validationUser = require('../middleware/validations/validationNewUser');
const { createUser } = require('../service/userService');

const routeUser = express.Router();

routeUser.post('/', validationUser, async (req, res, next) => {
  const { displayName, email } = req.body;
  const result = await createUser(req.body);
  if (result.isError) {
    return next(result);
  }
  const tempo = {
    expiresIn: '1d',
  };
  const token = jwt.sign({ displayName, email }, secret, tempo);
  return res.status(201).json({ token });
});

module.exports = routeUser;
