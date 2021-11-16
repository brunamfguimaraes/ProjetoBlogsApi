const express = require('express');

const { createNewUser } = require('../service/userService');

const UserRouter = express.Router();

UserRouter.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const { errorMessage } = await createNewUser(displayName, email, password, image);

    if (errorMessage) {
      return res.status(400).send(errorMessage);
    }
    
    return res.status(201).send({ message: 'Usuário criado com sucesso' });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = UserRouter;
