const Joi = require('joi');
const rescue = require('express-rescue');
// const { User } = require('../models/User');

const validateFilds = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    displayName: Joi.string().min(8).required(),
    image: Joi.string(),
  }).validate(req.body);
  if (error) {
    return next(error);
  }
  return next();
});

module.exports = {
  validateFilds,
};