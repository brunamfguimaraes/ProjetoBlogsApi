const error = (code, message) => ({
  isError: true,
  code,
  message,
});

module.exports = {
  conflict: (message) => error(409, message),
  badRequest: (message) => error(400, message),
  notFound: (message) => error(404, message),
};
