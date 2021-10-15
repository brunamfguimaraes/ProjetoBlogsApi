require('dotenv').config();
const rescue = require('express-rescue');
const Joi = require('joi');
const { User } = require('../models');

const validUser = rescue(async (req, _res, next) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }).validate(req.body);
  if (error) {
    return next(error);
  }
  return next();
});

const uniqueEmail = rescue(async (req, _res, next) => {
  const { email } = req.body;
  const findEmail = await User.findOne({ where: { email } });
  if (findEmail) { 
    return next({ status: 409, message: 'User already registered' }); 
  }
  return next();
});

const validId = rescue(async (req, _res, next) => {
  const findId = await User.findByPk(req.params.id);
  if (!findId) {
    return next({ status: 404, message: 'User does not exist' });
  }
  return next();
});

module.exports = { validUser, uniqueEmail, validId };