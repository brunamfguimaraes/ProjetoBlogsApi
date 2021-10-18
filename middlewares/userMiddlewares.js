const { User } = require('../models');

const BAD_REQUEST = 400;
const CONFLICT_STATUS = 409;

const responseMessages = {
  validName: () => '"displayName" length must be at least 8 characters long',
  invalidEmail: () => '"email" must be a valid email',
  requiredEmail: () => '"email" is required',
  emailExclusivity: () => 'User already registered',
  validPassword: () => '"password" length must be 6 characters long',
  requiredPassword: () => '"password" is required',
  categoryName: () => '"name" is required',
};

const isValidName = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(BAD_REQUEST).json(
      {
        message: responseMessages.validName(),
      },
    );
  }

  next();
};

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const emailTester = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;

  if (!email) {
    return res.status(BAD_REQUEST).json(
      { message: responseMessages.requiredEmail() },
    );
  }

  if (!emailTester.test(email)) {
    return res.status(BAD_REQUEST).json(
      { message: responseMessages.invalidEmail() },
    );
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(BAD_REQUEST).json(
      {
        message: responseMessages.requiredPassword(),
      },
    );
  }

  if (password.length < 6) {
    return res.status(BAD_REQUEST).json(
      {
        message: responseMessages.validPassword(),
      },
    );
  }

  next();
};

const uniqueEmail = async (req, res, next) => {
  const { email } = req.body;

  const consultEmail = await User.findOne({ where: { email } });

  if (consultEmail) {
    return res.status(CONFLICT_STATUS).json(
      {
        message: responseMessages.emailExclusivity(),
      },
    );
  }

  next();
};

const categoryName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(BAD_REQUEST).json(
      {
        message: responseMessages.categoryName(),
      },
    );
  }

  next();
};

module.exports = {
  isValidName,
  isValidEmail,
  isValidPassword,
  uniqueEmail,
  categoryName,
};
