const Joi = require('joi');

const postCategory = async (req, res, next) => {
  const { error } = Joi.object().keys({
    name: Joi.string().required(),
  }).validate(req.body);

  if (error) {
    return next(error);
  }
  return next();
};

module.exports = postCategory;
