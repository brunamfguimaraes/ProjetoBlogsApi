const jwt = require('jsonwebtoken');
const { User } = require('../models');

const OK = 200;
const CREATED = 201;
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

const findAllUsers = async (req, res) => {
  const allUsers = await User.findAll();
  if (!allUsers) {
    return res.status(INTERNAL_SERVER_ERROR);
  }

  return res.status(OK).json(allUsers);
};

module.exports = { createUser, findAllUsers };
