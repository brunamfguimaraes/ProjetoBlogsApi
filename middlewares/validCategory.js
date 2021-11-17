const { StatusCodes } = require('http-status-codes');

const Joi = require('joi');
const invalidData = require('../utils/invalidData');

const validCategory = (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, StatusCodes.BAD_REQUEST));

  next();
};

module.exports = validCategory;