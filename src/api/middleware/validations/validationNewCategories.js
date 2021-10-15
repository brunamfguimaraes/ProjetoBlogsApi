const Joi = require('joi');

const validateCategories = (req, res, next) => {
  console.log('entrei aqui');
  const { error } = Joi.object({
    name: Joi.string().not().empty()
      .required()
      .messages({
        'string.min': '"name" is required',
      }),
  }).validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  return next();
};
module.exports = validateCategories;