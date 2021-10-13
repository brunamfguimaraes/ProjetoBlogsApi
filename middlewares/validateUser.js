const Joi = require('joi');
const { User } = require('../models');

const validation = (body) => 
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

module.exports = { validation, verifyEmail };