const jwt = require('jsonwebtoken');

const genereteToken = (user) => {
    const secret = '3DJBM8$g2sJg';
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

module.exports = genereteToken;