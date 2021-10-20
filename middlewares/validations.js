const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');

const validName = (req, res, next) => {
  const { displayName } = req.body;
  if (!displayName || displayName.length < 8) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validEmail = (req, res, next) => {
  const { email } = req.body;
  const regEmail = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  if (email === undefined) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"email" is required' });
  }
  if (email === '') {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: '"email" is not allowed to be empty' });
  }
  if (!regEmail.test(email)) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"email" must be a valid email' });
  }
  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (password === undefined) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"password" is required' });
  }
  if (password === '') {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: '"password" is not allowed to be empty' });
  }
  if (password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

const alreadyExists = async (req, res, next) => {
  const { email } = req.body;
  const findUser = await User.findOne({ where: { email } });
  if (findUser) {
    return res.status(StatusCodes.CONFLICT)
    .json({ message: 'User already registered' });
  }
  next();
};

const validCategoryName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"name" is required' });
  }
  next();
};

const validTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"title" is required' });
  }
  next();
};

const validContent = (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"content" is required' });
  }
  next();
};

const validCategoryId = (req, res, next) => {
  const { categoryIds } = req.body;
  if (categoryIds === undefined) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"categoryIds" is required' });
  }
  next();
};

module.exports = {
  validName,
  validEmail,
  validPassword,
  alreadyExists,
  validCategoryName,
  validTitle,
  validContent,
  validCategoryId,
};
