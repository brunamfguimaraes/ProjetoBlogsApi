const errors = {
  emailUndef: '"email" is required',
  passwordUndef: '"password" is required',
  emailEmpty: '"email" is not allowed to be empty',
  passwordEmpty: '"password" is not allowed to be empty',
};

const badRequestStatus = 400;

const validateEmail = (email) => {
  if (email === undefined) {
    return { err: { message: errors.emailUndef }, status: badRequestStatus };
  }
  if (email === '') {
    return { err: { message: errors.emailEmpty }, status: badRequestStatus };
  }
  return {};
};

const validatePassword = (password) => {
  if (password === undefined) {
    return { err: { message: errors.passwordUndef }, status: badRequestStatus };
  }
  if (password === '') {
    return { err: { message: errors.passwordUndef }, status: badRequestStatus };
  }
  return {};
};

const validateLogin = (email, password) => {
  const emailValidation = validateEmail(email);
  if (emailValidation.err) return emailValidation;
  const passwordValidation = validatePassword(password);
  if (passwordValidation.err) return passwordValidation;
  return {};
};

module.exports = {
  validateLogin,
};