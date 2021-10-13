// const { User } = require('../models');
const {
  createNewUser,
  fieldLength,
  validateEmail,
  verifyEmptyFields,
  registeredEmail,
} = require('../services/userService');

const verifyFieldsEmpty = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password) verifyEmptyFields('password');
    if (!email)verifyEmptyFields('email');
    next();
  } catch (e) {
    if (e.name === 'emptyError') {
      const response = e.message;
      return res.status(400).json(response);
    }
  }
};

const verifyFieldsLength = async (req, res, next) => {
  try {
    const { displayName, password } = req.body;
    await fieldLength(displayName, password);
    next();
  } catch (e) {
    if (e.name === 'lengthError') {
      const response = e.message;
      return res.status(400).json(response);
      }
    }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    await validateEmail(email);
    next();
  } catch (e) {
    if (e.name === 'emailError') {
      const response = e.message;
      return res.status(400).json(response);
      }
    }
};

const verifyRegisteredUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    await registeredEmail(email);
    next();
  } catch (e) {
    if (e.name === 'registeredUser') {
      const response = e.message;
      return res.status(409).json(response);
      }
    }
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const response = await createNewUser(displayName, email, password, image);
  return res.status(201).json(response.message);
};

module.exports = {
  createUser,
  verifyFieldsLength,
  verifyEmail,
  verifyFieldsEmpty,
  verifyRegisteredUser,
};
