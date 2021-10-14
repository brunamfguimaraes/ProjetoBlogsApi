require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../sequelize/models');

const secret = process.env.JWT_SECRET;

const createJWT = (data) => {
  try {
    const { email } = data;
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ email }, secret, jwtConfig);

    return token;
  } catch (e) {
    return {
      error: {
        message: 'Invalid fields',
      },
    };
  }
};

const login = async (data) => {
  const { email } = data;
  const user = await User.findOne({ where: { email } });
  console.log('usuario', user);

  if (user) {
    return createJWT(email);
  }
  
  return {
    error: {
      message: 'Invalid fields',
    },
  };
};

module.exports = { login, createJWT };
