const validEmail = (email) => {
  if (email === '') return '"email" is not allowed to be empty';
  if (!email) return '"email" is required';
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)) return '"email" must be a valid email';
};
const validPassword = (password) => {
  const minLength = 6;
  if (password === '') return '"password" is not allowed to be empty';
  if (!password) return '"password" is required';
  if (password.length < minLength || password.length > minLength) {
    return '"password" length must be 6 characters long';
  }
};
const validName = (displayName) => {
  const minLength = 8;
  if (!displayName || displayName.length < minLength) {
    return '"displayName" length must be at least 8 characters long';
  }
};
const validUser = ({ displayName, email, password }) => {
  const invalidDisplayName = validName(displayName);
  if (invalidDisplayName) return invalidDisplayName;
  const invalidEmail = validEmail(email);
  if (invalidEmail) return invalidEmail;
  return validPassword(password);
};

module.exports = {
  validUser,
};
