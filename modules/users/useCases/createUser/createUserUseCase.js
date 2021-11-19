const Joi = require('joi');

const { findByEmail, create } = require('../../repositories/UserRepository');

const createAuth = require('../../../../middlewares/createAuth');

const errorMessage = (code, message) => ({
  code,
  message,
});

const validateUser = (data) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().length(6).required(),
  }).validate(data);

  if (error) {
    const { message } = error.details[0];
    throw errorMessage('BAD_REQUEST', message);
  }
};

const emailExists = async (email) => {
  const emailAlreadyExists = await findByEmail(email);

  if (emailAlreadyExists) {
    throw errorMessage('CONFLICT', 'User already registered');
  }
  console.log('RETORNEI');
  return emailAlreadyExists;
};

const createUser = async (data) => {
  const { displayName, email, password } = data;

  const validate = { displayName, email, password }

  validateUser(validate);

  await emailExists(email);

  const users = await create(data);

  const { id } = users; 

  const userInformations = { id, displayName, email };

  const token = createAuth(userInformations);

  return { token };
};

module.exports = createUser;