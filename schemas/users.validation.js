const Joi = require('joi');
const { User } = require('../models');

const validationCreateUser = (displayName, email, password) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }).validate({ displayName, email, password });
  if (error) throw error;
};

const userExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    const error = new Error('User already registered');
    error.code = 409;
    throw error;
  }
};

module.exports = { validationCreateUser, userExists };
