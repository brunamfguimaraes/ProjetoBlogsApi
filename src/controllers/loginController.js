const express = require('express');
const { generateJwtToken } = require('../service/jwtService');

const { isValidUserToLogin } = require('../service/loginService');

const LoginController = express.Router();

LoginController.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await isValidUserToLogin(email, password);

    if (user.errorMessage) {
      const { errorMessage: { message, errorStatus } } = user;
      const sendStatus = errorStatus || 400;
      return res.status(sendStatus).send({ message });
    }

    const token = await generateJwtToken(user.dataValues);
    
    return res.status(200).send({ token });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = LoginController;
