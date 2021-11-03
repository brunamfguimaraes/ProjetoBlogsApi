const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const invalidData = require('../utils/invalidData');

const validUser = (req, _res, next) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).not().empty()
    .required(),
    email: Joi.string().email().not().empty()
    .required(),
    password: Joi.string().min(6).not().empty()
    .required()
    .messages({
      'string.min': '"password" length must be 6 characters long',
    }),
    image: Joi.string(),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, StatusCodes.BAD_REQUEST));

  next();
};

module.exports = validUser;
