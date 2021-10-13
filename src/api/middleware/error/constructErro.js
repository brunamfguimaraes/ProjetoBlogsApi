const error = (code, message) => ({
  isError: true,
  code,
  message,
});

module.exports = {
  errorNewUser: (message) => error(409, message),
  badRequest: (message) => error(400, message),
  errorToken: (message) => error(401, message),
};