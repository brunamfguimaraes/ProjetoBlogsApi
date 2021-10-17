const { generateToken } = require('../services/token');
const { 
  createUsersServices,
  loginUsersServices,
  allUsersServices,
  getIdUsersServices,
} = require('../services/user');

const STATUS = {
  OK: 201,
  OKK: 200,
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
  return res.status(STATUS.OKK).json({ token });
};

const allUsers = async (req, res) => {
  const answer = await allUsersServices(req);
  return res.status(STATUS.OKK).json(answer);
};

const getIdUsers = async (req, res) => {
  const answer = await getIdUsersServices(req);
  if (answer.err) { 
    return res.status(answer.err).json(answer); 
  }
  return res.status(STATUS.OKK).json(answer);
};

module.exports = {
  createUsers,
  loginUsers,
  allUsers,
  getIdUsers,
};