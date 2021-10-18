const Joi = require('joi');

const blogPost = async (req, _res, next) => {
  const { error } = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(req.body);

  if (error) {
    return next(error);
  }
  return next();
};

module.exports = blogPost;
