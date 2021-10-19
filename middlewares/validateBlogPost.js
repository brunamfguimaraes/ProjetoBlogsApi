const Joi = require('joi');

const validatePost = (req, res, next) => {
  const { error } = Joi.object({
    title: Joi.not().empty().required(),
    content: Joi.not().empty().required(),
    categoryIds: Joi.not().empty().required(),
  }).validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = validatePost;