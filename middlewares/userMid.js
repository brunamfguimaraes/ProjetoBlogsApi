const { User } = require('../models');

const verifyName = (req, res, next) => {
  const { displayName } = req.body;
  if (typeof displayName !== 'string' || displayName.length < 8) {
    return res.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!email.match(/\S+@\S+\.com/)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  const db = await User.findOne({ where: { email } });
  if (db) return res.status(409).json({ message: 'User already registered' });
  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: '"password" is required' });
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

// verificaçõesd o /login

const verifyEmpty = (req, res, next) => {
  const { password, email } = req.body;
  if (email === undefined) return res.status(400).json({ message: '"email" is required' });
  if (password === undefined) return res.status(400).json({ message: '"password" is required' });
  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  } 
  next();
};

const verifyDbUser = async (req, res, next) => {
  const { email } = req.body;
  const db = await User.findOne({ where: { email } });
  if (!db) return res.status(400).json({ message: 'Invalid fields' });
  next();
};

// procurar pelo id

const findById = async (req, res, next) => {
  const { id } = req.params;
  const db = await User.findOne({ where: { id } });
  if (!db) return res.status(404).json({ message: 'User does not exist' });
  next();
};

module.exports = { 
  verifyName, 
  verifyEmail, 
  verifyPassword, 
  verifyEmpty, 
  verifyDbUser,
  findById,
};