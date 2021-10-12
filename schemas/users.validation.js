// const Joi = require('joi');
const { User } = require('../models');

/* const validateEmptyFields = (displayName, email, password) => {
  const { error } = Joi.object({
    displayName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ displayName, email, password });
  if (error) throw error;
}; */

const verifyDisplayName = (displayName) => {
  if (displayName.length < 8) {
    const error = new Error(
      '"displayName" length must be at least 8 characters long',
    );
    error.code = 400;

    throw error;
  }
  return true;
};
const verifyEmail = (email) => {
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  if (!emailRegex.test(email)) {
    const error = new Error('"email" must be a valid email');
    error.code = 400;
    throw error;
  }
};

const isEmailEmpty = (email) => {
  if (!email) {
    const error = new Error('"email" is required');
    error.code = 400;
    throw error;
  }
};
const isPasswordEmpty = (password) => {
  if (!password) {
    const error = new Error('"password" is required');
    error.code = 400;
    throw error;
  }
};

const verifyPassword = (password) => {
  if (password.length !== 6) {
    const error = new Error('"password" length must be 6 characters long');
    error.code = 400;
    throw error;
  }
};

const userExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    const error = new Error('User already registered');
    error.code = 409;
    throw error;
  }
};

module.exports = {
  userExists,
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  isEmailEmpty,
  isPasswordEmpty,
  /*  validateEmptyFields */
};
