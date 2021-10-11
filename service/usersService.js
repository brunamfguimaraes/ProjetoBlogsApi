const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validCreatUser = (body) => {
  const { displayName, email, password, image } = body;
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }).validate({ displayName, email, password, image });
  return error;
};

const creatToken = (displayName, email) => {
  const token = jwt.sign({ displayName, email }, secret, jwtConfig);
  return token;
};

const createUser = async (body) => {
  const { displayName, email, password, image } = body;

  const validForm = validCreatUser(body);
  if (validForm) return validForm;

  const emailExits = await User.findOne({ where: { email } });
  if (emailExits) return 'emailExists';
  
  const token = creatToken(displayName, email);

  await User.create({
    displayName, email, password, image,
  });
  
  return token;
};

module.exports = {
  createUser,
};
