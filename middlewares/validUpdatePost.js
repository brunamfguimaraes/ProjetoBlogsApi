const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const invalidData = require('../utils/invalidData');

const validUpdatePost = (req, _res, next) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.any().forbidden().messages({
      'any.unknown': 'Categories cannot be edited',
    }),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, StatusCodes.BAD_REQUEST));

  next();
};

module.exports = validUpdatePost; 