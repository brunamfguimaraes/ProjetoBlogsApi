const { CREATED, INTERNAL_SERVER_ERROR } = require('http-status');
const { create } = require('../services/User');

const createUser = async (req, res) => {
  try {
    const token = await create(req.body);

    if (token.err) {
      return res.status(token.err.status).json({ message: token.err.message });
    } 
    res.status(CREATED).json({ token });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};
module.exports = {
  createUser,
};