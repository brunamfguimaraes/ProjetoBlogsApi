const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const invalidData = require('../utils/invalidData');

const validLogin = (req, _res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().not().empty()
    .required(),
    password: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, StatusCodes.BAD_REQUEST));

  next();
};

module.exports = validLogin;
