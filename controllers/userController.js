const express = require('express');
const { validateDisplayNameLength } = require('../middlewares/userMiddlewares');
const { User } = require('../models');

const userRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 1: CONTROLLER responsável por receber a requisição de cadastro de usuário, chamar SERVICE e retornar o usuário cadastrado.

userRouter.post('/', validateDisplayNameLength, async (req, res) => {
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