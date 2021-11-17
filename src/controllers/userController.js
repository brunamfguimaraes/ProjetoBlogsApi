const express = require('express');
const jwt = require('jsonwebtoken');
const { generateJwtToken } = require('../service/jwtService');
const Auth = require('../middlewares/auth');
const { createNewUser, findAllUsers, findUserById, deleteUser } = require('../service/userService');

const UserRouter = express.Router();

UserRouter.delete('/me', Auth, async (req, res) => {
  try {
    const token = req.headers.authorization;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    await deleteUser(user.data.id);

    return res.status(204).send();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

UserRouter.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const user = await createNewUser(displayName, email, password, image);

    if (user.errorMessage) {
      const { errorMessage: { message, errorStatus } } = user;
      const sendStatus = errorStatus || 400;
      return res.status(sendStatus).send({ message });
    }

    const token = await generateJwtToken(user.dataValues);
    
    return res.status(201).send({ token });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

UserRouter.get('/', Auth, async (_req, res) => {
  const users = await findAllUsers();
  
  return res.status(200).json(users);
});

UserRouter.get('/:id', Auth, async (req, res) => {
  const { id } = req.params;

  const user = await findUserById(id);
  
  if (!user) {
    return res.status(404).send({ message: 'User does not exist' });
  }

  return res.status(200).json(user);
});

module.exports = UserRouter;
