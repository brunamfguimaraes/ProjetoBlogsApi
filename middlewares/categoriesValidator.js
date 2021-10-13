const isError = require('../utils/isError');
const { BAD_REQUEST } = require('../utils/statusCode');

const validateCategory = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return isError(res, BAD_REQUEST, '"name" is required');
  }

  next();
};

module.exports = { validateCategory };