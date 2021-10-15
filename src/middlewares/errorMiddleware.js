const AppError = require('../util/appError');

module.exports = (err, _req, res, _next) => {
  const { code, message } = err;

  if (err instanceof AppError) {
    return res.status(code).json({ message });
  }

  // console.log(err);
  return res.status(500).json({ message: err.message });
};
