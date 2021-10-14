// const rescue = require('express-rescue');
const Joi = require('joi');
const { User } = require('../models');
const { createJWT } = require('../auth/JWToken');

const createUser = async (body) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }).validate(body);
  if (schema.error) return { message: schema.error.message, status: 400 };
  const { email } = body;
  const verifyEmail = await User.findOne({ email });
  if (verifyEmail) return { message: 'User already registered', status: 409 };
  const { id } = await User.create(body);
  const token = createJWT({ id });
 return { token, status: 201 };
};

const getAllUsers = async () => {
  const users = await User.findAll({ 
    attributes: { exclude: ['password'] } });
  return { users, status: 200 };
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
  });
  console.log(user);
  if (!user) return { message: 'User does not exist', status: 404 };
  return { user, status: 200 };
};

module.exports = {
  createUser,
  getAllUsers,
  getById,
};