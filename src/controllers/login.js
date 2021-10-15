const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const service = require('../services/login');

const secret = process.env.JWT_SECRET;

const loginFunction = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const userExist = email 
  && password 
  && await User.findOne({ where: { email, password } });
  console.log(`userExist: ${userExist}`);
  
  const validations = await service.loginFunction({ email, password }, userExist);

  if ('code' in validations) {
    return next(validations);
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { email, password } }, secret, jwtConfig);
    
  return res.status(200).json({ token });
});

module.exports = { 
  loginFunction,
};