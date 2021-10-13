const emailValidate = (email) => {
  // const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (email === '') {
    return { fieldError: true, message: '"email" is not allowed to be empty' };
  }

  if (!email) {
    return { fieldError: true, message: '"email" is required' };
  }

  return { fieldError: false };
};

const validatePassword = (password) => {
  if (password === '') {
    return { fieldError: true, message: '"password" is is not allowed to be empty' };
  }

  if (!password) {
    return { fieldError: true, message: '"password" is required' };
  }

  return { fieldError: false };
};

module.exports = {  
  emailValidate,
  validatePassword,
};