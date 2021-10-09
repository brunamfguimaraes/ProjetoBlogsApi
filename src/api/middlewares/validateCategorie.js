const { ApiError } = require('../utils/ApiError');

const validateCategorie = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new ApiError('"name" is required', 400));
  }
  next();
};

module.exports = {
  validateCategorie,
};