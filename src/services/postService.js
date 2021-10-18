require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User, BlogPost } = require('../sequelize/models');

const secret = process.env.JWT_SECRET;

const validateJWT = (token) => {
  if (!token) {
    return { error: { message: 'Token not found' } };
  }

  try {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    
    const { email } = jwt.verify(token, secret, jwtConfig);

    return email;
  } catch (e) {
    return { error: { message: 'Expired or invalid token' } };
  }
};

const create = async (post, token) => {
  const email = validateJWT(token);
  const { id: userId } = await User.findOne({ where: { email } });
  const { title, content, id } = await BlogPost.create({ ...post, userId });
  return { title, content, id, userId };
};

module.exports = create;
