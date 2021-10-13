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

const findEmail = rescue(async (req, res, next) => {
const { email } = req.body;
const emailDB = await User.findOne({ where: { email } });
if (!emailDB) { return next({ status: 400, message: 'Invalid fields' }); }
next();
});

module.exports = {
  validLogin,
  findEmail,
};