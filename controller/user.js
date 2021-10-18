const { StatusCodes: {
  BAD_REQUEST, CONFLICT, CREATED, OK } } = require('http-status-codes');
const { createUser } = require('../services/user');
const { token } = require('../auth/token');

const user = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const create = await createUser(displayName, email, password, image);

  if (create.error) return res.status(BAD_REQUEST).json({ message: create.err.message });
  if (create.error2) return res.status(CONFLICT).json({ message: 'User already registered' });

  const newToken = await token(req.body);
  return res.status(CREATED).json({ token: newToken });
};

module.exports = {
  user,
};
