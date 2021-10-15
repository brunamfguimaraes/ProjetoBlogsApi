const errors = {
  displayNameErr: '"displayName" length must be at least 8 characters long',
  emailFormatErr: '"email" must be a valid email',
  emailUndefErr: '"email" is required',
  passWordFormatErr: '"password" length must be 6 characters long',
  passwordUndefErr: '"password" is required',
  userExistsAlreadyErr: 'User alredy registered',
};

const badRequestStatus = 400;

const isString = (value) => typeof value === 'string';
const isLongEnough = (string, charNum) => string.length >= charNum;
const isEmail = (email) => {
  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reEmail.test(email);
};

const validateDisplayName = (displayName) => {
  if (!isString(displayName)) {
    return { err: { message: '"displayName" must be a string' }, status: badRequestStatus };
  }
  if (!isLongEnough(displayName, 8)) {
    return { err: { message: errors.displayNameErr }, status: badRequestStatus };
  }
  return {};
};

const validateEmail = (email) => {
  if (email === undefined) {
    return { err: { message: errors.emailUndefErr }, status: badRequestStatus };
  }
  if (!isEmail(email)) {
    return { err: { message: errors.emailFormatErr }, status: badRequestStatus };
  }
  return {};
};

const validatePassword = (password) => {
  if (password.length !== 6) {
    if (password === undefined) {
      console.log('entrei nopassword undef');
      return { err: { message: errors.passwordUndefErr }, status: badRequestStatus };
    }
    return { err: { message: errors.passWordFormatErr }, status: badRequestStatus };
  }
  return {};
};

const validateNewUser = (displayName, email, password) => {
  const displayNameValidation = validateDisplayName(displayName);
  if (displayNameValidation.err) return displayNameValidation;
  const emailValidation = validateEmail(email);
  if (emailValidation.err) return emailValidation;
  const passwordValidation = validatePassword(password);
  if (passwordValidation.err) return passwordValidation;
  return {};
};

module.exports = {
  validateNewUser,
};
