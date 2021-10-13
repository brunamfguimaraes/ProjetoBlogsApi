const Joi = require('joi');
const rescue = require('express-rescue');
const { User } = require('../models');

const validLogin = rescue(async (req, _res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }).validate(req.body);
  if (error) { return next(error); }
  return next();
});

const validUserDB = rescue(async (req, res, next) => {
const { email, password } = req.body;
const { id } = await User.findOne({ where: { email, password } });
if (!id) { return next({ status: 400, message: 'Invalid fields' }); }
req.infos = id;
next();
});

module.exports = {
  validLogin,
  validUserDB,
};