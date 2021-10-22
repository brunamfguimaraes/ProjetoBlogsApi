const Joi = require('@hapi/joi');
const validateError = require('../middleweres/validateError');
const { User } = require('../../models');

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': '{{#label}} is required',
  'string.empty': '{{#label}} is not allowed to be empty',
});

const loginService = async (user) => {
  const { email, password } = user;

  const { error } = LoginSchema.validate(user);
  if (error) throw validateError(400, error.message);

  const validUser = await User
    .findOne({ where: { email, password } });

  if (validUser === null) {
    throw validateError(400, 'Invalid fields');
  }

  return validUser.dataValues;
};

module.exports = {
  loginService,
};
