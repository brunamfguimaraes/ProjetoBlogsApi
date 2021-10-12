const { User } = require('../models');

function validateDisplayName(displayName) {
  if (displayName.length < 8) return false;

  return true;
}

function validateEmail(email) {
  if (!email) {
    return null;
  }
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(emailRegex)) {
    return false;
  }

  return true;
}

function validatePassword(password) {
  if (!password) {
    return null;
  }

  if (password.length < 6) {
    return false;
  }

  return true;
}

async function create(body) {
  const { email } = body;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return false;
  }
  
  const newUser = await User.create(body);

  return newUser;
}

async function getAllUsers() {
  const users = await User.findAll();

  return users;
}

async function getUserByID(id) {
  const user = await User.findOne({ where: { id } });

  return user;
}

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  create,
  getAllUsers,
  getUserByID,
};