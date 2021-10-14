const { User } = require('../models');
const messages = require('../helpers/validationMessages');

const validateDisplayName = (req, res, next) => {
  try {
    const { displayName } = req.body;

    if (displayName.length < 8) return res.status(400).json(messages.DISPLAY_NAME_LENGTH);

    next();
  } catch (error) {
    return res.status(400).json(messages.DISPLAY_NAME_LENGTH);
  }
};

const validateEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) return res.status(400).json(messages.VALID_EMAIL);

    if (!email) return res.status(400).json(messages.REQUIRED_EMAIL);

    next();
  } catch (error) {
    return res.status(400).json(messages.VALID_EMAIL);
  } 
};

const validatePassword = (req, res, next) => {
  try {
    const { password } = req.body; 
    const passwordLength = 6;

    if (password && password.length !== passwordLength) {
      return res.status(400).json(messages.PASSWORD_LENGTH);
    }
    
    if (!password) return res.status(400).json(messages.REQUIRED_PASSWORD);

    next();
  } catch (error) {
    return res.status(400).json(messages.PASSWORD_LENGTH);
  }
};

const emailExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkEmailUser = await User.findOne({ where: { email } });

    if (checkEmailUser) return res.status(409).json(messages.ALREADY_EXISTS);
    
    next();
  } catch (error) {
    return res.status(409).json(messages.ALREADY_EXISTS);
  }
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  emailExists,
};