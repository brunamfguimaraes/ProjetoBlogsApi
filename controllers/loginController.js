const express = require('express');
const {
  validateEmailIsEmpty,
  validateEmailWasInformed,
  validatePasswordIsEmpty,
  validatePasswordWasInformed, 
  validateUserIsRegistered } = require('../middlewares/userMiddlewares');
const { generateToken } = require('../helpers/generateToken');

const loginRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 2: CONTROLLER responsável por realizar login de usuário via sequelize e retornar token.

loginRouter.post('/',
  validateEmailIsEmpty,
  validateEmailWasInformed,
  validatePasswordIsEmpty,
  validatePasswordWasInformed,
  validateUserIsRegistered, async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = generateToken({ email, password });

    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

// ---------------------------------------------------------------

module.exports = { loginRouter };