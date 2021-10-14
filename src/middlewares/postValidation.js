const Joi = require('joi');

const schema = Joi.object().keys({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryIds: Joi.array().items(Joi.number()).not().empty()
  .required(),
});

const postValidation = (req, res, next) => {
  const blogPost = req.body;
  const { error } = schema.validate(blogPost);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = postValidation;