const express = require('express');
const { generateJwtToken } = require('../service/jwtService');

const { createNewUser } = require('../service/userService');

const UserRouter = express.Router();

UserRouter.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const user = await createNewUser(displayName, email, password, image);

    if (user.errorMessage) {
      return res.status(400).send(user.errorMessage);
    }

    const token = await generateJwtToken(user.dataValues);
    
    return res.status(201).send({ token });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = UserRouter;
