const express = require('express');
const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');

const { createUser, allUser } = require('../services/userService');
const userValidate = require('../middlewares/userValidate');
const validateJWT = require('../middlewares/validateJWT');
const { creatorToken } = require('../helpers/token');

const userRouter = express.Router();

userRouter.post('/',
  userValidate,
  rescue(async (req, res) => {
    const user = await createUser(req.body);
    if (user.isError) {
      return res.status(user.code).json({ message: user.message });
    }
    const token = await creatorToken(req.body); 
    return res.status(StatusCodes.CREATED).json({ token });
  }));

userRouter.get('/',
  validateJWT,
  rescue(async (req, res) => {
    const users = await allUser();
    return res.status(StatusCodes.OK).json(users);
  }));

module.exports = userRouter;
