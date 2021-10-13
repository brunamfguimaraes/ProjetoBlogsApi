const express = require('express');
const createJWT = require('../middlewares/token/createJWT');
const validateJWT = require('../middlewares/token/validateJWT');
const userValidate = require('../middlewares/userValidate');
const { User } = require('../models');

const UserRouter = express.Router();

UserRouter.post('/', userValidate, createJWT, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { token } = req;

    await User.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

UserRouter.get('/', validateJWT, async (_req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = UserRouter;