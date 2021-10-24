const Joi = require('@hapi/joi');
const Error = require('../helpers/errors');

const nameValidator = async (req, res, next) => {
  const { error } = Joi.object().keys({
    name: Joi.string().required(),
  }).validate(req.body);

  const { code } = Error.badRequest();

  if (error) return res.status(code).json({ message: error.details[0].message });

  next();
};

module.exports = nameValidator;
