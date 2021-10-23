const { StatusCodes: {
  BAD_REQUEST, CONFLICT, CREATED, OK, NOT_FOUND } } = require('http-status-codes');
const { createUser, isValidLogin, findUserById } = require('../services/user');
const { Users } = require('../models');
const { token } = require('../auth/token');

const user = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const create = await createUser(displayName, email, password, image);

  if (create.error) return res.status(BAD_REQUEST).json({ message: create.err.message });
  if (create.error2) return res.status(CONFLICT).json({ message: 'User already registered' });

  const newToken = await token(req.body);
  return res.status(CREATED).json({ token: newToken });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const isValid = isValidLogin(email, password);
  
  if (isValid) return res.status(BAD_REQUEST).json({ message: isValid.message });

  const users = await Users.findOne({ where: { email, password } });
  
  if (!users) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
  }

  const newToken = await token(req.body);
  return res.status(OK).json({ token: newToken });
};

const getUsers = async (req, res) => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });
  return res.status(OK).json(users);
};

const findUser = async (req, res) => {
  const { id } = req.params;
  const userFound = await findUserById(id);
  if (userFound.message) return res.status(NOT_FOUND).json({ message: userFound.message });
  return res.status(OK).json(userFound);
};

module.exports = {
  user,
  login,
  getUsers,
  findUser,
};
