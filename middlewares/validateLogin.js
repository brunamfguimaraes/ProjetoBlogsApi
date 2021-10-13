const Joi = require('joi');
const { User } = require('../models');

const validationLogin = (body) => 
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }).validate(body);

const existsUser = async (email, password) => {
  const findedUser = await User.findOne({ where: { email, password } });
  
  if (!findedUser) {
    const err = new Error('Invalid fields');
    err.statusCode = 400;
    return err;
  }

  return findedUser;
};

module.exports = {
  validationLogin,
  existsUser,
};