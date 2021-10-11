const { User } = require('../models');

function validateEmail(email) {
  if (!email) {
    return null;
  }

  if (email.length === 0) {
    return false;
  }

  return true;
}

function validatePassword(password) {
  if (!password) {
    return null;
  }
  
  if (password.length === 0) {
    return false;
  }

  return true;
}

async function create(body) {
  const { email } = body;

  const userExists = await User.findOne({ where: { email } });
  if (!userExists) {
    return false;
  }

  return true;
}

module.exports = {
  validateEmail,
  validatePassword,
  create,
};