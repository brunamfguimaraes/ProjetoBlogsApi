const express = require('express');
const { generateJwtToken } = require('../service/jwtService');
const Auth = require('../middlewares/auth');
const { createNewUser, findAllUsers } = require('../service/userService');

const UserRouter = express.Router();

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

module.exports = UserRouter;
