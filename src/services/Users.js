const Joi = require('joi');
const { User } = require('../../models');

const validateError = require('../middleweres/validateError');

const UserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
}).messages({
  'any.required': 'O valor {{#label}} é obrigatório',
});

const createUser = async (user) => {
  // valida as informações do body usando o Joi
  const { error } = UserSchema.validate(user);
  if (error) throw validateError(400, error.message);

  // valida se o usuário existe
  const userExists = await User.findOne({ where: { email: user.email } });
  if (userExists) throw validateError(409, 'User already registered');

  // cria o novo usuário
  const newUser = await User.create(user);
  return newUser;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll();

  return allUsers;
};

const getUserById = async (id) => {
  const UserById = await User.findByPk(id);

  return UserById;
};

const updateUser = async (name, description, id) => {
  const updatedUser = await User.update({ name, description }, { where: { id } });

  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await User.destroy({ where: { id } });

  return deletedUser;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
