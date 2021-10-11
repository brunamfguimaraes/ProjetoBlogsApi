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

const validateJwt = (token) => {
  if (!token) return 'missing auth token';

  try {
    const validToken = jwt.verify(token, secret);
    return validToken;
  } catch (error) {
    return 'jwt malformed';
  }
};

const loginUser = async (body) => {
  const { email, password } = body;

  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }).validate({ email, password });

  if (error) return error;

  const login = await User.findOne({ where: { email, password } });
  if (!login) return 'invalidData';

  const token = creatToken(login.displayName, email);

  return token;  
};

const getAllUsers = async (token) => {
  if (!token) return 'tokenNotFound';

  const validToken = validateJwt(token);

  if (validToken === 'jwt malformed') return 'invalidToken';

  const getAll = await User.findAll();

  return getAll;  
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
};
