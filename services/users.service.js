require('dotenv/config');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const UserValidation = require('../schemas/users.validation');

const { SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '50m',
};

const createUser = async (displayName, email, password, image) => {
  console.log(displayName, email, password, image);
  UserValidation.validationCreateUser(displayName, email, password);
  await UserValidation.userExists(email);
  try {
    const newUser = await User.create({
      displayName,
      email,
      password,
      image,
    });
    return newUser;
  } catch (error) {
    return error;
  }
};

module.exports = { createUser };
