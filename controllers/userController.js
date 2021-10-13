const jwt = require('jsonwebtoken');
require('dotenv').config();
const { postUserService } = require('../services');

const postUserController = async (req, res, next) => { 
  const { displayName, email, password, image } = req.body;
  
  const errorOnPostUser = await postUserService(displayName, email, password, image);
  if (errorOnPostUser) {
    return next(errorOnPostUser);
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({}, process.env.JWT_SECRET, jwtConfig);

  res.status(201).json({ token });
};

module.exports = { postUserController };
