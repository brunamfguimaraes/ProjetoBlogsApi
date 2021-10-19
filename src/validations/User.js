const Joi = require('joi');

const checkBodyRequest = (bodyObj) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }).validate(bodyObj);

  if (error) throw error;
};

const checkBodyLogin = (bodyObj) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }).validate(bodyObj);

  if (error) throw error;
};

const checkUser = (validUser) => {
  if (!validUser) {
    const err = new Error('Invalid fields');
    err.statusCode = 400;
    throw err;
  }
};

const checkEmailExists = async (email, Model) => {
  const user = await Model.findOne({ where: { email } });
  if (user) {
    const err = new Error('User already registered');
    err.statusCode = 409;
    throw err;
  }
};

const checkIfUserExists = (user) => {
  if (!user) {
    const err = new Error('User does not exist');
    err.statusCode = 404;
    throw err;
  }
};

module.exports = {
  checkBodyRequest,
  checkBodyLogin,
  checkUser,
  checkEmailExists,
  checkIfUserExists,
};
