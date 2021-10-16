const Joi = require('joi');
const rescue = require('express-rescue');

const validateFildsBlogPost = rescue(async (req, res, next) => {
  const { error } = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),

  }).validate(req.body);
  if (error) {
    next(error);
  }
  next();
});

module.exports = { validateFildsBlogPost };