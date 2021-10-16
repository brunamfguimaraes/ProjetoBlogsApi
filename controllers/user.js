const { generateToken } = require('../services/token');
const { createUsersServices } = require('../services/user');

const STATUS = {
  OK: 201,
  ERR: 500,
};

const createUsers = async (req, res) => {
  const answer = await createUsersServices(req);
  // console.log(id, displayName, email);
  if (answer.err) { 
    return res.status(answer.err).json(answer); 
  }
  const { id, displayName, email } = answer.dataValues;
  const token = generateToken(id, displayName, email);
  return res.status(STATUS.OK).json(token);
};

module.exports = {
  createUsers,
};