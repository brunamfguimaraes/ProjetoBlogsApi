const Joi = require('joi');

function userValidation(displayName, email, password, image) {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string().required(),
  }).validate({ displayName, email, password, image });
  if (error) throw error;
}

async function emailValidation(email, Model) {
  const user = await Model.findOne({ where: { email } });
  if (user) {
    const error = new Error('User already registered');
    error.code = 409;
    throw error;
  }
}

function loginValidation(email, password) {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }).validate({ email, password });
  if (error) throw error;
}

function userCheck(user) {
  if (!user) {
    const error = new Error('Invalid fields');
    error.code = 400;
    throw error;
  }
}

function userExists(user) {
  if (!user) {
    const error = new Error('User does not exist');
    error.code = 404;
    throw error;
  }
}

module.exports = {
  userValidation,
  emailValidation,
  loginValidation,
  userCheck,
  userExists,
};
