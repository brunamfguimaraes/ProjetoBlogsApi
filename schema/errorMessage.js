module.exports = (errorType) => ({
  displayName: '"displayName" length must be at least 8 characters long',
  email: '"email" must be a valid email',
  noEmail: '"email" is required',
  password: '"password" length must be 6 characters long',
  noPassword: '"password" is required',
  userConflict: 'User already registered',
})[errorType];
