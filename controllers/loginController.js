const { userLogin, verifyEmptyFields } = require('../services/loginService');

const verifyFieldsEmpty = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password) await verifyEmptyFields('password');
    if (!email) await verifyEmptyFields('email');
    next();
  } catch (e) {
    if (e.name === 'emptyError') {
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
  verifyFieldsEmpty,
};
