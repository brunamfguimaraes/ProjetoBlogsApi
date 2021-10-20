// Fioravante helped me with this schema idea
const { StatusCodes } = require('http-status-codes');

const error = (code, message) => ({
  Error: true,
  code,
  message,
});

module.exports = {
  badRequest: (message) => error(StatusCodes.BAD_REQUEST, message),
  conflict: (message) => error(StatusCodes.CONFLICT, message),
  unauthorized: (message) => error(StatusCodes.UNAUTHORIZED, message),
  notFound: (message) => error(StatusCodes.NOT_FOUND, message),
};
