const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (email) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
    const token = jwt.sign({ data: email }, process.env.JWT_SECRET, jwtConfig);
  
    return token;
  };

// const createToken = (obj) => {
//   const secret = process.env.JWT_SECRET;
//   const jwtConfig = {
//   expiresIn: '1d',
//   algorithm: 'HS256',
//   };
  
//   const token = jwt.sign({ data: obj }, secret, jwtConfig);
//   console.log(token, ' do createToken');
//   return token;
//   }; 

module.exports = {
    createToken,
};