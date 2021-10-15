const Joi = require('joi');
const rescue = require('express-rescue');

const validateFilds = rescue(async (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate(req.body);
  if (error) {
    next(error);
  }
  next();
});

module.exports = {
  validateFilds,
};
