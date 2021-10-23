const jwt = require('jsonwebtoken');
const { User } = require('../models');

const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const secret = 'mySuperPassword';

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const createUser = async (req, res) => {
  const { dataValues } = await User.create(req.body);
  delete dataValues.password;
  const token = jwt.sign({ data: dataValues }, secret, jwtConfig);

  if (!token) {
    return res.status(INTERNAL_SERVER_ERROR);
  }
  
  return res.status(CREATED).json({ token });
};

const findAllUsers = async (_req, res) => {
  const allUsers = await User.findAll();
  if (!allUsers) {
    return res.status(INTERNAL_SERVER_ERROR);
  }

  return res.status(OK).json(allUsers);
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  const userById = await User.findByPk(id);

  if (!userById) {
    return res.status(NOT_FOUND).json({ message: 'User does not exist' });
  }

  return res.status(OK).json(userById);
};

module.exports = { createUser, findAllUsers, findUserById };
