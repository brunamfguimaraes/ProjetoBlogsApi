const express = require('express');

const { User } = require('../models');
const createToken = require('../middleware/createToken');
const validateUser = require('../middleware/userValidate');

const userRouter = express.Router();

userRouter.post('/', validateUser, createToken, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { token } = req;

    await User.create({ displayName, email, password, image });
    res.status(201).json({ token });  
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'invalid data',
    });   
  }
});

module.exports = userRouter;