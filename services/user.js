require('dotenv').config();

const jwt = require('jsonwebtoken');

const { 
  checkEmail,
  checkName,
  checkPassword,
  emailAlreadyExists,
 } = require('../middlewares/user');

const { User } = require('../models');

const authenticationToken = (user) => {
  const { id, displayName, image, email } = user;
  const newToken = jwt.sign(
    {
      id,
      displayName,
      image,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
  );
  return newToken;
};

const validToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const createUser = async (req, res) => {
  const newUser = await User.create(req.body);
  const newToken = authenticationToken(newUser);

  return res.status(201).json({ token: newToken });
};

const loginUp = async (req, res) => {
  const { email, password } = req.body;
  const finder = await User.findOne({ where: { email, password } });
  if (!finder) return res.status(400).json({ message: 'Invalid fields' });
  const newToken = authenticationToken(finder);
  return res.status(200).json({ token: newToken });
};

const getUsers = async (req, res) => {
  const allusers = await User.findAll();
  res.status(200).json(allusers);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk({ where: { id } });
  if (!user) return res.status(404).josn({ message: 'User does not exist' });
  return res.status(200).json(user);
};

// verify
const emptyEmailLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email.length === 0) {
      return res.status(400).json({ message: '"email" is not allowed to be empty' });
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: '"email" is required' });
  }
};

const emptyPasswordLogin = (req, res, next) => {
  try {
    const { password } = req.body;
    if (password.length === 0) {
      return res.status(400).json({ message: '"password" is not allowed to be empty' }); 
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: '"password" is required' });
  }
};

const verifyEmail = (req, res, next) => {
  const emailIsValid = checkEmail({ email: req.body.email });
  if (emailIsValid.message !== 'ok') return res.status(400).json(emailIsValid);
  next();
};

const verifyName = (req, res, next) => {
  const nameIsValid = checkName({ displayName: req.body.displayName });
  if (nameIsValid.message !== 'ok') return res.status(400).json(nameIsValid);
  next();
};

const verifyPassword = (req, res, next) => {
  const passwordIsValid = checkPassword({ password: req.body.password });
  if (passwordIsValid.message !== 'ok') return res.status(400).json(passwordIsValid);
  next();
};

const verifyImage = (req, res, next) => {
  const { image } = req.body.image;
  if (!image) return res.status(400).json({ message: '"image" is required' });
  next();
};

const userAlreadyExists = async (req, res, next) => {
  const userIsValid = await emailAlreadyExists({ email: req.body.email });
  if (userIsValid.message !== 'ok') return res.status(409).json(userIsValid);
  next();
};

module.exports = {
  createUser,
  validToken,
  verifyEmail,
  verifyName,
  verifyPassword,
  verifyImage,
  userAlreadyExists,
  loginUp,
  emptyEmailLogin,
  emptyPasswordLogin,
  getUsers,
  getUserById,
};
