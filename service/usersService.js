const jwt = require('jsonwebtoken');
const { User } = require('../models');
const HTTP_REST = require('../HTTPErrosAndMessages');

const createToken = (email) => {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ email }, process.env.JWT_SECRET, jwtConfig);
  
    return token;
  };

const { message } = HTTP_REST;

const addUser = async (user) => {
    const { email } = user;
    const userValidate = await User.findOne({ where: { email } });
    if (!userValidate) {
        await User.create({ ...user });
        return { token: createToken(user.email) };
    }
    return { message: message.USER_EXISTS };
};

module.exports = {
    addUser,
};