const { StatusCodes } = require('http-status-codes');

const MIN_LENGTH_PASSWORD = 6;

const validateEmail = (email) => {
  if (email === '') return { message: '"email" is not allowed to be empty' };
  if (!email) return { message: '"email" is required' };

  const regex = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;

  return !regex.test(email) ? { message: '"email" must be a valid email' } : null;
};

const validatePassword = (password) => {
  if (password === '') return { message: '"password" is not allowed to be empty' };
  if (!password) return { message: '"password" is required' };
  
  return password.length < MIN_LENGTH_PASSWORD
    ? { message: `"password" length must be ${MIN_LENGTH_PASSWORD} characters long` }
    : null;
};

const validateUser = (req, res, next) => {
  const { email, password } = req.body;

  const validEmail = validateEmail(email);
  if (validEmail !== null) {
    return res.status(StatusCodes.BAD_REQUEST).json(validEmail); 
  }
  
  const validPassword = validatePassword(password);
  if (validPassword !== null) {
    return res.status(StatusCodes.BAD_REQUEST).json(validPassword); 
  }

  return next();
};

module.exports = validateUser;
