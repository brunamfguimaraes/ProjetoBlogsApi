const Joi = require('joi');
/* const badRequest = require('../error/constructErro'); */

const validPost = async (req, res, next) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.not().empty().required(),
  }).validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  return next();
};

module.exports = validPost;
