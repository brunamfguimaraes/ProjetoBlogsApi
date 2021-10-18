const AppError = require('../util/appError');

module.exports = (err, _req, res, _next) => {
  const { code, message } = err;

  if (err instanceof AppError) {
    return res.status(code).json({ message });
  }
  return res.status(500).json({ message: 'Internal server error' });
};  