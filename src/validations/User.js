const Joi = require('joi');

const validateBodyLogin = (body) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }).validate(body);

  if (error) throw error;
};

const validateBodyRequest = (body) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }).validate(body);

  if (error) throw error;
};

const checkUserExistence = (user) => {
  if (!user) {
    const err = new Error('User does not exist');
    err.statusCode = 404;
    throw err;
  }
};

const searchForExistingEmail = async (email, userModel) => {
  const existsEmail = await userModel.findOne({ where: { email } });
  if (existsEmail) {
    const err = new Error('User already registered');
    err.statusCode = 409;
    throw err;
  }
};

const validateUser = (validUser) => {
  if (!validUser) {
    const err = new Error('Invalid fields');
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  checkUserExistence,
  validateBodyLogin,
  validateBodyRequest,
  validateUser,
  searchForExistingEmail,
};
