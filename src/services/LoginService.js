require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../sequelize/models');

const secret = process.env.JWT_SECRET;

const createJWT = (email, id) => {
  try {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ email, id }, secret, jwtConfig);

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
  console.log('data', data);
  const user = await User.findOne({ where: { email } });
  const { id } = user.dataValues;
  console.log('usuario', user);

  if (user) {
    return createJWT(email, id);
  }
  
  return {
    error: {
      message: 'Invalid fields',
    },
  };
};

module.exports = { login, createJWT };
