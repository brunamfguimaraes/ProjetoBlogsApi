const Joi = require('joi');
const rescue = require('express-rescue');
const { User } = require('../models');

const validUser = rescue(async (req, _res, next) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }).validate(req.body);
  if (error) { return next(error); }
  return next();
});

const uniqueEmail = rescue(async (req, res, next) => {
const { email } = req.body;
const findEmail = await User.findOne({ where: { email } });
if (findEmail) { return next({ status: 409, message: 'User already registered' }); }
next();
});

const idExists = rescue(async (req, res, next) => {
  const { id } = req.params;
const findId = await User.findOne({ where: { id } });
if (!findId) { return next({ status: 404, message: 'User does not exist' }); }
next();
});

module.exports = {
  validUser,
  uniqueEmail,
  idExists,
};