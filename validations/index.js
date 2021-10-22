const validateName = (displayName) => {
  if (displayName.length < 8) {
    return {
      message: '"displayName" length must be at least 8 characters long',
    };
  }

  return {};
};

const isEmailValid = (email) => {
  const reg = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);

  if (!email) {
    return {
      message: '"email" is required',
    };
  }

  if (!reg.test(email)) {
    return {
      message: '"email" must be a valid email',
    };
  }

  return {};
};

const passwordIsValid = (password) => {
  if (!password) {
    return {
      message: '"password" is required',
    };
  }
  
  if (password.length < 6) {
    return {
      message: '"password" length must be 6 characters long',
    };
  }

  return {};
};

module.exports = {
  validateName,
  isEmailValid,
  passwordIsValid,
};