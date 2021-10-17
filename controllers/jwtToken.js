const jwt = require('jsonwebtoken');

// JWT //
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
//    //

const secretKey = process.env.JWT_SECRET;

const createJWT = (req, _res, next) => {
  const { email } = req.body;

  const userData = {
    email,
  };

  const token = jwt.sign({ data: userData }, secretKey, jwtConfig);
  req.jwtToken = { token };
  
  next();
};

module.exports = { createJWT };