const Joi = require('joi');
const rescue = require('express-rescue');
const { User } = require('../models');

const validateFilds = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    displayName: Joi.string().min(8).required(),
    image: Joi.string(),
  }).validate(req.body);
  if (error) {
    next(error);
  }
  next();
});
const validationEmail = rescue(async (req, res, next) => {
  const { email } = req.body;
  const findEmail = await User.findOne({ where: { email } });
  if (findEmail) {
    next('userAlreadyExist');
  }
  next();
});
const validateUser = rescue(async (req, res, next) => {
const { id } = req.params;
const findUser = await User.findOne({ where: { id } });
if (!findUser) {
  next('userDoesntExist');
}
  next();
});

module.exports = {
  validateFilds,
  validationEmail,
  validateUser,
};