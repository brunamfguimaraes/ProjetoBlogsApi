const Joi = require('joi');
// const { badRequest } = require('../helpres/error');

const validateLogin = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  next();
};

module.exports = validateLogin;