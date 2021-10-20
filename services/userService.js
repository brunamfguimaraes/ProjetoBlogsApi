const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = 'Narguileira Monstra';

const schemaUser = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  });

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const msgErr = { message: 'User already registered' };
 
const createUser = async (displayName, email, password, image) => {
   const { error } = schemaUser.validate({ displayName, email, password });
    if (error) {
      return {
      isError: true,
      err: { message: error.details[0].message },
      status: StatusCodes.BAD_REQUEST,
    };
  }
  const user = await Users.findOne({ where: { email } });
  
  if (user) {
    return { isError: true, err: msgErr, status: 409 };
  }

  const newUser = await Users.create({ displayName, email, password, image });

  const { password: _, ...userWithoutPassword } = newUser.dataValues;

  const token = jwt.sign(userWithoutPassword, /* 'narguilada' */ secret, jwtConfig);

  return token;
};

module.exports = {
    createUser,
}; 
