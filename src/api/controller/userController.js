const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const validationUser = require('../middleware/validations/validationNewUser');

const routeUser = express.Router();

routeUser.post('/', validationUser, async (req, res) => {
  const { displayName, email } = req.body;
  const tempo = {
    expiresIn: '1d',
  };
  const token = jwt.sign({ displayName, email }, secret, tempo);
  res.status(201).json({ token });
});

module.exports = routeUser;
