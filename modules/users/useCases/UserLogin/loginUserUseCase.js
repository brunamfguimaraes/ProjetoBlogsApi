const Joi = require('joi');

const { findByEmail } = require('../../repositories/UserRepository');
const createAuth = require('../../../../middlewares/createAuth');

const validateLogin = (data) => {
  const { error } = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
  }).validate(data);

  const { message } = error.details[0];

  if (error) {
    throw new Error({ code: 'BAD_REQUEST', message });
  }
};

const emailExists = async (email) => {
  const emailAlreadyExists = await findByEmail(email);

  if (!emailAlreadyExists) {
    throw new Error({ code: 'BAD_REQUEST', message: 'Invalid fields' });
  }

  return emailAlreadyExists;
};

const loginUser = async (data) => {
  const { email } = data;

  validateLogin(data);

  const users = await emailExists(email);
  const { password, image, ...usersDB } = users.dataValues;

  const token = createAuth(usersDB);

  return { token };
};

module.exports = loginUser;