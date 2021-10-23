const Joi = require('joi');
const MyError = require('./errorClass');
const { User } = require('../models');

async function bodyValidator(user) {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({ 
      'string.min': '"password" length must be 6 characters long',
     }),
    image: Joi.string(),
  }).validate(user);

  if (error) throw new MyError(error.details[0].message, 400);
}

async function userExistsValidator({ email }) {
  const user = await User.findAll({ where: { email } });
  
  if (user.length) throw new MyError('User already registered', 409);
}

module.exports = {
  userExistsValidator,
  bodyValidator,
};