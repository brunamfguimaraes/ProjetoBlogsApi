// const { User } = require('../models');
const {
  createNewUser,
   validateFields,
   validateEmail,
} = require('../services/userService');

const verifyFields = async (req, res, next) => {
  try {
    const { displayName, password } = req.body;
    const DISPLAY_LENGTH = 8;
    const PASSWORD_LENGTH = 6;
    await validateFields(displayName, password, DISPLAY_LENGTH, PASSWORD_LENGTH);
    next();
  } catch (e) {
    if (e.name === 'displayError') {
      const response = e.message;
      return res.status(400).json(response);
      }
    }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    validateEmail(email);
  } catch (e) {
    if (e.name === 'emailError') {
      const response = e.message;
      return res.status(400).json(response);
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
  verifyFields,
  verifyEmail,
};
