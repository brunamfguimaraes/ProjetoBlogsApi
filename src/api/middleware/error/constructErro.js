const error = (code, message) => ({
  isError: true,
  code,
  message,
});

module.exports = {
  errorNewUser: (message) => error(409, message),
  badRequest: (message) => error(400, message),
};