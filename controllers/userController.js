const jwt = require('jsonwebtoken');
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { postUserService, getUsersService, getUserByIdService } = require('../services');

const postUserController = async (req, res, next) => { 
  const { displayName, email, password, image } = req.body;
  
  const errorOnPostUser = await postUserService(displayName, email, password, image);
  if (errorOnPostUser) {
    return next(errorOnPostUser);
  }

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({}, process.env.JWT_SECRET, jwtConfig);

  res.status(StatusCodes.CREATED).json({ token });
};

const getUsersController = async (_req, res, _next) => { 
    const allUsers = await getUsersService();
  
    return res.status(StatusCodes.OK).json(allUsers);
};

const getUserByIdController = async (req, res, next) => { 
  const { id } = req.params;

  const user = await getUserByIdService(id);

  if (user.message) {
    return next(user);
  }

  return res.status(StatusCodes.OK).json(user);
};

module.exports = { postUserController, getUsersController, getUserByIdController };
