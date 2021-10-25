const { User } = require('../models');

const emailRequiredError = { message: '"email" is required' };
const passwordRequiredError = { message: '"password" is required' };
const emptyMail = { message: '"email" is not allowed to be empty' };
const emptyPassword = { message: '"password" is not allowed to be empty' };
const invalidFields = { message: 'Invalid fields' };

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const userMailLogin = (req, res, next) => {
  const { email } = req.body;
  if (email === '') res.status(400).json(emptyMail);
  if (!email) return res.status(400).json(emailRequiredError);
  if (!email.match(EMAIL_REGEX)) { return res.status(400).json(invalidFields); }
  next();
};

const userPasswordLogin = (req, res, next) => {
  const { password } = req.body;
  if (password === '') res.status(400).json(emptyPassword);
  if (!password) return res.status(400).json(passwordRequiredError);
  next();
};

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { dataValues } = await User.findOne({ where: { email } });
    if (!dataValues || dataValues.password !== password) { 
      return res.status(400).json(invalidFields); 
    }
  } catch (error) {
    return res.status(400).json(invalidFields);
  }
  next();
};

module.exports = { userMailLogin, userPasswordLogin, validateUser };