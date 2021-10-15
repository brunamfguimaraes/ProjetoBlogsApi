const Joi = require('joi');
const rescue = require('express-rescue');
const { User } = require('../models');

const validateFildsLogin = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }).validate(req.body);
  if (error) {
    next(error);
  }
  next();
});

const validateUser = rescue(async (req, res, next) => {
  const { email } = req.body;
  const findUser = await User.findOne({ where: { email } });
  if (!findUser) {
    next('userDontExist');
  }
  next();
});

module.exports = { validateFildsLogin, validateUser };