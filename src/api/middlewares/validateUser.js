const { ApiError } = require('../utils/ApiError');
const { userValidate } = require('../schemas/validations');
const { tokenGenerator } = require('../utils/createToken');

const validateUser = async (req, res, next) => {
  const errorUser = await userValidate(req.body);
  if (errorUser.message) {
    next(new ApiError(errorUser.message, errorUser.code));
  }

  const token = await tokenGenerator(req.body);
  req.token = token;
  next();
};

module.exports = {
  validateUser,
};