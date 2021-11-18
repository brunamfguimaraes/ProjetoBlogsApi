const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const invalidData = require('../utils/invalidData');

const validPost = (req, _res, next) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.array().not().empty().required(),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, StatusCodes.BAD_REQUEST));

  next();
};

module.exports = validPost;
