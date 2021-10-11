const Joi = require('joi');
const jwt = require('../auth/jwt');

const { User } = require('../models');

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

const createUser = async (body) => {
  const { displayName, email, password, image } = body;

  const validForm = validCreatUser(body);
  if (validForm) return validForm;

  const emailExits = await User.findOne({ where: { email } });
  if (emailExits) return 'emailExists';
  
  const token = jwt.creatToken(displayName, email);

  await User.create({
    displayName, email, password, image,
  });
  
  return token;
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

  const token = jwt.creatToken(login.displayName, email);

  return token;  
};

const getAllUsers = async (token) => {
  const isValidToken = jwt.validateJwt(token);
  if (isValidToken.status) return isValidToken;

  const getAll = await User.findAll();

  return getAll;  
};

const getUserById = async (token, id) => {
  const isValidToken = jwt.validateJwt(token);
  if (isValidToken.status) return isValidToken;

  const getById = await User.findOne({ where: { id } });

  return getById;
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
};
