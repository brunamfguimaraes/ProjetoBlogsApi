const express = require('express');
const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');

const { createUser, allUser, userByID } = require('../services/userService');
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

  userRouter.get('/:id',
    validateJWT,
    rescue(async (req, res) => {
      const { id } = req.params;
      const user = await userByID(id);
      if (user.isError) {
        return res.status(user.code).json({ message: user.message });
      }
      return res.status(StatusCodes.OK).json(user);
    }));

module.exports = userRouter;
