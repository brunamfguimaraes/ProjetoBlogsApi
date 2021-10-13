const validateDisplayName = (displayName) => {
  if (displayName.length < 8) {
    return { fieldError: true, message: '"displayName" length must be at least 8 characters long' };
  }
  return { fieldError: false };
};

const emailValidate = (email) => {
  // const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email) {
    return { fieldError: true, message: '"email" is required' };
  }

  if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
    return { fieldError: true, message: '"email" must be a valid email' };
  }
  return { fieldError: false };
};

const validatePassword = (password) => {
  if (!password) {
    return { fieldError: true, message: '"password" is required' };
  }

  if (password.length < 6) {
    return { fieldError: true, message: '"password" length must be 6 characters long' };
  }
  return { fieldError: false };
};

module.exports = {
  validateDisplayName,
  emailValidate,
  validatePassword,
};