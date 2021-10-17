const { generateToken } = require('../services/token');
const { createUsersServices, loginUsersServices } = require('../services/user');

const STATUS = {
  OK: 201,
  login: 200,
  ERR: 500,
};

const createUsers = async (req, res) => {
  const answer = await createUsersServices(req);
  if (answer.err) { 
    return res.status(answer.err).json(answer); 
  }
  const { id, displayName, email } = answer.dataValues;
  const token = generateToken(id, displayName, email);
  return res.status(STATUS.OK).json(token);
};

const loginUsers = async (req, res) => {
  const answer = await loginUsersServices(req);
  if (answer.err) { 
    return res.status(answer.err).json(answer); 
  }
  const { email } = req.body;
  const token = generateToken(email);
  return res.status(STATUS.login).json({ token });
};

module.exports = {
  createUsers,
  loginUsers,
};