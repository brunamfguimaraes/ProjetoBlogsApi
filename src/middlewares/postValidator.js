const Joi = require('@hapi/joi');
const Error = require('../helpers/errors');

const postValidator = async (req, res, next) => {
  const { error } = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(req.body);

  const { code } = Error.badRequest();

  if (error) return res.status(code).json({ message: error.details[0].message });

  next();
};

module.exports = postValidator;
