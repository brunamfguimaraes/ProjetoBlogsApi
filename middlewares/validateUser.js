const Joi = require('joi');
const { User } = require('../models');

const validationUser = (body) => 
  Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }).validate(body);

const verifyEmail = async (email) => {
  const findUserByEmail = await User.findOne({ where: { email } });
  
  if (findUserByEmail) {
    const err = new Error('User already registered');
    err.statusCode = 409;
    return err;
  }
};

const verifyUserById = async (id) => {
  const findUserById = await User.findOne({ where: { id } });
  
  if (!findUserById) {
    const err = new Error('User does not exist');
    err.statusCode = 404;
    return err;
  }

  return findUserById;
};

module.exports = { 
  validationUser, 
  verifyEmail, 
  verifyUserById,
};