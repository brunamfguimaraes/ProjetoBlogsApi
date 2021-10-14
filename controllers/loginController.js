const jwt = require('jsonwebtoken');
const loginServices = require('../services/loginServices');
require('dotenv');

const jwtConfiguration = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  if (email === '') {
 return res.status(400).json(
    { message: '"email" is not allowed to be empty' },
    ); 
}
  if (!email) { return res.status(400).json({ message: '"email" is required' }); }
  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (password === '') {
    return res.status(400).json(
       { message: '"password" is not allowed to be empty' },
       ); 
   }
  if (!password) { return res.status(400).json({ message: '"password" is required' }); }
  next();
};

const loginUser = async (req, res) => {
  const validUser = await loginServices.validUser(req.body);
  if (validUser) {
    const { id, displayName, email, image } = validUser;
    const token = jwt.sign(
      { id, displayName, email, image },
      process.env.JWT_SECRET,
      jwtConfiguration,
  );
    return res.status(200).json({ token });
  }
  return res.status(400).json({ message: 'Invalid fields' });
  };

module.exports = {
  verifyEmail,
  verifyPassword,
  loginUser,
};