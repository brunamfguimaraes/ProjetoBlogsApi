// const { StatusCodes } = require('http-status-codes');

const isValidEmail = (email) => {
  const RegexEmail = /.+@.+\..+/g;

  if (!RegexEmail.test(email)) {
    return {
      isError: true,
      message: '"email" must be a valid email',
      code: 400,
    };
  }
  return { isError: false };
};

module.exports = isValidEmail;