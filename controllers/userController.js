const express = require('express');
const {
  validateDisplayNameLength,
  validateEmailWasInformed,
  validateEmailFormat,
  validateEmailIsAlreadyRegistered,
  validatePasswordWasInformed,
  validatePasswordLength, 
  validateJWT } = require('../middlewares/userMiddlewares');
const { User } = require('../models');

const userRouter = express.Router();

const errors = {
  somethingIsWrong: 'Algo deu errado',
  userDoesNotExist: 'User does not exist',
};

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
    return res.status(500).json({ message: errors.somethingIsWrong });
  }
});

// ---------------------------------------------------------------
// Requisito 3: CONTROLLER responsável por realizar busca de usuários via sequelize e retornar usuários cadastrados.

userRouter.get('/', validateJWT, async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: errors.somethingIsWrong });
  }
});

// ---------------------------------------------------------------
// Requisito 4: CONTROLLER responsável por realizar busca de usuário por ID via sequelize e retornar o usuário cadastrado.

userRouter.get('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    // Comments: refatorar para utlizar middleware
    if (!user) {
      return res.status(404).json({ message: errors.userDoesNotExist });
    }

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: errors.somethingIsWrong });
  }
});

// ---------------------------------------------------------------
// Requisito 12: CONTROLLER responsável por deletar o usuário requisitante, via sequelize.

userRouter.delete('/me', validateJWT, async (req, res) => {
  try {
    const { user } = req;

    // Source: https://sequelize.org/master/manual/model-instances.html
    await user.destroy(); 

    return res.status(204).end();
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: errors.somethingIsWrong });
  }
});

// ---------------------------------------------------------------

module.exports = { userRouter };