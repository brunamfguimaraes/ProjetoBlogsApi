const { userLogin, emptyFields, blankFields } = require('../services/loginService');

const verifyEmptyFields = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password) await emptyFields('password');
    if (!email) await emptyFields('email');
    next();
  } catch (e) {
    if (e.name === 'emptyError') {
      const response = e.message;
      return res.status(400).json({ message: response });
    }
  }
};

const verifyBlankFields = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (password === '') await blankFields('password');
    if (email === '') await blankFields('email');
    next();
  } catch (e) {
    if (e.name === 'blankError') {
      const response = e.message;
      return res.status(400).json({ message: response });
    }
  }
};

const makeLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await userLogin(email, password);
    req.statusCode = 200;
    next();
  } catch (e) {
    if (e.name === 'notRegistered') {
      const response = e.message;
      return res.status(400).json({ message: response });
      }
  }
};

module.exports = {
  makeLogin,
  verifyEmptyFields,
  verifyBlankFields,
};
