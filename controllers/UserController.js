const express = require('express');
const { User } = require('../models');

const UserRouter = express.Router();

UserRouter.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    
    const user = await User.create({ displayName, email, password, image });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = UserRouter;