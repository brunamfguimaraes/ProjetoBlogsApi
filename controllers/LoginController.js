const jwt = require('jsonwebtoken');
require('dotenv').config();
const { postLoginService } = require('../services');

const postLoginController = async (req, res, next) => { 
  const { email, password } = req.body;
  
  const postLogin = await postLoginService(email, password);
  if (postLogin.message) {
    return next(postLogin);
  }
  const { id } = postLogin;

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: id }, process.env.JWT_SECRET, jwtConfig);

  res.status(200).json({ token });
};

module.exports = { postLoginController };
