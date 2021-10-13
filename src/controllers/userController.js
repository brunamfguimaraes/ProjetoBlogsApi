const userService = require('../services/userService');

const CREATED = 201;
const OK = 200;
// const NO_CONTENT = 204;

const createUser = async (req, res) => {
  const newUser = req.body;
  const user = await userService.createUser(newUser);
  return res.status(CREATED).json(user);
};

const login = async (req, res) => {
  const user = req.body;
  const token = await userService.login(user);
  return res.status(OK).json(token);
};

module.exports = {
  createUser,
  login,
};
