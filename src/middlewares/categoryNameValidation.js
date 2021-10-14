const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().not().empty()
  .required(),
});

const categoryNameValidation = (req, res, next) => {
  const newCategory = req.body;
  const { error } = schema.validate(newCategory);
  
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = categoryNameValidation;