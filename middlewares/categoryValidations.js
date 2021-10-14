const Joi = require('joi');
const rescue = require('express-rescue');

const validCategory = rescue(async (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate(req.body);
  if (error) { return next(error); }
  return next();
});

module.exports = {
  validCategory,
};