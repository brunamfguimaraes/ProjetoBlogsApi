const express = require('express');

const { User } = require('../models');
const createToken = require('../middleware/createToken');
const validateUser = require('../middleware/userValidate');
const verifyToken = require('../middleware/verifyToken');
const userService = require('../services/userService');

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

userRouter.get('/', verifyToken, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });     
  }
});

userRouter.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.findById(id);

    if (user.fieldError) {
      return res.status(404).json({ message: user.message });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });     
  }
});

module.exports = userRouter;