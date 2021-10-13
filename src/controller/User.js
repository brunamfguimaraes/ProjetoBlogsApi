const express = require('express');
const bodyParser = require('body-parser');

const route = express.Router();
route.use(bodyParser.json());

const {
  validateNameSignUp,
  validateEmailSignUp,
  validatePasswordSignUp,
} = require('../middlewares/User');

const userService = require('../service/User');
const httpStatus = require('../httpStatus');

route.post('/',
  validateNameSignUp,
  validateEmailSignUp,
  validatePasswordSignUp,
  async (req, res) => {
    const { email, displayName, password, image } = req.body;
    const userAlreadyExists = await userService.checkUserExistence(email);
    if (userAlreadyExists) {
      return res.status(httpStatus.conflict).json({ message: 'User already registered' });
    }
    const token = await userService.createUser(displayName, email, password, image);
    return res.status(httpStatus.created).json({ token });
});

module.exports = route;