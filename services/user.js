require('dotenv');

const jwt = require('jsonwebtoken');
const { verifyEmail, 
  verifyName, 
  verifyPassword, 
  userExists } = require('../middlewares/user.js');

const { User } = require('../models');

const createUser = async (req, res) => {
  await User.create(req.body);
  const { id, displayName, email, image } = User;
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
  return res.status(201).json({ token: newToken });
};

const checkEmail = (req, res, next) => {
  const emailIsValid = verifyEmail({ email: req.body.email });
  if (emailIsValid.message !== 'ok') {
   return res.status(400).json({ message: emailIsValid });
  }
  next();
};

const checkName = (req, res, next) => {
  const nameIsValid = verifyName({ displayName: req.body.displayName }).message;
  if (nameIsValid !== 'ok') {
    return res.status(400).json({ message: nameIsValid });
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
    return res.status(400).json(hasEmail);
  }
  next();
};

module.exports = { checkEmailExists, checkPassword, checkName, checkEmail, createUser };