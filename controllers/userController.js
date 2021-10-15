const express = require('express');
const {
  validateDisplayNameLength,
  validateEmailWasInformed,
  validateEmailFormat,
  validateEmailIsAlreadyRegistered,
  validatePasswordWasInformed,
  validatePasswordLength } = require('../middlewares/userMiddlewares');
const { User } = require('../models');

const userRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 1: CONTROLLER responsável por realizar cadastro de usuário via sequelize e retornar usuário cadastrado.

userRouter.post('/',
  validateDisplayNameLength,
  validateEmailWasInformed,
  validateEmailFormat,
  validateEmailIsAlreadyRegistered,
  validatePasswordWasInformed,
  validatePasswordLength, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await User.create({ displayName, email, password, image });

    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// ---------------------------------------------------------------

module.exports = { userRouter };