require('dotenv').config();
const rescue = require('express-rescue');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

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
  next();
});

const validToken = rescue(async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next({ status: 401, message: 'Token not found' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) next({ status: 401, message: 'Expired or invalid token' });
    req.payload = decoded;
  });

  const { payload } = req;

  const findEmail = await User.findOne({ where: { email: payload.email } });
  if (!findEmail) { 
    return next({ status: 400, message: 'Invalid fields' });
  }
  return next();
});

const validId = rescue(async (req, _res, next) => {
  const findId = await User.findByPk(req.params.id);
  if (!findId) {
    next({ status: 404, message: 'User does not exist' });
  }
  next();
});

module.exports = { validUser, uniqueEmail, validToken, validId };