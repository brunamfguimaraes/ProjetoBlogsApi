const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const tokenGenerator = async (body) => {
  const { displayName, email } = body;

  const jwtConfig = {
    expiresIn: '10min',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ displayName, email }, secret, jwtConfig);

  return token;
};

module.exports = { tokenGenerator };
