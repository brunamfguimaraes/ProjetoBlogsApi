require('dotenv');

const jwt = require('jsonwebtoken');
const { verifyEmail, 
  verifyName, 
  verifyPassword, 
  userExists } = require('../middlewares/user.js');

const { User } = require('../models');

const authToken = (user) => {
  const { id, displayName, email, image } = user;
  const newToken = jwt.sign(
    {
      id,
      displayName,
      email,
      image,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 1440,
      algorithm: 'HS256',
    },
  );
  return newToken;
};

const validaToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
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
  
  const newToken = authToken(newUser);

  return res.status(201).json({ token: newToken });
};

const checkEmail = (req, res, next) => {
  const emailIsValid = verifyEmail({ email: req.body.email });
  if (emailIsValid.message !== 'ok') {
   return res.status(400).json(emailIsValid);
  }
  next();
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.findAll();
  res.status(200).json(allUsers);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  res.status(200).json(user);
};

const checkName = (req, res, next) => {
  const nameIsValid = verifyName({ displayName: req.body.displayName });
  if (nameIsValid.message !== 'ok') {
    return res.status(400).json(nameIsValid);
  }
  next();
};

const checkPassword = (req, res, next) => {
  const passwordIsValid = verifyPassword({ password: req.body.password });
  if (passwordIsValid.message !== 'ok') {
    return res.status(400).json(passwordIsValid);
  }
  next();
};

const checkEmailExists = async (req, res, next) => {
  const hasEmail = await userExists({ email: req.body.email });
  if (hasEmail.message !== 'ok') {
    return res.status(409).json(hasEmail);
  }
  next();
};

const testeEmptyEmail = async (req, res, next) => {
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

const testeEmptyPassword = (req, res, next) => {
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

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ where: { email, password } });
  if (!result) return res.status(400).json({ message: 'Invalid fields' });
  const newToken = authToken(result);
  return res.status(200).json({ token: newToken });
};

module.exports = { checkEmailExists,
  checkPassword,
  checkName,
  checkEmail,
  createUser,
  testeEmptyEmail,
  testeEmptyPassword,
  userLogin,
  validaToken,
  getAllUsers,
  getUser,
};