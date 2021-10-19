const { CREATED, OK, INTERNAL_SERVER_ERROR } = require('http-status');
const { create, login, getAllUsers } = require('../services/User');
const ERROR_MESSAGE = require('../services/error');

const createUser = async (req, res) => {
  try {
    const token = await create(req.body);
    if (token.err) {
      return res.status(token.err.status).json({ message: token.err.message });
    } 
    res.status(CREATED).json({ token });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGE.serverError });
  }
};

const loginUser = async (req, res) => {
  try {
    const token = await login(req.body);
    if (token.err) {
      return res.status(token.err.status).json({ message: token.err.message });
    } 
    return res.status(OK).json({ token });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGE.serverError });
  }
};

const getUsers = async (_req, res) => {
  try {
    const users = await getAllUsers();
    res.status(OK).json(users);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGE.serverError });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
};