const express = require('express');

const { User } = require('../models');

const loginRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 2: CONTROLLER responsável por realizar cadastro de usuário via sequelize e retornar usuário cadastrado.

loginRouter.post('/', async (req, res) => {
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

module.exports = { loginRouter };