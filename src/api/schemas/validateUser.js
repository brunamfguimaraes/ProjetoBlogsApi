const Joi = require('joi');
const { User } = require('../../models');
const { ApiError } = require('../utils/ApiError');

const validateUserData = async (body) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    image: Joi.string(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
    }),
  }).validate(body);
  if (error) {
    throw new ApiError(error.details[0].message, 400);
  }
};

const validateLoginData = async (body) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(body);
  if (error) {
    throw new ApiError(error.details[0].message, 400);
  }
};

const userExists = async (email) => {
  const user = await User.findAll({ where: { email } });
  return !!user.length;
};

module.exports = {
  validateUserData,
  userExists,
  validateLoginData,
};
