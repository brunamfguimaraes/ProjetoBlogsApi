const Joi = require('joi');
const Users = require('../models');

const isValid = (displayName, email, password, image) => {
  const user = Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      password: Joi.string().length(6).required(),
      image: Joi.string(),
  });  
  const { error } = user.validate({ displayName, email, password, image });
  if (error) return { message: error.details[0].message };
};  

const alreadyEmail = async (email) => {
  const findEmail = await Users.findOne({ where: { email } });
  if (findEmail) return { message: 'User already registered' };
};

const createUser = async (displayName, email, password, image) => {
  const err = await isValid(displayName, email, password, image);
  if (err) return { err, error: true };

  const emailAlready = await alreadyEmail(email);
  if (emailAlready) return { emailAlready, error2: true };

  const user = await Users.create({ displayName, email, password, image });
  return user;
};

module.exports = {
  createUser,
};
